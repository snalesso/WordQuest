import { Observable, of } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { DataOp } from "../data/models/DataOp";

export function switchMapWith<TIn, TOut>(
    awaitingValue: TOut,
    canGetValue: (input: TIn) => boolean,
    getValueAsync: (value: TIn) => Observable<TOut>) {
    return (source$: Observable<TIn>) =>
        source$.pipe(
            switchMap(inValue => {
                if (!canGetValue(inValue))
                    return of(awaitingValue);
                return getValueAsync(inValue).pipe(startWith(awaitingValue));
                // return concat(of(awaitingValue), asyncFn(inValue));
            }));
}

export function toDataOp<TIn>(source: Observable<TIn>): Observable<DataOp<TIn>> {
    return source
        .pipe(
            map<TIn, DataOp<TIn>>(value => ({
                isLoading: false,
                data: value,
                error: undefined
            })),
            startWith<DataOp<TIn>>({
                isLoading: true,
                data: undefined,
                error: undefined
            })
        );
}