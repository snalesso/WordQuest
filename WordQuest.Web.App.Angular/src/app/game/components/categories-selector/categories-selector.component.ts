import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, multicast, refCount } from 'rxjs/operators';
import { Options } from 'sortablejs';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { isNilOrEmpty } from 'src/app/common/utils/array.utils';
import { isNotNil } from 'src/app/common/utils/core.utils';
import { ISelectable } from 'src/app/root/models/core';
import { } from 'src/app/root/models/presentation';
import { Tag } from '../../models/game';
import { CategoryDto, CategoryHeaderDto } from '../../models/game.DTOs';
import { GameService } from '../../services/game.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSelectorComponent extends ReactiveComponent implements OnInit {

  constructor(
    private readonly _gameService: GameService,
    private readonly _matchService: MatchService,
    changeDetectorRef: ChangeDetectorRef) {

    super(changeDetectorRef);

    // this.isDisabled$ = this.isDisabled$.pipe(map(x => !x), shareReplay(1));
  }

  ngOnInit(): void {

    // TODO: review if refCount is needed
    this.subscribe(this.hasCategories$.pipe(multicast(this._isEnabled$$), refCount()));
    this.subscribe(this.hasCategories$.pipe(map(hasCategories => hasCategories ? [] : null), multicast(this._selectedCategories$$), refCount()));
  }

  // TODO: calculate isEnabled using combineLatest
  private readonly _isEnabled$$ = new BehaviorSubject<boolean>(false);
  public readonly isEnabled$ = this._isEnabled$$.asObservable();
  public readonly isDisabled$ = this._isEnabled$$.pipe(map(isEnabled => !isEnabled));

  private readonly _categories$$ = new BehaviorSubject<ISelectable<CategoryHeaderDto>[]>(null);
  public readonly categories$ = this._categories$$.asObservable();
  @Input()
  public set categories(value) { this._categories$$.next(value); }
  public get categories() { return this._categories$$.value; }

  public readonly areCategoriesLoaded$ = this.categories$.pipe(map(cats => isNotNil(cats)));
  public readonly hasCategories$ = this.categories$.pipe(map(cats => !isNilOrEmpty(cats)));

  private readonly _selectedCategories$$ = new BehaviorSubject<ISelectable<CategoryHeaderDto>[]>(null);
  @Output()
  public readonly selectedCategories$ = this._selectedCategories$$.asObservable();
  public get selectedCategories() { return this._selectedCategories$$.value; }
  public set selectedCategories(value) { this._selectedCategories$$.next(value); };

  public getCategoryId(index: number, category: ISelectable<CategoryHeaderDto>): number {
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

  public remove(item: ISelectable<CategoryDto> | null) {

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
