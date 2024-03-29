import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, multicast, refCount, shareReplay, tap } from 'rxjs/operators';
import { Options } from 'sortablejs';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { allTrue, isNilOrEmpty } from 'src/app/common/utils/core.utils';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { ISelectable } from 'src/app/root/models/core';
import { Tag } from '../../models/game';
import { Category, CategoryOption } from '../../models/game.DTOs';
import { GameService } from '../../services/game.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSelectorComponent extends ReactiveComponent implements OnInit {

  private readonly _isLoading$$ = new BehaviorSubject<boolean>(false);
  public get isLoading() { return this._isLoading$$.value; }
  @Output()
  public readonly isLoading$ = this._isLoading$$.pipe(
    distinctUntilChanged(),
    tap(value => logEvent(this, 'isLoading', value)),
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

  private readonly _categories$$ = new BehaviorSubject<ISelectable<CategoryOption>[] | undefined>(undefined);
  public get categories() { return this._categories$$.value; }
  @Input()
  public set categories(value: ISelectable<CategoryOption>[] | undefined) { this._categories$$.next(value); }
  @Output()
  public readonly categories$ = this._categories$$.pipe(
    distinctUntilChanged(),
    tap(value => logEvent(this, 'categories', value)),
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
    this.categories$,
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

  private readonly _selectedCategories$$ = new BehaviorSubject<readonly ISelectable<CategoryOption>[] | undefined>(undefined);
  public get selectedCategories() { return this._selectedCategories$$.value; }
  @Input()
  public set selectedCategories(value) { this._selectedCategories$$.next(value); }
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
      this.canChooseCategories$,
    ]);

    this.subscribe(this.categories$, {
      next: () => {
        this.selectedCategories = [];
      }
    });
    this.subscribe(this.categories$, {
      next: () => {
        this.fulltextSearchString = '';
      }
    });
  }

  public getCategoryId(index: number, category: ISelectable<CategoryOption>): number {
    return category.value.id;
  }

  //   public readonly availableCategoriesOptions: Options = {
  //     group: {
  //       name: "categories",
  //       pull: "clone",
  //       put: true
  //     },
  //     sort: false,
  //     removeOnSpill: false,
  //     revertOnSpill: true,
  //     animation: 150
  //   };

  public readonly selectedCategoriesOptions: Options = {
    group: {
      name: "categories",
      pull: false,
      put: false
    },
    sort: true,
    revertOnSpill: true,
    removeOnSpill: false,
    // onMove: () => {
    //   this.detectChanges();
    //   this.markForCheck();
    //   this.detectChanges();
    // },
    // onChange: () => {
    //   this.detectChanges();
    //   this.markForCheck();
    //   this.detectChanges();
    // },
    // onUpdate: () => {
    //   this.detectChanges();
    //   this.markForCheck();
    //   this.detectChanges();
    // },
    onSort: () => {
      this.detectLocalChanges();
    }
  };

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

    if (!this.selectedCategories || this.selectedCategories.includes(item))
      return;

    item.isSelected = true;
    this.selectedCategories = [...this.selectedCategories, item];
  }

  public remove(item: ISelectable<Category> | undefined) {

    if (this.selectedCategories == null || item == null || item.value == null)
      return;

    this.selectedCategories = this.selectedCategories?.filter(x => x !== item);

    item.isSelected = false;
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
