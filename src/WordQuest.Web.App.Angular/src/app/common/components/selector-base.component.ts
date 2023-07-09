import { Directive, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, multicast, refCount, shareReplay, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/reactive.component';
import { allTrue, isNilOrEmpty } from 'src/app/common/utils/core.utils';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { ISelectable } from 'src/app/root/models/core';

@Directive()
export abstract class SelectorBaseComponent<TItem, TIdentity> extends ReactiveComponent implements OnInit {

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

    private readonly _items$$ = new BehaviorSubject<ISelectable<TItem>[] | undefined>(undefined);
    public get items() { return this._items$$.value; }
    @Input()
    public set items(value: ISelectable<TItem>[] | undefined) { this._items$$.next(value); }
    @Output()
    public readonly items$ = this._items$$.pipe(
        distinctUntilChanged(),
        tap(value => logEvent(this, 'items', value)),
        shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _areItemsAvailable$$ = new BehaviorSubject<boolean>(!isNilOrEmpty(this.items));
    public get areItemsAvailable() { return this._areItemsAvailable$$.value; }
    @Output()
    public readonly areItemsAvailable$ = this.items$.pipe(
        map(cats => !isNilOrEmpty(cats)),
        multicast(() => this._areItemsAvailable$$),
        refCount(),
        distinctUntilChanged(),
        tap(value => logEvent(this, 'areItemsAvailable', value)),
        shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _selectedItems$$ = new BehaviorSubject<readonly ISelectable<TItem>[] | undefined>(undefined);
    public get selectedItems() { return this._selectedItems$$.value; }
    @Input()
    public set selectedItems(value) { this._selectedItems$$.next(value); }
    @Output()
    public readonly selectedItems$ = this._selectedItems$$.asObservable();

    private readonly _canFilterItems$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areItemsAvailable]));
    @Output()
    public readonly canFilterItems$ = this.items$.pipe(
        map(cats => !isNilOrEmpty(cats)),
        multicast(() => this._canFilterItems$$),
        refCount(),
        distinctUntilChanged(),
        tap(value => logEvent(this, 'canFilterItems', value)),
        shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _canChooseItems$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areItemsAvailable]));
    @Output()
    public readonly canChooseItems$ = this.items$.pipe(
        map(cats => !isNilOrEmpty(cats)),
        multicast(() => this._canChooseItems$$),
        refCount(),
        distinctUntilChanged(),
        tap(value => logEvent(this, 'canChooseItems', value)),
        shareReplay({ bufferSize: 1, refCount: true }));

    ngOnInit(): void {
        this.subscribe([
            this.isEnabled$,
            this.isLoading$,
            this.items$,
            this.selectedItems$,
            this.areItemsAvailable$,
            this.canFilterItems$,
        ]);

        this.subscribe(this.items$, {
            next: items => {
                this.selectedItems = [];
            }
        });
    }

    protected abstract getItemId(item: ISelectable<TItem>): TIdentity;
}
