import { invalid } from "@angular/compiler/src/render3/view/util";
import { merge, Observable, of, concat } from "rxjs";
import { switchMap } from "rxjs/operators";

export function switchMapWith<TIn, TOut>(
    awaitingValue: TOut,
    filter: (input: TIn) => boolean,
    asyncFn: (value: TIn) => Observable<TOut>) {
    return (source: Observable<TIn>) =>
        source.pipe(
            switchMap(inValue => {
                return filter(inValue)
                    ? concat(
                        of(awaitingValue),
                        asyncFn(inValue))
                    : of(awaitingValue);
            }));
}