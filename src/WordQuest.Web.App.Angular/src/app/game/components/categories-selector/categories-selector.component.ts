import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, multicast, refCount, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { IListItem, ItemsListBaseComponent } from 'src/app/common/components/items-list-base.component';
import { DialogService } from 'src/app/common/services/dialog.service';
import { LoggingService } from 'src/app/common/services/logging.service';
import { NotificationsService } from 'src/app/common/services/notifications.service';
import { allTrue, isNilOrEmpty } from 'src/app/common/utils/core.utils';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { tapOnSub } from 'src/app/common/utils/rxjs.utils';
import { randomInt } from 'src/app/root/models/core';
import { AlphabetVariantOption } from 'src/app/root/models/culture.DTOs';
import { generateNumbers } from 'src/app/root/models/utils';
import { Tag } from '../../models/game';
import { CategoryOption } from '../../models/game.DTOs';
import { GameService } from '../../services/game.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSelectorComponent extends ItemsListBaseComponent<CategoryOption, CategoryOption['id'], undefined, undefined> implements OnInit {

  protected readonly loadingPlaceholders = generateNumbers(1, 30).map(() => generateNumbers(1, randomInt(3, 12)).join(''));

  private readonly _alphabetVariantId$$ = new BehaviorSubject<AlphabetVariantOption['id'] | undefined>(undefined);
  public get alphabetVariantId() { return this._alphabetVariantId$$.value; }
  @Input() public set alphabetVariantId(value) { this._alphabetVariantId$$.next(value); }
  @Output() public readonly alphabetVariantId$ = this._alphabetVariantId$$.pipe(distinctUntilChanged());

  private readonly _categories$$ = new BehaviorSubject<readonly CategoryOption[] | undefined>(undefined);
  public get categories() { return this._categories$$.value; }
  @Output() public readonly categories$ = this.alphabetVariantId$.pipe(
    switchMap(alphabetVariantId => {
      if (alphabetVariantId == null || Number.isNaN(alphabetVariantId))
        return of(undefined);
      return this._gameService.getCategoryOptionsAsync(alphabetVariantId).pipe(
        tapOnSub(() => this.isLoading = true),
        catchError(() => of(undefined)),
        startWith(undefined),
        distinctUntilChanged(),
        finalize(() => this.isLoading = false));
    }),
    multicast(() => this._categories$$),
    refCount(),
    distinctUntilChanged(),
    tap(categories => logEvent(this, "categories", categories)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _fulltextSearchString$$ = new BehaviorSubject<string>('');
  public get fulltextSearchString() { return this._fulltextSearchString$$.value; }
  @Input() public set fulltextSearchString(value: string) { this._fulltextSearchString$$.next(value); }
  @Output() public readonly fulltextSearchString$ = this._fulltextSearchString$$.pipe(distinctUntilChanged());

  private readonly _filteredCategories$$ = new BehaviorSubject<readonly IListItem<CategoryOption>[] | undefined>(undefined);
  public get filteredCategories() { return this._filteredCategories$$.value; }
  @Output() public readonly filteredCategories$ = combineLatest([
    this.listItems$,
    this.fulltextSearchString$.pipe(debounceTime(500))
  ]).pipe(
    map(([categories, fulltextSearchString]) => {
      if (categories == null)
        return undefined;
      if (isNilOrEmpty(fulltextSearchString))
        return categories;
      const keysSet = new Set(fulltextSearchString.toLowerCase().split(' ').filter(key => key.length > 0));
      const keys = [...keysSet.values()];
      const filteredCategories = categories.filter(category => {
        const name = category.item.name.toLowerCase();
        const desription = category.item.description?.toLowerCase();
        return keys.every(key => name.includes(key) || (desription?.includes(key) ?? false));
      });
      return filteredCategories;
    }),
    multicast(() => this._filteredCategories$$),
    refCount(),
    distinctUntilChanged(),
    tap(value => logEvent(this, 'categories', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _areCategoriesAvailable$$ = new BehaviorSubject<boolean>(!isNilOrEmpty(this.categories));
  public get areCategoriesAvailable() { return this._areCategoriesAvailable$$.value; }
  @Output() public readonly areCategoriesAvailable$ = this.categories$.pipe(
    map(cats => !isNilOrEmpty(cats)),
    multicast(() => this._areCategoriesAvailable$$),
    refCount(),
    distinctUntilChanged(),
    tap(value => logEvent(this, 'areCategoriesAvailable', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _selectedCategories$$ = new BehaviorSubject<readonly CategoryOption[] | undefined>(undefined);
  public get selectedCategories() { return this._selectedCategories$$.value; }
  @Input() protected set selectedCategories(value) { this._selectedCategories$$.next(value); }
  @Output() public readonly selectedCategories$ = this._selectedCategories$$.asObservable();

  private readonly _canFilterCategories$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areCategoriesAvailable]));
  @Output() public readonly canFilterCategories$ = this.categories$.pipe(
    map(cats => !isNilOrEmpty(cats)),
    multicast(() => this._canFilterCategories$$),
    refCount(),
    distinctUntilChanged(),
    tap(value => logEvent(this, 'canFilterCategories', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _canSelectCategories$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areCategoriesAvailable]));
  @Output() public readonly canSelectCategories$ = this.categories$.pipe(
    map(cats => !isNilOrEmpty(cats)),
    multicast(() => this._canSelectCategories$$),
    refCount(),
    distinctUntilChanged(),
    tap(value => logEvent(this, 'canSelectCategories', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  constructor(
    cdr: ChangeDetectorRef,
    ngRouter: Router,
    errorsMngSvc: LoggingService,
    dialogSvc: DialogService,
    notificationsSvc: NotificationsService,
    private readonly _gameService: GameService,
    private readonly _matchService: MatchService) {
    super(cdr, ngRouter, errorsMngSvc, dialogSvc, notificationsSvc);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.subscribe([
      this.isEnabled$,
      this.isLoading$,
      this.categories$,
      this.selectedCategories$,
      this.areCategoriesAvailable$,
      this.canFilterCategories$,
      this.filteredCategories$,
      this.fulltextSearchString$,
      this.canSelectCategories$,
    ]);

    this.subscribe(this.listItems$, {
      next: () => {
        this.selectedCategories = [];
      }
    });
    this.subscribe(this.listItems$, {
      next: () => {
        this.fulltextSearchString = '';
      }
    });
  }

  protected override createDefaultContext(): undefined {
    return undefined;
  }
  protected override createDefaultCriteria(): undefined {
    return undefined;
  }
  protected override getIdentityFromItem(item: CategoryOption): number {
    return item.id;
  }
  protected override getListItemsCore$(context: undefined, criteria: undefined): Observable<readonly [item: CategoryOption, isSelected: boolean][] | undefined> {
    return this.categories$.pipe(map(categories => {
      if (categories == null)
        return undefined;
      return categories.map(category => [category, false]);
    }));
  }

  public getCategoryId(index: number, category: CategoryOption): number {
    return category.id;
  }

  private calculateSelectedCategoryOptions() {
    if (this.listItems == null)
      throw new Error('No selectable category available.');
    return this.listItems.filter(selectable => selectable.isSelected).map(x => x.item)
  }

  public deselectCategory(index: number) {

    if (!this.selectedCategories || index >= this.selectedCategories.length) {
      throw new Error("Index " + index + " is out of array bounds");
    }

    this.selectedCategories = this.selectedCategories.slice(1);
  }

  public toggle(item: any) {

    if (!item.isSelected)
      this.add(item);
    else
      this.remove(item);
  }

  public add(item: any) {
    if (this.selectedCategories == null)
      throw new Error('Selected categories list not available.');
    item.isSelected = true;
    this.selectedCategories = this.calculateSelectedCategoryOptions();
  }

  public remove(item: CategoryOption) {

    if (this.selectedCategories == null || this.listItems == null || item == null)
      return;

    const selectedItemIndex = this.listItems.findIndex(x => x.item.id === item.id);
    if (selectedItemIndex < 0)
      throw new Error('Element is not selected.');

    const selectedItem = this.listItems[selectedItemIndex];
    selectedItem.isSelected = false;
    this.selectedCategories = this.listItems
      .filter(selectableItem => selectableItem !== selectedItem)
      .map(x => x.item);
  }

  public getTagName(tag: Tag) {
    return Tag[tag];
  }

  public getTagsInfo(tags: Tag[]) {
    if (!tags) {
      return null;
    }

    return tags.map(x => "#" + this.getTagName(x)).join(" ");
  }
}
