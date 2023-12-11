import { ChangeDetectorRef, Directive, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, Subscription, catchError, combineLatest, distinctUntilChanged, filter, finalize, map, of, pairwise, repeat, share, shareReplay, skipWhile, switchMap } from "rxjs";
import { IDisposable } from "../../components/IDisposable";
import { ReactiveObject } from "../../components/ReactiveObject";
import { DialogService } from "../../services/dialog.service";
import { LoggingService } from "../../services/logging.service";
import { NotificationsService } from "../../services/notifications.service";
import { inlineThrow } from "../../utils/core";
import { allTrue, isNotNilNorEmpty } from "../../utils/core.utils";
import { shareLog, shareReplayChangeLog, tapLogEvent } from "../../utils/debug/rxjs";
import { areArraysSequentiallyEqual } from "../../utils/primitives/array.utils";
import { ofEmptyReadonlyArray } from "../../utils/rxjs/rxjs.array.utils";
import { forever, negate, onSubscription, storeIn, typedUsing } from "../../utils/rxjs/rxjs.utils";
import { isNotNil } from "../../utils/utils";
import { ReactiveComponent } from "./ReactiveComponent";

export interface IListItem<T> {
    readonly item: T;
    readonly isSelected: boolean;
    readonly isSelected$: Observable<boolean>;
}
class ListItem<T> extends ReactiveObject implements IListItem<T>, IDisposable {

    private readonly _isSelected$$ = new BehaviorSubject<boolean>(false);
    public get isSelected() { return this._isSelected$$.value; }
    public set isSelected(value: boolean) { this._isSelected$$.next(value); }
    public readonly isSelected$ = this._isSelected$$.pipe(shareReplayChangeLog(this, 'isSelected'));

    constructor(
        public readonly item: T,
        isSelected: boolean = false) {

        super();

        this.isSelected = isSelected;
        this.subscribe(this.isSelected$);
    }

    public override dispose(): void {
        this._isSelected$$.complete();
        super.dispose();
    }

    public toggleSelection() {
        this.isSelected = !this.isSelected;
    }
}

