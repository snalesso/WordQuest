import { ChangeDetectorRef, Directive, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, distinctUntilChanged, filter, finalize, forkJoin, map, of, pairwise, repeat, share, shareReplay, skipWhile, switchMap } from "rxjs";
import { Selectable } from "src/app/root/models/core";
import { DialogService } from "../../services/dialog.service";
import { LoggingService } from "../../services/logging.service";
import { NotificationsService } from "../../services/notifications.service";
import { inlineThrow } from "../../utils/core";
import { allTrue, isNotNilNorEmpty } from "../../utils/core.utils";
import { shareLog, shareReplayChangeLog, tapLogEvent } from "../../utils/debug/rxjs";
import { areArraysSequentiallyEqual } from "../../utils/primitives/array.utils";
import { ofEmptyReadonlyArray } from "../../utils/rxjs/rxjs.array.utils";
import { negate, onSubscription, storeIn } from "../../utils/rxjs/rxjs.utils";
import { isNotNil } from "../../utils/utils";
import { ReactiveComponent } from "./ReactiveComponent";

@Directive()
export abstract class ItemsListBaseComponent<TItem, TItemIdentity, TContext, TCriteria>
    extends ReactiveComponent
    implements OnInit {

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

    private readonly _filters$$ = new BehaviorSubject<readonly ((item: TItem) => boolean)[]>([]);
    public get filters() { return this._filters$$.value; }
    @Input() public set filters(value: readonly ((item: TItem) => boolean)[]) { this._filters$$.next(value); }
    @Output() public readonly filters$ = this._filters$$.pipe(shareReplayChangeLog(this, 'filters'));

    private readonly _rows$$ = new BehaviorSubject<readonly Selectable<TItem>[] | undefined>(undefined);
    public get rows() { return this._rows$$.value; }
    @Output() public readonly rows$ = combineLatest([this.context$, this.criteria$]).pipe(
        switchMap(([context, criteria]) => {
            return this.getRowsCore$(context, criteria).pipe(
                catchError((error: Error) =>
                    this._errorsMngSvc.log('error', `Items loading failed.`, error).pipe(
                        switchMap(() => ofEmptyReadonlyArray<Selectable<TItem>>()))),
                onSubscription(() => this.isLoading = true),
                finalize(() => this.isLoading = false),
                repeat({ delay: () => this.reloadRequested$ }),
                switchMap(rows => {
                    if (rows == null)
                        return of(rows);
                    const transformedRows$ = this.transformRows$(of(rows));
                    return combineLatest([transformedRows$, this.filters$]).pipe(
                        map(([rows, filters]) => {
                            const filteredRows = rows.filter(row => filters.every(filter => filter(row.item)));
                            return filteredRows;
                        }));
                }));
        }),
        storeIn(() => this._rows$$),
        shareReplayChangeLog(this, `rows`));

    private readonly _areItemsLoaded$$ = new BehaviorSubject<boolean>(this.rows != null);
    public get areItemsLoaded() { return this._areItemsLoaded$$.value; }
    @Output() public readonly areItemsLoaded$ = this.rows$.pipe(
        map(isNotNil),
        storeIn(() => this._areItemsLoaded$$),
        shareReplayChangeLog(this, 'areItemsLoaded'));

    private readonly _areItemsAvailable$$ = new BehaviorSubject<boolean>(isNotNilNorEmpty(this.rows));
    public get areItemsAvailable() { return this._areItemsAvailable$$.value; }
    @Output() public readonly areItemsAvailable$ = this.rows$.pipe(
        map(isNotNilNorEmpty),
        storeIn(() => this._areItemsAvailable$$),
        shareReplayChangeLog(this, 'areItemsAvailable'));

    private readonly _canFilterItems$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areItemsAvailable]));
    public get canFilterItems() { return this._canFilterItems$$.value; }
    @Output() public readonly canFilterItems$ = combineLatest([this.isEnabled$, this.areItemsAvailable$]).pipe(
        map(allTrue),
        storeIn(() => this._canFilterItems$$),
        shareReplayChangeLog(this, 'canFilterItems'));

    private readonly _isReloadBtnVisible$$ = new BehaviorSubject<boolean>(false);
    public get isReloadBtnVisible() { return this._isReloadBtnVisible$$; }
    @Output() public readonly isReloadBtnVisible$ = this.canReload$.pipe(
        storeIn(() => this._isReloadBtnVisible$$),
        shareReplayChangeLog(this, 'isReloadBtnVisible'));

    private readonly _isReadOnly$$ = new BehaviorSubject<boolean>(true);
    public get isReadOnly() { return this._isReadOnly$$.value; }
    @Input() public set isReadOnly(value: boolean) { this._isReadOnly$$.next(value); }
    @Output() public readonly isReadOnly$ = this._isReadOnly$$.pipe(shareReplayChangeLog(this, 'isReadOnly'));

    public get isNotReadOnly() { return !this.isReadOnly; }
    @Output() public readonly isNotReadOnly$ = this.isReadOnly$.pipe(negate(), shareReplayChangeLog(this, 'isNotReadOnly'));

    private readonly _isSelectingEnabled$$ = new BehaviorSubject<boolean>(true);
    public get isSelectingEnabled() { return this._isSelectingEnabled$$.value; }
    @Input() public set isSelectingEnabled(value: boolean) { this._isSelectingEnabled$$.next(value); }
    @Output() public readonly isSelectingEnabled$ = this._isSelectingEnabled$$.pipe(shareReplayChangeLog(this, 'canSelectItems'));

    private readonly _canSelectItems$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areItemsLoaded]));
    public get canSelectItems() { return this._canSelectItems$$.value; }
    @Output() public readonly canSelectItems$ = combineLatest([this.isEnabled$, this.areItemsLoaded$, this.isSelectingEnabled$]).pipe(
        map(allTrue),
        storeIn(() => this._canSelectItems$$),
        shareReplayChangeLog(this, 'canSelectItems'));

    private readonly _items$$ = new BehaviorSubject<readonly TItem[] | undefined>(undefined);
    public get items() { return this._items$$.value; }
    @Output() public readonly items$ = this.rows$.pipe(
        map(rows => rows?.map(row => row.item)),
        storeIn(() => this._items$$),
        shareReplayChangeLog(this, 'tems'));

    private readonly _isHandlingMuplipleSelectionChanges$$ = new BehaviorSubject<boolean>(false);
    private set isHandlingMuplipleSelectionChanges(value: boolean) { this._isHandlingMuplipleSelectionChanges$$.next(value); }
    public get isHandlingMuplipleSelectionChanges() { return this._isHandlingMuplipleSelectionChanges$$.value; }
    @Output() public readonly isHandlingMuplipleSelectionChanges$ = this._isHandlingMuplipleSelectionChanges$$.asObservable();

    private readonly _selectedRows$$ = new BehaviorSubject<readonly Selectable<TItem>[] | undefined>(undefined);
    public get selectedRows() { return this._selectedRows$$.value; }
    @Output() public readonly selectedRows$ = this.rows$.pipe(
        switchMap(rows => {
            if (rows == null)
                return of(undefined);
            // TODO: this can be optimized by handling single addition/removal
            return forkJoin(rows.map(row => row.isSelected$)).pipe(
                skipWhile(() => this.isHandlingMuplipleSelectionChanges),
                pairwise(),
                distinctUntilChanged(areArraysSequentiallyEqual),
                map(() => rows.filter(row => row.isSelected)),
                shareLog(this, `selectedRows recalculated`));
        }),
        storeIn(() => this._selectedRows$$),
        shareReplayChangeLog(this, 'selectedRows'));

    private readonly _selectedItems$$ = new BehaviorSubject<readonly TItem[] | undefined>(undefined);
    public get selectedItems() { return this._selectedItems$$.value; }
    @Output() public readonly selectedItems$ = this.selectedRows$.pipe(
        map(selectedRows => {
            if (selectedRows == null)
                return undefined;
            return selectedRows.map(row => row.item);
        }),
        storeIn(() => this._selectedItems$$),
        shareReplayChangeLog(this, 'selectedItems'));

    constructor(
        cdr: ChangeDetectorRef,
        protected readonly _ngRouter: Router,
        protected readonly _errorsMngSvc: LoggingService,
        protected readonly _dialogSvc: DialogService,
        protected readonly _notificationsSvc: NotificationsService) {
        super(cdr);
    }

    public ngOnInit(): void {
        this.subscribe([
            this.isEnabled$,
            this.isReadOnly$,
            this.isNotReadOnly$,
            // items
            this.isLoading$,
            this.canReload$,
            this.criteria$,
            this.rows$,
            this.items$,
            this.areItemsLoaded$,
            this.areItemsAvailable$,
            this.filters$,
            this.canFilterItems$,
            // select
            this.isSelectingEnabled$,
            this.canSelectItems$,
            this.selectedRows$,
            this.selectedItems$,
        ]);
    }

    protected areSameListItemsOrHaveSameIds(left: TItem, right: TItem): boolean {
        return left === right || this.getIdentityFromListItem(left) === this.getIdentityFromListItem(right);
    }

    public reloadListItems() {
        if (!this.canReload)
            // TODO-WANTED: log
            return;
        this._reloadTrigger$$.next();
    }

    protected findRow(predicate: (row: Selectable<TItem>) => boolean): Selectable<TItem> | undefined {
        if (this.rows == null)
            // TODO-WANTED: log
            throw new Error(`Could not look for items: items not loaded.`);
        const row = this.rows.find(row => predicate(row));
        if (row == null)
            // TODO-WANTED: log
            throw new Error(`Provided predicate did not identify any item.`);
        return row;
    }
    public isIncluded(item: TItem): boolean {
        return this.findRow(row => row.item === item) != null;
    }

    public getRowById(id: TItemIdentity): Selectable<TItem> | undefined {
        const row = this.findRow(row => this.getIdentityFromListItem(row.item) === id);
        return row;
    }

    protected abstract getIdentityFromListItem(listItem: TItem): TItemIdentity;

    protected transformRows$(listItems$: Observable<readonly Selectable<TItem>[]>): Observable<readonly Selectable<TItem>[]> {
        return listItems$;
    }

    protected composeListItemRequestErrorMessageTitle(id: TItemIdentity, error: Error): string {
        return `Not found.`;
    }
    protected abstract getRowsCore$(context: TContext, criteria: TCriteria): Observable<readonly Selectable<TItem>[] | undefined>;
    protected abstract getListItemCore$(id: TItemIdentity, criteria: TCriteria): Observable<Selectable<TItem> | undefined>;
    protected getListItem$(id: TItemIdentity): Observable<Selectable<TItem> | undefined> {
        return this.getListItemCore$(id, this.criteria).pipe(
            catchError((error: Error) =>
                this._errorsMngSvc.log('error', this.composeListItemRequestErrorMessageTitle(id, error), error).pipe(
                    switchMap(() => EMPTY))),
            onSubscription(() => this.isLoading = true),
            finalize(() => this.isLoading = false));
    }

    //#region SELECTIONS

    private setSelectionStatus(rows: readonly Selectable<TItem>[], newSelectionStatus: boolean) {
        if (rows == null)
            throw new Error(`New selected items not defined.`);
        if (!this.canSelectItems)
            throw new Error('Items selection disabled.');
        if (this.rows == null)
            throw new Error(`Rows not loaded.`);
        if (this.selectedRows == null)
            throw new Error(`Selected rows not defined.`);

        this.isHandlingMuplipleSelectionChanges = rows.length > 1;
        for (const row of rows) {
            if (!this.isIncluded(row.item))
                throw new Error(`Could not find item for selection/deselection: ${row}`);
            row.isSelected = newSelectionStatus;
        }
        this.isHandlingMuplipleSelectionChanges = false;
    }

    public isSelected(item: TItem) {
        if (item == null)
            throw new Error('Row to selected not defined.');
        if (!this.canSelectItems)
            throw new Error('Items selection disabled.');
        return this.findRow(row => row.item === item)
            ?.isSelected
            ?? inlineThrow(() => new Error(`Item not included: ${item}.`));
    }

    public select(rows: readonly Selectable<TItem>[]) {
        this.setSelectionStatus(rows, true);
    }

    public deselect(rows: readonly Selectable<TItem>[]) {
        this.setSelectionStatus(rows, false);
    }

    public toggleSelection(row: Selectable<TItem>) {
        row.toggleSelection();
    }

    public clearSelections() {
        if (this.selectedRows == null)
            throw new Error(`Selections not defined.`);
        this.setSelectionStatus(this.selectedRows, false);
    }

    //#endregion SELECTIONS
}