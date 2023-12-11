import { BehaviorSubject, defer, from, ObservableInput, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, map, repeatWhen, share, shareReplay, startWith, takeWhile, tap } from 'rxjs/operators';
import { ObservableValueSourceSettings } from './ObservableValueSourceSettings';

type Filter<T, U> = T extends U ? T : never;
type BanIfExtends<T, U> = T extends U ? never : never;
type MyData = { readonly nome: string } | null;
type NeverWith<TUnion, TBan> = TBan extends Extract<TUnion, TBan> ? never : TUnion;
type NotUndefined<T> = NeverWith<T, undefined>;
type faefaw = MyData extends Exclude<MyData, undefined> ? MyData : never;

type shouldBeNever = NotUndefined<MyData | undefined>;
type shouldBeType = NotUndefined<MyData>;

export class ObservableValueSource<
    TValue
// , TValue = NotUndefined<TData>
> {

    constructor(
        asyncDataGetterFn: () => ObservableInput<NotUndefined<TValue>>,
        settings?: ObservableValueSourceSettings<NotUndefined<TValue>>) {

        this._asyncDataGetterFn = asyncDataGetterFn;

        this.loggingId = settings?.loggingId;
        this.isLoggingEnabled = this.loggingId !== undefined && (settings?.isLoggingEnabled ?? true);
    }

    private readonly _asyncDataGetterFn: () => ObservableInput<NotUndefined<TValue>>;
    protected getDataAsync() {
        return this._asyncDataGetterFn();
    }

    public readonly loggingId?: string;
    public readonly isLoggingEnabled: boolean = false;

    private readonly _isLoading$$ = new BehaviorSubject<boolean>(false);
    public get isLoading() { return this._isLoading$$.value; }
    // @Output() public readonly isLoading$ = this._isLoading$$
        .pipe(
        distinctUntilChanged(),
            tap(value => this.conditionallyLog("Is loading", value)),
            shareReplay({ bufferSize: 1, refCount: true }));

    // @Output() public readonly canReload$: Observable<boolean> = this.isLoading$
        .pipe(
                map(() => this.canReload),
                distinctUntilChanged(),
                tap(value => this.conditionallyLog("Can reload", value)),
                shareReplay({ bufferSize: 1, refCount: true }));
    public get canReload() { return this._isLoading$$.value === false; }

    private readonly _reloadTrigger$$ = new Subject<void>();
    // @Output() public readonly reloadSignal$ = this._reloadTrigger$$
        .pipe(
                    takeWhile(() => this.canReload),
                    distinctUntilChanged(),
                    tap(() => this.conditionallyLog("Reloading")),
                    share());

    private readonly _hasError$$ = new BehaviorSubject<boolean>(false);
    public get hasError() { return this._hasError$$.value; }
    // @Output() public readonly hasError$ = this._hasError$$
        .pipe(
                        distinctUntilChanged(),
                        tap(value => this.conditionallyLog("Has error", value)),
                        shareReplay({ bufferSize: 1, refCount: true }));

    // @Output() public readonly canReset$: Observable<boolean> = combineLatest([this.isLoading$, this.hasError$])
        .pipe(
                            map(() => this.canReset),
                            distinctUntilChanged(),
                            tap(value => this.conditionallyLog("Can reset", value)),
                            shareReplay({ bufferSize: 1, refCount: true }));
    public get canReset() { return this.isLoading === false && this.hasError === false; }

    private readonly _resetTrigger$$ = new Subject<void>();
    // @Output() public readonly resetSignal$ = this._resetTrigger$$
        .pipe(
                                takeWhile(() => this.canReload),
                                tap(() => this.conditionallyLog("Resetting")),
                                share());

    protected readonly _value$ = defer(
                                    () => {
                                        this._isLoading$$.next(true);
                                        this._hasError$$.next(false);
                                        return from(this.getDataAsync())
                                            .pipe(
                                                catchError((error) => {
                                                    this.conditionallyLog("Loading error");
                                                    this._hasError$$.next(true);
                                                    return of(undefined);
                                                }),
                                                finalize(() => {
                                                    this._isLoading$$.next(false);
                                                }));
                                    })
    .pipe(
        startWith(undefined),
        repeatWhen(() => this.reloadSignal$),
        tap(value => this.conditionallyLog("Data emitted", value, true)),
        shareReplay({ bufferSize: 1, refCount: true }));

    public readonly value$ = this._value$;

    public readonly hasValue$ = this.value$
    .pipe(
        map(value => value !== undefined),
        tap(value => this.conditionallyLog("Has value", value)),
        shareReplay({ bufferSize: 1, refCount: true }));

    protected conditionallyLog<TLogData>(
            eventName: string,
            logData ?: TLogData,
            logUndefined: boolean = false): void {

                if(!this.isLoggingEnabled)
                return;

                if(this.loggingId === undefined)
                throw new Error('Logging ID not defined.');

                logEvent(this.loggingId, eventName, logData, logUndefined);
            }

    public reload(): void { this._reloadTrigger$$.next(); }
    public reset(): void { this._resetTrigger$$.next(); }
}