@Directive()
export abstract class ItemsListBaseComponent<TItem, TItemIdentity, TContext = undefined, TCriteria = undefined>
    extends ReactiveComponent
    implements OnInit {

    protected readonly _ngRouter: Router;
    protected readonly _errorsMngSvc: LoggingService;
    protected readonly _dialogSvc: DialogService;
    protected readonly _notificationsSvc: NotificationsService;

    private readonly _isEnabled$$ = new BehaviorSubject<boolean>(true);
    public get isEnabled() { return this._isEnabled$$.value; }
    @Input() public set isEnabled(value) { this._isEnabled$$.next(value); }
    @Output() public readonly isEnabled$ = this._isEnabled$$.pipe(shareReplayChangeLog(this, 'isEnabled'));

    /**Current implementation behaves more like an isBusy$, since it's true for requests unrelated to list items */
    private readonly _isLoading$$ = new BehaviorSubject<boolean>(false);
    public get isLoading() { return this._isLoading$$.value; }
    /**Current implementation behaves more like an isBusy$, since it's true for requests unrelated to list items */
    protected set isLoading(value) { this._isLoading$$.next(value); }
    /**Current implementation behaves more like an isBusy$, since it's true for requests unrelated to list items */
    @Output() public readonly isLoading$ = this._isLoading$$.pipe(
        distinctUntilChanged(),
        tapLogEvent(this, x => x ? 'loading items ...' : 'items loaded', { logValue: false }),
        shareReplay({ bufferSize: 1, refCount: true }));

    protected abstract createDefaultContext(): TContext;
    private readonly _context$$ = new BehaviorSubject<TContext>(this.createDefaultContext());
    public get context() { return this._context$$.value; }
    @Input() public set context(value: TContext) { this._context$$.next(value); }
    @Output() public readonly context$ = this._context$$.pipe(shareReplayChangeLog(this, 'context'));

    private readonly _canReload$$ = new BehaviorSubject<boolean>(!this.isLoading);
    public get canReload() { return this._canReload$$.value; }
    @Output() public readonly canReload$ = this.isLoading$.pipe(
        negate(),
        storeIn(() => this._canReload$$),
        shareReplayChangeLog(this, "can reload"));

    protected abstract createDefaultCriteria(): TCriteria;
    private readonly _criteria$$ = new BehaviorSubject<TCriteria>(this.createDefaultCriteria());
    public get criteria() { return this._criteria$$.value; }
    @Input() public set criteria(value) { this._criteria$$.next(value); }
    @Output() public readonly criteria$ = this._criteria$$.pipe(distinctUntilChanged());

    private readonly _reloadTrigger$$ = new Subject<void>();
    @Output() public readonly reloadRequested$ = this._reloadTrigger$$.pipe(
        filter(() => this.canReload),
        tapLogEvent(this, 'reload requested', { logValue: false }),
        share());

    // private readonly _filters$$ = new BehaviorSubject<readonly ((item: TItem) => boolean)[]>([]);
    // public get filters() { return this._filters$$.value; }
    // @Input() public set filters(value: readonly ((item: TItem) => boolean)[]) { this._filters$$.next(value); }
    // @Output() public readonly filters$ = this._filters$$.pipe(shareReplayChangeLog(this, 'filters'));

    private readonly _listItems$$ = new BehaviorSubject<readonly ListItem<TItem>[] | undefined>(undefined);
    public get listItems() { return this._listItems$$.value; }
    @Output() public readonly listItems$ = combineLatest([this.context$, this.criteria$]).pipe(
        switchMap(([context, criteria]) => {
            return this.getListItemsCore$(context, criteria).pipe(
                catchError((error: Error) => {
                    return this._errorsMngSvc.log('error', `Items loading failed.`, error).pipe(
                        switchMap(() => ofEmptyReadonlyArray<[item: TItem, isSelected: boolean]>()));
                }),
                map(data => {
                    if (data == null)
                        return undefined;
                    return data.map(d => new ListItem(d[0], d[1]));
                }),
                repeat({ delay: () => this.reloadRequested$ }),
                switchMap(listItems => {
                    if (listItems == null)
                        return of(undefined);
                    const listItems$ = typedUsing(
                        () => new Subscription(() => { for (const row of listItems) row.dispose(); }),
                        () => forever(listItems));
                    return listItems$;
                }),
                onSubscription(() => this.isLoading = true),
                finalize(() => this.isLoading = false));
        }),
        storeIn(() => this._listItems$$),
        shareReplayChangeLog(this, `listItems`));

    private readonly _areListItemsLoaded$$ = new BehaviorSubject<boolean>(isNotNil(this.listItems));
    public get areListItemsLoaded() { return this._areListItemsLoaded$$.value; }
    @Output() public readonly areListItemsLoaded$ = this.listItems$.pipe(
        map(isNotNil),
        storeIn(() => this._areListItemsLoaded$$),
        shareReplayChangeLog(this, 'areListItemsLoaded'));

    private readonly _areListItemsAvailable$$ = new BehaviorSubject<boolean>(isNotNilNorEmpty(this.listItems));
    public get areListItemsAvailable() { return this._areListItemsAvailable$$.value; }
    @Output() public readonly areListItemsAvailable$ = this.listItems$.pipe(
        map(isNotNilNorEmpty),
        storeIn(() => this._areListItemsAvailable$$),
        shareReplayChangeLog(this, 'areListItemsAvailable'));

    // private readonly _canFilterItems$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areListItemsAvailable]));
    // public get canFilterItems() { return this._canFilterItems$$.value; }
    // @Output() public readonly canFilterItems$ = combineLatest([this.isEnabled$, this.areListItemsAvailable$]).pipe(
    //     map(allTrue),
    //     storeIn(() => this._canFilterItems$$),
    //     shareReplayChangeLog(this, 'canFilterItems'));

    private readonly _isReloadBtnVisible$$ = new BehaviorSubject<boolean>(false);
    public get isReloadBtnVisible() { return this._isReloadBtnVisible$$; }
    @Output() public readonly isReloadBtnVisible$ = this.canReload$.pipe(
        storeIn(() => this._isReloadBtnVisible$$),
        shareReplayChangeLog(this, 'isReloadBtnVisible'));

    private readonly _isSelectingEnabled$$ = new BehaviorSubject<boolean>(true);
    public get isSelectingEnabled() { return this._isSelectingEnabled$$.value; }
    @Input() public set isSelectingEnabled(value: boolean) { this._isSelectingEnabled$$.next(value); }
    @Output() public readonly isSelectingEnabled$ = this._isSelectingEnabled$$.pipe(shareReplayChangeLog(this, 'canSelectItems'));

    private readonly _canSelectItems$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areListItemsLoaded]));
    public get canSelectItems() { return this._canSelectItems$$.value; }
    @Output() public readonly canSelectItems$ = combineLatest([this.isEnabled$, this.areListItemsLoaded$, this.isSelectingEnabled$]).pipe(
        map(allTrue),
        storeIn(() => this._canSelectItems$$),
        shareReplayChangeLog(this, 'canSelectItems'));

    private readonly _isHandlingMuplipleSelectionChanges$$ = new BehaviorSubject<boolean>(false);
    private set isHandlingMuplipleSelectionChanges(value: boolean) { this._isHandlingMuplipleSelectionChanges$$.next(value); }
    public get isHandlingMuplipleSelectionChanges() { return this._isHandlingMuplipleSelectionChanges$$.value; }
    @Output() public readonly isHandlingMuplipleSelectionChanges$ = this._isHandlingMuplipleSelectionChanges$$.asObservable();

    private readonly _selectedListItems$$ = new BehaviorSubject<readonly IListItem<TItem>[] | undefined>(undefined);
    public get selectedListItems() { return this._selectedListItems$$.value; }
    @Output() public readonly selectedListItems$ = this.listItems$.pipe(
        switchMap(rows => {
            if (rows == null)
                return of(undefined);
            // TODO: this can be optimized by handling single addition/removal
            return combineLatest(rows.map(row => row.isSelected$)).pipe(
                skipWhile(() => this.isHandlingMuplipleSelectionChanges),
                pairwise(),
                distinctUntilChanged(areArraysSequentiallyEqual),
                map(() => rows.filter(row => row.isSelected)),
                shareLog(this, `selectedListItems recalculated`));
        }),
        storeIn(() => this._selectedListItems$$),
        shareReplayChangeLog(this, 'selectedListItems'));

    private readonly _selectedItems$$ = new BehaviorSubject<readonly TItem[] | undefined>(undefined);
    public get selectedItems() { return this._selectedItems$$.value; }
    @Output() public readonly selectedItems$ = this.selectedListItems$.pipe(
        map(selectedListItems => {
            if (selectedListItems == null)
                return undefined;
            return selectedListItems.map(row => row.item);
        }),
        storeIn(() => this._selectedItems$$),
        shareReplayChangeLog(this, 'selectedItems'));

    private readonly _selectedListItem$$ = new BehaviorSubject<IListItem<TItem> | undefined>(undefined);
    public get selectedListItem() { return this._selectedListItem$$.value; }
    @Input() public set selectedListItem(value) { this._selectedListItem$$.next(value); }
    @Output() public readonly selectedListItem$ = this.selectedListItems$.pipe(
        map(selectedListItems => selectedListItems == null || selectedListItems.length !== 1
            ? undefined
            : selectedListItems[0]),
        storeIn(() => this._selectedListItem$$),
        shareReplayChangeLog(this, 'selectedListItem'));

    private readonly _selectedItem$$ = new BehaviorSubject<TItem | undefined>(undefined);
    public get selectedItem() { return this._selectedItem$$.value; }
    @Input() public set selectedItem(value) { this._selectedItem$$.next(value); }
    @Output() public readonly selectedItem$ = this.selectedListItem$.pipe(
        map(selectedItem => selectedItem?.item),
        storeIn(() => this._selectedItem$$),
        shareReplayChangeLog(this, 'selectedItem'));

    constructor(
        cdr: ChangeDetectorRef,
        ngRouter: Router,
        errorsMngSvc: LoggingService,
        dialogSvc: DialogService,
        notificationsSvc: NotificationsService) {
        super(cdr);

        this._ngRouter = ngRouter;
        this._errorsMngSvc = errorsMngSvc;
        this._dialogSvc = dialogSvc;
        this._notificationsSvc = notificationsSvc;
    }

    public ngOnInit(): void {
        this.subscribe([
            this.isEnabled$,
            // this.isReadOnly$,
            // this.isNotReadOnly$,
            // items
            this.isLoading$,
            this.canReload$,
            this.criteria$,
            this.listItems$,
            this.areListItemsLoaded$,
            this.areListItemsAvailable$,
            // this.filters$,
            // this.canFilterItems$,
            // select
            this.isSelectingEnabled$,
            this.canSelectItems$,
            this.selectedListItems$,
            this.selectedItems$,
            this.selectedListItem$,
        ]);
    }

    public reloadListItems() {
        if (!this.canReload)
            // TODO-WANTED: log
            return;
        this._reloadTrigger$$.next();
    }

    private searchListItem(predicate: (listItem: ListItem<TItem>) => boolean): ListItem<TItem> | undefined {
        if (this.listItems == null)
            // TODO-WANTED: log
            throw new Error(`Could not look for items: items not loaded.`);
        const listItem = this.listItems.find(predicate);
        return listItem;
    }

    private findListItem(predicate: (listItem: ListItem<TItem>) => boolean): ListItem<TItem> {
        const listItem = this.searchListItem(predicate);
        if (listItem == null)
            // TODO-WANTED: log
            throw new Error(`Provided predicate did not identify any item.`);
        return listItem;
    }

    public isIncluded(item: TItem): boolean {
        return this.listItems
            ?.some(listItem => listItem.item === item)
            ?? inlineThrow(() => new Error(`List items not available.`));
    }

    protected abstract getIdentityFromItem(item: TItem): TItemIdentity;
    public getById(id: TItemIdentity): IListItem<TItem> | undefined {
        const listItem = this.findListItem(row => this.getIdentityFromItem(row.item) === id);
        return listItem;
    }

    protected transformListItems$(listItems: readonly IListItem<TItem>[]): Observable<readonly IListItem<TItem>[]> {
        return of(listItems);
    }

    protected composeListItemRequestErrorMessageTitle(id: TItemIdentity, error: Error): string {
        return `Not found.`;
    }
    protected abstract getListItemsCore$(
        context: TContext,
        criteria: TCriteria)
        : Observable<readonly [item: TItem, isSelected: boolean][] | undefined>;

    //#region SELECTIONS

    private setSelectionStatus(items: readonly TItem[], newSelectionStatus: boolean) {
        if (items == null)
            throw new Error(`New selected items not defined.`);
        if (!this.canSelectItems)
            throw new Error('Items selection disabled.');
        if (this.listItems == null)
            throw new Error(`Rows not loaded.`);
        if (this.selectedListItems == null)
            throw new Error(`Selected rows not defined.`);

        this.isHandlingMuplipleSelectionChanges = items.length > 1;
        for (const item of items) {
            const listItem = this.findListItem(li => li.item === item);
            listItem.isSelected = newSelectionStatus;
        }
        this.isHandlingMuplipleSelectionChanges = false;
    }

    public isSelected(item: TItem) {
        if (item == null)
            throw new Error('Row to selected not defined.');
        if (!this.canSelectItems)
            throw new Error('Items selection disabled.');
        return this.findListItem(row => row.item === item)
            ?.isSelected
            ?? inlineThrow(() => new Error(`Item not included: ${item}.`));
    }

    public select(items: TItem[]) {
        this.setSelectionStatus(items, true);
    }

    public deselect(items: TItem[]) {
        this.setSelectionStatus(items, false);
    }

    public toggleSelection(item: TItem) {
        this.findListItem(li => li.item === item).toggleSelection();
    }

    public clearSelections() {
        if (this.selectedListItems == null)
            throw new Error(`Selections not defined.`);
        this.setSelectionStatus(this.selectedListItems.map(li => li.item), false);
    }

    //#endregion SELECTIONS
}