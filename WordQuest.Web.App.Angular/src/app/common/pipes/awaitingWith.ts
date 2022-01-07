import { invalid } from "@angular/compiler/src/render3/view/util";
import { merge, Observable, of, concat, ObservableInput, from, SubscribableOrPromise } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { DataOp } from "../data/models/DataOp";

export function switchMapWith<TIn, TOut>(
    awaitingValue: TOut,
    filter: (input: TIn) => boolean,
    asyncFn: (value: TIn) => Observable<TOut>) {
    return (source: Observable<TIn>) =>
        source.pipe(
            switchMap(inValue => {
                // TODO: use NEVER while waiting
                return filter(inValue)
                    ? concat(of(awaitingValue), asyncFn(inValue))
                    : of(awaitingValue);
            }));
}

export function toDataOp<TIn>(source: Observable<TIn>): Observable<DataOp<TIn>> {
    return source
        .pipe(
            map<TIn, DataOp<TIn>>(value => ({
                isLoading: false,
                data: value,
                error: null
            })),
            startWith<DataOp<TIn>>({
                isLoading: true,
                data: null,
                error: null
            })
        );
}