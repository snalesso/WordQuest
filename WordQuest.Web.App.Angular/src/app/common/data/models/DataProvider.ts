import { BehaviorSubject, defer, from, Observable, SubscribableOrPromise } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { assert } from "../../model/assert";

export enum DataProviderStatus {
    Unloaded,
    Loading,
    Loaded,
    Faulted
}

export interface DataProviderConfig<T> {
    readonly status: DataProviderStatus;
    readonly dataSource$: SubscribableOrPromise<T>;
}

export class DataProvider<T> {

    private readonly _status$$ = new BehaviorSubject<DataProviderStatus>(this._config.status);

    public readonly status$ = this._status$$.asObservable();
    public readonly dataSource$: Observable<T>;

    constructor(private readonly _config: DataProviderConfig<T>) {

        assert.notNil(this._config, "_config");

        this.dataSource$ = defer(() => from(this._config.dataSource$)).pipe(shareReplay(1));
    }
}