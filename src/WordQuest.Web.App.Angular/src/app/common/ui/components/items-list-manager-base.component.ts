import { Directive, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject, EMPTY, Observable, Subject, Subscription, catchError, combineLatest, filter, finalize, map, merge, of, scan, switchMap, tap, throwError } from "rxjs";
import { SubsTracker } from "../../model/SubsTracker";
import { NotImplementedError } from "../../model/exceptions";
import { IChoiceDialogConfig } from "../../services/dialog.service";
import { allTrue } from "../../utils/core.utils";
import { shareReplayChangeLog } from "../../utils/debug/rxjs";
import { toVoid } from "../../utils/rxjs.utils";
import { ImmutableArrayHandlers, ItemReplacement, negate, onSubscription, storeIn, throwWhen, typedUsing } from "../../utils/rxjs/rxjs.utils";
import { isNil } from "../../utils/utils";
import { IListItem, ItemsListBaseComponent } from "./items-list-base.component";

@Directive()
export abstract class ItemsListManagerBaseComponent
    <
        TItem,
        TItemIdentity,
        TContext,
        TCriteria,
        TCrudItem
    >
    extends ItemsListBaseComponent<TItem, TItemIdentity, TContext, TCriteria>
    implements OnInit {

    private readonly _appendItemsTrigger$$ = new Subject<readonly IListItem<TItem>[]>();
    private readonly _appendItemsSignal$ = this._appendItemsTrigger$$.asObservable();

    private readonly _removeItemsTrigger$$ = new Subject<readonly IListItem<TItem>[]>();
    private readonly _removeItemsSignal$ = this._removeItemsTrigger$$.asObservable();

    private readonly _replaceItemsTrigger$$ = new Subject<readonly ItemReplacement<IListItem<TItem>>[]>();
    private readonly _replaceItemsSignal$ = this._replaceItemsTrigger$$.asObservable();

    private readonly _isReadOnly$$ = new BehaviorSubject<boolean>(true);
    public get isReadOnly() { return this._isReadOnly$$.value; }
    @Input() public set isReadOnly(value: boolean) { this._isReadOnly$$.next(value); }
    @Output() public readonly isReadOnly$ = this._isReadOnly$$.pipe(shareReplayChangeLog(this, 'isReadOnly'));

    public get isNotReadOnly() { return !this.isReadOnly; }
    @Output() public readonly isNotReadOnly$ = this.isReadOnly$.pipe(negate(), shareReplayChangeLog(this, 'isNotReadOnly'));

    public readonly _isEditingEnabled$$ = new BehaviorSubject<boolean>(true);
    public get isEditingEnabled() { return this._isEditingEnabled$$.value; }
    @Input() public set isEditingEnabled(value) { this._isEditingEnabled$$.next(value); }
    @Output() public readonly isEditingEnabled$ = this._isEditingEnabled$$.asObservable();

    public readonly _isAddingEnabled$$ = new BehaviorSubject<boolean>(true);
    public get isAddingEnabled() { return this._isAddingEnabled$$.value; }
    @Input() public set isAddingEnabled(value) { this._isAddingEnabled$$.next(value); }
    @Output() public readonly isAddingEnabled$ = this._isAddingEnabled$$.asObservable();

    public readonly _isDeletingEnabled$$ = new BehaviorSubject<boolean>(true);
    public get isDeletingEnabled() { return this._isDeletingEnabled$$.value; }
    @Input() public set isDeletingEnabled(value) { this._isDeletingEnabled$$.next(value); }
    @Output() public readonly isDeletingEnabled$ = this._isDeletingEnabled$$.asObservable();

    public readonly _isDuplicatingEnabled$$ = new BehaviorSubject<boolean>(false);
    public get isDuplicatingEnabled() { return this._isDuplicatingEnabled$$.value; }
    @Input() public set isDuplicatingEnabled(value) { this._isDuplicatingEnabled$$.next(value); }
    @Output() public readonly isDuplicatingEnabled$ = this._isDuplicatingEnabled$$.asObservable();

    private readonly _canAdd$$ = new BehaviorSubject<boolean>(this.isNotReadOnly && this.isAddingEnabled);
    public get canAdd() { return this._canAdd$$.value; }
    @Output() public readonly canAdd$ = combineLatest([this.isNotReadOnly$, this.isAddingEnabled$]).pipe(
        map(allTrue),
        storeIn(() => this._canAdd$$),
        shareReplayChangeLog(this, 'can add'));

    private readonly _canEdit$$ = new BehaviorSubject<boolean>(this.isNotReadOnly && this.isEditingEnabled);
    public get canEdit() { return this._canEdit$$.value; }
    @Output() public readonly canEdit$ = combineLatest([this.isNotReadOnly$, this.isEditingEnabled$]).pipe(
        map(allTrue),
        storeIn(() => this._canEdit$$),
        shareReplayChangeLog(this, 'can edit'));

    private readonly _canDelete$$ = new BehaviorSubject<boolean>(this.isNotReadOnly && this.isDeletingEnabled);
    public get canDelete() { return this._canDelete$$.value; }
    @Output() public readonly canDelete$ = combineLatest([this.isNotReadOnly$, this.isDeletingEnabled$]).pipe(
        map(allTrue),
        storeIn(() => this._canDelete$$),
        shareReplayChangeLog(this, 'can delete'));

    private readonly _canDuplicate$$ = new BehaviorSubject<boolean>(this.isNotReadOnly && this.isDuplicatingEnabled);
    public get canDuplicate() { return this._canDuplicate$$.value; }
    @Output() public readonly canDuplicate$ = combineLatest([this.isNotReadOnly$, this.isDuplicatingEnabled$]).pipe(
        map(allTrue),
        storeIn(() => this._canDuplicate$$),
        shareReplayChangeLog(this, 'can duplicate'));

    private readonly _isAddBtnVisible$$ = new BehaviorSubject<boolean>(this.canAdd);
    public get isAddBtnVisible() { return this._isAddBtnVisible$$.value; }
    @Output() public readonly isAddBtnVisible$ = this.canAdd$.pipe(
        storeIn(() => this._isAddBtnVisible$$),
        shareReplayChangeLog(this, 'isAddBtnVisible'));

    private readonly _isAddBtnEnabled$$ = new BehaviorSubject<boolean>(this.canAdd);
    public get isAddBtnEnabled() { return this._isAddBtnEnabled$$.value; }
    @Output() public readonly isAddBtnEnabled$ = this.canAdd$.pipe(
        storeIn(() => this._isAddBtnEnabled$$),
        shareReplayChangeLog(this, 'isAddBtnEnabled'));

    // constructor(
    //     cdr: ChangeDetectorRef,
    //     protected readonly _ngRouter: Router,
    //     protected readonly _errorsMngSvc: LoggingService,
    //     protected readonly _dialogSvc: DialogService,
    //     protected readonly _notificationsSvc: NotificationsService) {
    //     super(cdr);
    // }

    public override ngOnInit(): void {
        super.ngOnInit();
        this.subscribe([
            this.isReadOnly$,
            this.isNotReadOnly$,
            // add
            this.isAddingEnabled$,
            this.canAdd$,
            this.isAddBtnVisible$,
            this.isAddBtnEnabled$,
            // edit
            this.isEditingEnabled$,
            this.canEdit$,
            // duplicate
            this.isDuplicatingEnabled$,
            this.canDuplicate$,
            // delete
            this.isDeletingEnabled$,
            this.canDelete$,
        ]);
    }

    protected abstract getListItemCore$(id: TItemIdentity, criteria: TCriteria): Observable<IListItem<TItem> | undefined>;
    protected getListItem$(id: TItemIdentity): Observable<IListItem<TItem> | undefined> {
        return this.getListItemCore$(id, this.criteria).pipe(
            catchError((error: Error) =>
                this._errorsMngSvc.log('error', this.composeListItemRequestErrorMessageTitle(id, error), error).pipe(
                    switchMap(() => EMPTY))),
            onSubscription(() => this.isLoading = true),
            finalize(() => this.isLoading = false));
    }

    protected override transformListItems$(rows: readonly IListItem<TItem>[]): Observable<readonly IListItem<TItem>[]> {
        const transformedListItems$ = merge(
            of(rows).pipe(map(ImmutableArrayHandlers.getItemsChangedHandler)),
            this._appendItemsSignal$.pipe(map(ImmutableArrayHandlers.getAppendItemsHandler)),
            this._removeItemsSignal$.pipe(map(ImmutableArrayHandlers.getRemoveItemsHandler)),
            this._replaceItemsSignal$.pipe(map(ImmutableArrayHandlers.getReplaceItemsHandler))
        ).pipe(
            scan((items, handler) => handler(items), [] as readonly IListItem<TItem>[]));
        return transformedListItems$;
    }

    protected abstract getIdentityFromCrudItem(crudItem: TCrudItem): TItemIdentity;

    protected replaceListItem(replacement: ItemReplacement<IListItem<TItem>>) {
        this._replaceItemsTrigger$$.next([replacement]);
    }
    protected replaceListItems(replacements: readonly ItemReplacement<IListItem<TItem>>[] | ItemReplacement<IListItem<TItem>>[]) {
        this._replaceItemsTrigger$$.next(replacements);
    }
    protected removeListItem(listItem: IListItem<TItem>) {
        this._removeItemsTrigger$$.next([listItem]);
    }
    protected removeListItems(listItems: readonly IListItem<TItem>[] | IListItem<TItem>[]) {
        this._removeItemsTrigger$$.next(listItems);
    }
    protected appendListItem(listItem: IListItem<TItem>) {
        this._appendItemsTrigger$$.next([listItem]);
    }
    protected appendListItems(listItems: readonly IListItem<TItem>[] | IListItem<TItem>[]) {
        this._appendItemsTrigger$$.next(listItems);
    }

    protected reloadListItem$(id: TItemIdentity): Observable<void> {
        const oldListItem = this.getById(id);
        if (oldListItem == null)
            return throwError(() => new Error(`Item with ID ${id} is not present in currently loaded items collection.`));
        return this.getListItem$(id).pipe(
            tap(newListItem => {
                if (newListItem == null)
                    this.removeListItem(oldListItem);
                else
                    this.replaceListItem([oldListItem, newListItem]);
            }),
            toVoid());
    }

    // TODO: add parent id param
    protected abstract createForm$(subsTracker: SubsTracker, itemToEdit?: TCrudItem | undefined): Observable<FormGroup>;
    protected getCreationFormTitle(): string {
        return `Creazione`;
    }
    protected composeCreationErrorMessageTitle(error: Error): string {
        return `Creazione non riuscita`;
    }
    protected getCreationCompletedMessageTitle(): string {
        return `Creazione completata`;
    }

    protected abstract createCore$(crudItem: TCrudItem): Observable<TItemIdentity>;
    protected create$(newItem: TCrudItem) {

        if (this.isReadOnly)
            // TODO-WANTED: log
            return EMPTY;

        return this.createCore$(newItem).pipe(
            catchError((error: Error) =>
                this._errorsMngSvc.log('error', this.composeCreationErrorMessageTitle(error), error).pipe(
                    switchMap(() => throwError(() => error)))),
            tap({
                next: () => {
                    this._notificationsSvc.show({ type: 'success', title: this.getCreationCompletedMessageTitle() });
                }
            }),
            switchMap(newId =>
                this.getListItem$(newId).pipe(
                    map(listItem => {
                        if (listItem == null)
                            throw new Error(`Item not found.`);
                        return listItem;
                    }))),
            tap({
                next: newListItem => {
                    this.appendListItem(newListItem);
                }
            }),
            onSubscription(() => this.isLoading = true),
            finalize(() => this.isLoading = false));
    }

    protected abstract getNewItemTemplate$(): Observable<TCrudItem>;

    public creation$() {

        if (this.isReadOnly)
            // TODO-WANTED: log
            return EMPTY;

        return this.getNewItemTemplate$().pipe(
            throwWhen(isNil, () => new Error(`Creation template not found.`)),
            switchMap(newItemTemplate => {
                return typedUsing(
                    () => new Subscription(),
                    subsBag => {
                        const subsTracker = new SubsTracker(subsBag, `creation form`);
                        return this.createForm$(subsTracker, newItemTemplate).pipe(
                            switchMap(form => {
                                return this._dialogSvc.showForm({
                                    title: this.getCreationFormTitle(),
                                    form: form,
                                    submit: (form) => {
                                        const itemCreationData = form.value;
                                        return this.create$(itemCreationData).pipe(toVoid());
                                    }
                                }).pipe(toVoid());
                            }));
                    });
            }));
    }
    public startCreation(): void {
        this.subscribe(this.creation$());
    }

    protected getEditFormTitle(): string {
        return `Modifica`;
    }
    protected composeEditErrorMessageTitle(error: Error): string {
        return `Modifica non riuscita`;
    }
    protected getEditCompletedMessageTitle(): string {
        return `Modifica completata`;
    }
    protected composeCrudModelRequestErrorMessageTitle(error: Error): string {
        return `Not found`;
    }
    protected abstract getSingleCrudModelCore$(id: TItemIdentity): Observable<TCrudItem>;
    protected abstract editCore$(itemToEdit: TCrudItem): Observable<void>;
    protected edit$(itemToEdit: TCrudItem): Observable<void> {

        if (this.isReadOnly)
            // TODO-WANTED: log
            return EMPTY;

        const id = this.getIdentityFromCrudItem(itemToEdit);
        return this.editCore$(itemToEdit).pipe(
            catchError((error: Error) =>
                this._errorsMngSvc.log('error', this.composeCreationErrorMessageTitle(error), error).pipe(
                    switchMap(() => throwError(() => error)))),
            tap({
                next: () => {
                    this._notificationsSvc.show({ type: 'success', title: this.getEditCompletedMessageTitle() });
                }
            }),
            switchMap(() => {
                return this.getListItem$(id).pipe(map(listItem => {
                    if (listItem == null)
                        throw new Error(`Item not found.`);
                    return listItem;
                }));
            }),
            map(newListItem => {
                const oldListItem = this.listItems?.find(row => this.getIdentityFromItem(row.item) === id)
                if (oldListItem == null)
                    throw new Error(`Cannot find item to replace.`);
                return [oldListItem, newListItem] as ItemReplacement<IListItem<TItem>>;
            }),
            tap(replacement => {
                this.replaceListItem(replacement);
            }),
            toVoid(),
            onSubscription(() => this.isLoading = true),
            finalize(() => this.isLoading = false));
    }
    public editing$(itemToEdit: TCrudItem) {

        if (this.isReadOnly)
            // TODO-WANTED: log
            return EMPTY;

        return typedUsing(
            () => new Subscription(),
            subsBag => {
                const subsTracker = new SubsTracker(subsBag, `editing form`);
                return this.createForm$(subsTracker, itemToEdit).pipe(switchMap(form => {
                    return this._dialogSvc.showForm({
                        title: this.getEditFormTitle(),
                        form: form,
                        submit: (form) => {
                            const itemEditingData = form.value;
                            return this.edit$(itemEditingData).pipe(toVoid());
                        }
                    }).pipe(toVoid());
                }));
            });
    }
    public startEditing(itemToEdit: TCrudItem): void {
        this.subscribe(this.editing$(itemToEdit));
    }
    public editingListItem$(listItemToEdit: TItem) {
        const id = this.getIdentityFromItem(listItemToEdit);
        return this.getSingleCrudModelCore$(id).pipe(
            catchError((error: Error) =>
                this._errorsMngSvc.log('error', this.composeCrudModelRequestErrorMessageTitle(error), error).pipe(
                    switchMap(() => EMPTY))),
            switchMap(crudModel => this.editing$(crudModel)));
    }
    public startEditingByListItem(listItemToEdit: TItem): void {
        this.subscribe(this.editingListItem$(listItemToEdit));
    }

    protected duplicate$(griditem: TItem): Observable<TItemIdentity> {
        return throwError(() => new NotImplementedError('duplicate$', this));
    }
    public startDuplicatingByGridItem(griditem: TItem): void {
        this.subscribe(this.duplicate$(griditem))
    }

    protected composeDeleteErrorMessageTitle(error: Error): string {
        return `Eliminazione non riuscita`;
    }
    protected getDeleteCompletedMessageTitle(): string {
        return `Eliminazione completata`;
    }
    protected abstract deleteCore$(id: TItemIdentity): Observable<void>;
    protected delete$(id: TItemIdentity): Observable<void> {

        if (this.isReadOnly)
            // TODO-WANTED: log that we shouldn't have reached this point
            return EMPTY;

        return this.deleteCore$(id).pipe(
            // TODO-WANTED: set busy flag
            catchError((error: Error) =>
                this._errorsMngSvc.log('error', this.composeDeleteErrorMessageTitle(error), error).pipe(
                    switchMap(() => EMPTY))),
            tap({
                next: () => {
                    this._notificationsSvc.show({ type: 'success', title: this.getDeleteCompletedMessageTitle() });
                }
            }),
            map(() => {
                const listItem = this.listItems?.find(row => this.getIdentityFromItem(row.item) === id);
                if (listItem == null)
                    throw new Error(`Could not identify item to remove.`);
                return listItem;
            }),
            tap(listItem => {
                this.removeListItem(listItem);
            }),
            toVoid());
    }
    public delete(id: TItemIdentity): void {
        this.subscribe(this.deleting$(id));
    }
    public deleteByListItem(listItem: TItem): void {
        const id = this.getIdentityFromItem(listItem);
        this.subscribe(this.deleting$(id));
    }
    private deleting$(id: TItemIdentity): Observable<void> {

        if (id == null) {
            return throwError(() => new Error(`Nessun elemento selezionato per l'eliminazione`)).pipe(
                catchError((error: Error) =>
                    this._errorsMngSvc.log('error', `Eliminazione non riuscita`, error).pipe(
                        switchMap(() => EMPTY))));
        }

        if (this.isReadOnly)
            // TODO-WANTED: log that we shouldn't have reached this point
            return EMPTY;

        const deleteDialogConfig: IChoiceDialogConfig<'delete' | 'cancel'> = {
            title: 'Eliminazione',
            message: `Eliminare l'elemento selezionato?`,
            buttons: [
                { getValue: () => of('delete'), label: 'Elimina' },
                { getValue: () => of('cancel'), label: 'Annulla' },
            ]
        };

        return this._dialogSvc.showChoice(deleteDialogConfig).pipe(
            filter(result => result === 'delete'),
            switchMap(() => {
                return this.delete$(id);
            }));
    }
    public startDeleting(id: TItemIdentity): void {
        this.subscribe(this.deleting$(id));
    }
    public deletingListItem$(listItem: TItem) {
        const id = this.getIdentityFromItem(listItem);
        return this.deleting$(id);
    }
    public startDeletingByListItem(listItem: TItem): void {
        this.subscribe(this.deletingListItem$(listItem));
    }
}
