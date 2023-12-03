import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, multicast, refCount, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/reactive.component';
import { allTrue, isNilOrEmpty } from 'src/app/common/utils/core.utils';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { tapOnSub } from 'src/app/common/utils/rxjs.utils';
import { ISelectable, randomInt } from 'src/app/root/models/core';
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
export class CategoriesSelectorComponent extends ReactiveComponent implements OnInit {

  protected readonly loadingPlaceholders = generateNumbers(1, 30).map(() => generateNumbers(1, randomInt(3, 12)).join(''));

  private readonly _isLoading$$ = new BehaviorSubject<boolean>(false);
  public get isLoading() { return this._isLoading$$.value; }
  private set isLoading(value) { this._isLoading$$.next(value); }
  @Output()
  public readonly isLoading$ = this._isLoading$$.pipe(
    distinctUntilChanged(),
    tap(value => logEvent(this, 'isLoading', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _alphabetVariantId$$ = new BehaviorSubject<AlphabetVariantOption['id'] | undefined>(undefined);
  public get alphabetVariantId() { return this._alphabetVariantId$$.value; }
  @Input()
  public set alphabetVariantId(value) { this._alphabetVariantId$$.next(value); }
  @Output()
  public readonly alphabetVariantId$ = this._alphabetVariantId$$.pipe(distinctUntilChanged());

  private readonly _categories$$ = new BehaviorSubject<readonly CategoryOption[] | undefined>(undefined);
  public get categories() { return this._categories$$.value; }
  @Output()
  public readonly categories$ = this.alphabetVariantId$.pipe(
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

  private readonly _isEnabled$$ = new BehaviorSubject<boolean>(false);
  public get isEnabled() { return this._isEnabled$$.value; }
  @Input()
  public set isEnabled(value) { this._isEnabled$$.next(value); }
  @Output()
  public readonly isEnabled$ = this._isEnabled$$.pipe(
    distinctUntilChanged(),
    tap(value => logEvent(this, 'isEnabled', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  // private readonly _categories$$ = new BehaviorSubject<readonly CategoryOption[] | undefined>(undefined);
  // public get categories() { return this._categories$$.value; }
  // @Input()
  // public set categories(value) { this._categories$$.next(value); }
  // @Output()
  // public readonly categories$ = this._categories$$.pipe(
  //   distinctUntilChanged(),
  //   tap(value => logEvent(this, 'categories', value)),
  //   shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _selectableCategories$$ = new BehaviorSubject<readonly ISelectable<CategoryOption>[] | undefined>(undefined);
  public get selectableCategories() { return this._selectableCategories$$.value; }
  @Output()
  public readonly selectableCategories$ = this.categories$.pipe(
    map(categories => {
      if (categories == null)
        return undefined;
      return categories.map<ISelectable<CategoryOption>>(category => ({ value: category, isSelected: false }));
    }),
    multicast(() => this._selectableCategories$$),
    refCount(),
    tap(selectableCategories => logEvent(this, "selectableCategories", selectableCategories)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _fulltextSearchString$$ = new BehaviorSubject<string>('');
  public get fulltextSearchString() { return this._fulltextSearchString$$.value; }
  @Input()
  public set fulltextSearchString(value: string) { this._fulltextSearchString$$.next(value); }
  @Output()
  public readonly fulltextSearchString$ = this._fulltextSearchString$$.pipe(distinctUntilChanged());

  private readonly _filteredCategories$$ = new BehaviorSubject<readonly ISelectable<CategoryOption>[] | undefined>(undefined);
  public get filteredCategories() { return this._filteredCategories$$.value; }
  @Output() public readonly filteredCategories$ = combineLatest([
    this.selectableCategories$,
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
        const name = category.value.name.toLowerCase();
        const desription = category.value.description?.toLowerCase();
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
  @Output()
  public readonly areCategoriesAvailable$ = this.categories$.pipe(
    map(cats => !isNilOrEmpty(cats)),
    multicast(() => this._areCategoriesAvailable$$),
    refCount(),
    distinctUntilChanged(),
    tap(value => logEvent(this, 'areCategoriesAvailable', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _selectedCategories$$ = new BehaviorSubject<readonly CategoryOption[] | undefined>(undefined);
  public get selectedCategories() { return this._selectedCategories$$.value; }
  @Input()
  protected set selectedCategories(value) { this._selectedCategories$$.next(value); }
  @Output()
  public readonly selectedCategories$ = this._selectedCategories$$.asObservable();

  private readonly _canFilterCategories$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areCategoriesAvailable]));
  @Output()
  public readonly canFilterCategories$ = this.categories$.pipe(
    map(cats => !isNilOrEmpty(cats)),
    multicast(() => this._canFilterCategories$$),
    refCount(),
    distinctUntilChanged(),
    tap(value => logEvent(this, 'canFilterCategories', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _canChooseCategories$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areCategoriesAvailable]));
  @Output()
  public readonly canChooseCategories$ = this.categories$.pipe(
    map(cats => !isNilOrEmpty(cats)),
    multicast(() => this._canChooseCategories$$),
    refCount(),
    distinctUntilChanged(),
    tap(value => logEvent(this, 'canChooseCategories', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  constructor(
    cdr: ChangeDetectorRef,
    private readonly _gameService: GameService,
    private readonly _matchService: MatchService) {
    super(cdr);
  }

  ngOnInit(): void {
    this.subscribe([
      this.isEnabled$,
      this.isLoading$,
      this.categories$,
      this.selectedCategories$,
      this.areCategoriesAvailable$,
      this.canFilterCategories$,
      this.filteredCategories$,
      this.fulltextSearchString$,
      this.selectableCategories$,
      this.canChooseCategories$,
    ]);

    this.subscribe(this.selectableCategories$, {
      next: () => {
        this.selectedCategories = [];
      }
    });
    this.subscribe(this.selectableCategories$, {
      next: () => {
        this.fulltextSearchString = '';
      }
    });
  }

  public getCategoryId(index: number, category: CategoryOption): number {
    return category.id;
  }

  private calculateSelectedCategoryOptions() {
    if (this.selectableCategories == null)
      throw new Error('No selectable category available.');
    return this.selectableCategories.filter(selectable => selectable.isSelected).map(x => x.value)
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

    if (this.selectedCategories == null || this.selectableCategories == null || item == null)
      return;

    const selectedItemIndex = this.selectableCategories.findIndex(x => x.value.id === item.id);
    if (selectedItemIndex < 0)
      throw new Error('Element is not selected.');

    const selectedItem = this.selectableCategories[selectedItemIndex];
    selectedItem.isSelected = false;
    this.selectedCategories = this.selectableCategories
      .filter(selectableItem => selectableItem !== selectedItem)
      .map(x => x.value);
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
