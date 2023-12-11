import { defer, from, NEVER, noop, Observable, ObservableInput, Observer, of } from "rxjs";
import { filter, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';

export function emptyArray<T>(): Observable<T[]> {
    return of<T[]>([]);
}

/**Creates an observable that emits a value and doesn't complete. Like an `rxjs.of` but doesn't complete. */
export function firstForever<T>(getValueSource: () => ObservableInput<T>) {
    return from(getValueSource()).pipe(switchMap(v => NEVER.pipe(startWith(v))));
}

/**Maps each emitted array to to a new array with items sorted using the specified comparer function. */
export function orderBy<T>(comparerFn: (x: T, y: T) => number) {
    return function (source$: Observable<T[]>) {
        return source$.pipe(map(items => [...items].sort(comparerFn)));
    }
}

/**Projects each emitted value to a `boolean` indicating whether the emitted value equals (`===`) to the provided value. */
export function mapEqualsTo<T>(value: T) {
    return function (source$: Observable<T>) {
        return source$.pipe(map(v => v === value));
    }
}

/**Projects each emitted `boolean` to its inverse. Throws if the emitted value is not a `boolean`. */
export function mapInvertedBool() {
    return function (source$: Observable<boolean>) {
        return source$.pipe(map(v => {
            if (v === false)
                return true;
            if (v === true)
                return false;
            throw new Error(`${JSON.stringify(v)} is not a boolean.`);
        }));
    }
}

/**Filters values emitted from the source observable in order to allow only values which equal to the provided value. */
export function filterEqualsTo<TObs, TValue extends TObs>(value: TValue) {
    return function (source$: Observable<TObs>) {
        return source$.pipe(filter(v => v === value));
    }
}

/**Filters values emitted from the source observable in order to allow only values which are included in the provided group of values. */
export function filterIn<T>(values: Iterable<T>) {
    return function (source$: Observable<T>) {
        return source$
            .pipe(
                filter(v => {
                    for (const value of values) {
                        if (v === value)
                            return true;
                    }
                    return false;
                }));
    }
}

export function trackWith<T>(tracker$$: Observer<boolean>) {
    return (source$: Observable<T>) => {
        return defer(() => {
            tracker$$.next(true);
            return source$.pipe(finalize(() => tracker$$.next(false)));
        });
    }
}

export function trackSubscription<T, U extends T>(tracker$$: Observer<T>, trackValue: U) {
    return <TObs>(source$: Observable<TObs>) => {
        return defer(() => {
            tracker$$.next(trackValue);
            return source$;
        });
    }
}

export function tapOnSub(action: () => void) {
    return <T>(source$: Observable<T>) => {
        return defer(() => {
            action();
            return source$;
        });
    }
}

export function trackEmission<T, U extends T>(tracker$$: Observer<T>, trackValue: U) {
    return <TObs>(source$: Observable<TObs>) => {
        return source$
            .pipe(
                tap(() => tracker$$.next(trackValue)));
    }
}

export function tapAll(action: () => void) {
    return <T>(source$: Observable<T>) => {
        return source$
            .pipe(
                tap({
                    next: action,
                    error: action,
                    complete: action
                }));
    }
}

export function trackExecution<T>(source$: Observable<T>, tracker$$: Observer<boolean>) {
    return defer(() => {
        tracker$$.next(true);
        return source$.pipe(finalize(() => tracker$$.next(false)));
    });
}

export function consoleLog<T, K>(text: string, value?: K/*, logUndefined: boolean = true*/) {
    return (source$: Observable<T>) => {
        return source$
            .pipe(
                tap(() => {
                    // if (value === undefined && logUndefined === true)
                    //     console.log(text, 'undefined');
                    // else
                    console.log(text, value);
                }));
    }
}

export function log<T>(text: string, logFns: (<K>(t: string, v: K) => void)[]) {
    return (source$: Observable<T>) => {
        return source$
            .pipe(
                tap(value => {
                    for (const logFn of logFns)
                        logFn?.(text, value);
                }));
    }
}

export function fromVoid() { return of(noop()); }

export function toVoid() {
    return <T>(source$: Observable<T>) => {
        return source$.pipe(map(noop));
    }
}

export function mapAllItemsEqualTo<T>(value: T) {
    return (source$: Observable<Iterable<T>>) => {
        return source$.pipe(map(items => {
            for (const item of items)
                if (item !== value)
                    return false;
            return true;
        }))
    }
}