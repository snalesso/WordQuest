import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, tap } from 'rxjs/operators';
import { Options } from 'sortablejs';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { mapInvertedBool } from 'src/app/common/utils/rxjs.utils';
import { isNil } from 'src/app/common/utils/utils';
import { ISelectable } from 'src/app/root/models/core';
import { } from 'src/app/root/models/presentation';
import { Tag } from '../../models/game';
import { Category, CategoryHeader } from '../../models/game.DTOs';
import { GameService } from '../../services/game.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSelectorComponent extends ReactiveComponent implements OnInit {

  private readonly _isLoading$$ = new ReplaySubject<boolean>(1)
  @Output()
  public readonly isLoading$ = this._isLoading$$.pipe(
    startWith(false),
    distinctUntilChanged(),
    tap(x => logEvent(this, 'isLoading', x)),
    shareReplay({ bufferSize: 1, refCount: true }));

  // TODO: calculate isEnabled using combineLatest
  private readonly _isEnabled$$ = new BehaviorSubject<boolean>(false);
  @Output()
  public readonly isEnabled$ = this._isEnabled$$.pipe(
    distinctUntilChanged(),
    tap(x => logEvent(this, 'isEnabled', x)),
    shareReplay({ bufferSize: 1, refCount: true }));
  @Output()
  public readonly isDisabled$ = this.isEnabled$.pipe(mapInvertedBool(), distinctUntilChanged());

  // private readonly _categoriesFromInput$$ = new ReplaySubject<ISelectable<CategoryHeader>[]>(1);
  private readonly _categories$$ = new BehaviorSubject<ISelectable<CategoryHeader>[] | undefined>(undefined);
  // @Input('categories')
  @Input()
  public set categories(value: ISelectable<CategoryHeader>[] | undefined) { this._categories$$.next(value); }
  public get categories() { return this._categories$$.value; }
  @Output()
  public readonly categories$ = this._categories$$.pipe(
    distinctUntilChanged(),
    tap(x => logEvent(this, 'categories', x)),
    shareReplay({ bufferSize: 1, refCount: true }));

  @Output()
  public readonly areCategoriesAvailable$ = this.categories$.pipe(
    map(cats => isNil(cats) ? false : cats.length > 0),
    distinctUntilChanged(),
    tap(x => logEvent(this, 'areCategoriesAvailable', x)),
    shareReplay({ bufferSize: 1, refCount: true }));

  // private readonly _selectedCategories$$ = new ReplaySubject<ISelectable<CategoryHeader>[]>(1);
  private readonly _selectedCategories$$ = new BehaviorSubject<ISelectable<CategoryHeader>[] | undefined>(undefined);
  public set selectedCategories(value: ISelectable<CategoryHeader>[]) {
    // if (value === undefined)
    //   return;
    this._selectedCategories$$.next(value);
  }
  // public get selectedCategories() { return this._selectedCategories$$.value; }
  @Output()
  public readonly selectedCategories$ = this._selectedCategories$$.asObservable();

  constructor(
    private readonly _gameService: GameService,
    private readonly _matchService: MatchService,
    changeDetectorRef: ChangeDetectorRef) {

    super(changeDetectorRef);

    // this.isDisabled$ = this.isDisabled$.pipe(map(x => !x), shareReplay(1));
  }

  ngOnInit(): void {

    // TODO: review if refCount is needed
    // this.subscribe(this.areCategoriesAvailable$.pipe(multicast(this._isEnabled$$), refCount()));
    // this.subscribe(this.areCategoriesAvailable$.pipe(map(hasCategories => hasCategories ? [] : []), multicast(this._selectedCategories$$), refCount()));
  }

  public getCategoryId(index: number, category: ISelectable<CategoryHeader>): number {
    return category.value.id;
  }

  //#region SortableJS

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
    onSort: () => this.markForCheck()
  };

  public deselectCategory(index: number) {

    if (!this.selectedCategories || index >= this.selectedCategories.length) {
      throw new Error("Index " + index + " is out of array bounds");
    }

    const category = this.selectedCategories[index];
    this.selectedCategories.splice(index, 1);
  }

  public toggle(item: any) {

    if (!item.isSelected) {
      this.add(item);
    }
    else {
      this.remove(item);
    }
  }

  public add(item: any) {

    if (!this.selectedCategories || this.selectedCategories.includes(item)) {
      return;
    }

    item.isSelected = true;
    this.selectedCategories.push(item);
  }

  public remove(item: ISelectable<Category> | null) {

    if (item == null || item.value == null) //|| item.value.tags == null)
      return;

    const items = this.selectedCategories;
    if (!items) {
      return;
    }

    let i = 0;
    while (i < items.length) {
      if (items[i] === item) {
        items.splice(i, 1);
      }
      i++;
    }

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

  //#endregion
}
