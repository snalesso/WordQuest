import { BehaviorSubject, combineLatest, defer, iif, isObservable, NEVER, noop, Observable, ObservableInput, of, PartialObserver, Subject, Subscription, TeardownLogic } from 'rxjs';
import { filter, finalize, first, map, multicast, refCount, repeatWhen, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { getIsIncludedInFn } from '../collections/common';
import { AnyArray, AnyCollection } from '../collections/types.utils';

/**Creates an observable that emits a value and doesn't complete. Like an `rxjs.of` but doesn't complete. */
// export function forever<T>(getValueSource: () => ObservableInput<T>) {
//     return from(getValueSource()).pipe(switchMap(v => NEVER.pipe(startWith(v))));
// }
export function forever<T>(value: T): Observable<T>;
export function forever<T>(obs: Observable<T>): Observable<T>;
export function forever<T>(valueOrObs: T | Observable<T>): Observable<T> {
    if (isObservable(valueOrObs))
        return valueOrObs.pipe(switchMap(value => forever(value)));
    else
        return NEVER.pipe(startWith(valueOrObs));
}

/**Maps each emitted array to to a new array with items sorted using the specified comparer function. */
export function orderBy<T>(comparerFn: (x: T, y: T) => number) {
    return function (source$: Observable<T[]>) {
        return source$.pipe(map(items => [...items].sort(comparerFn)));
    }
}

/**Projects each emitted value to a `boolean` indicating whether the emitted value equals (`===`) to the provided value. */
export function mapEqualsTo<T, TV extends T>(value: T) {
    return function (source$: Observable<TV>) {
        return source$.pipe(map(v => v === value));
    }
}

export function mapIncludes<T, U extends T>(value: U) {
    return function (source$: Observable<Array<T> | ReadonlyArray<T>>) {
        return source$.pipe(map(values => values.includes(value)));
    }
}

export function mapHas<T, U extends T>(value: U) {
    return function (source$: Observable<Set<T> | ReadonlySet<T>>) {
        return source$.pipe(map(values => values.has(value)));
    }
}

export function mapIsIncludedIn<T>(values: AnyCollection<T>) {
    const isIncludedInValues = getIsIncludedInFn(values);
    return function (source$: Observable<T>) {
        return source$.pipe(map(isIncludedInValues));
    }
}

export function asReadonly() {
    return function <T>(source$: Observable<T[] | readonly T[]>) {
        return source$ as Observable<readonly T[]>;
    }
}

/**Projects each emitted `boolean` to its negation. Throws if the emitted value is not a `boolean`. */
export function negate() {
    return function (source$: Observable<boolean>) {
        return source$.pipe(map(value => {
            if (value === false)
                return true;
            if (value === true)
                return false;
            throw new Error(`${JSON.stringify(value)} is not a boolean.`);
        }));
    }
}

export function storeIn<T>(getSubject: () => BehaviorSubject<T>) {
    return (source$: Observable<T>) => {
        return source$.pipe(multicast(getSubject), refCount());
    };
}

/**Filters values emitted from the source observable in order to allow only values which equal to the provided value. */
export function filterEqualsTo<T, TValue extends T>(value: TValue) {
    return function (source$: Observable<T>) {
        return source$.pipe(filter(v => v === value));
    }
}

export const filterValue = <T, TValue extends T>(value: TValue) =>
    (source$: Observable<T>) =>
        source$.pipe(filter(v => v === value));
export const filterTrue = () => (source$: Observable<boolean>) => source$.pipe(filterValue(true));
export const filterFalse = () => (source$: Observable<boolean>) => source$.pipe(filterValue(false));


export const firstValue = <T, TValue extends T>(value: TValue) =>
    (source$: Observable<T>) =>
        source$.pipe(first(v => v === value));
export const firstTrue = () => (source$: Observable<boolean>) => source$.pipe(firstValue(true));
export const firstFalse = () => (source$: Observable<boolean>) => source$.pipe(firstValue(false));

/**Filters values emitted from the source observable in order to allow only values which are included in the provided group of values. */
export function filterIn<T>(values: Iterable<T>) {
    return function (source$: Observable<T>) {
        return source$.pipe(
            filter(v => {
                for (const value of values) {
                    if (v === value)
                        return true;
                }
                return false;
            }));
    }
}

export function onSubscription(handler: (() => void)) {
    return <TObs>(source$: Observable<TObs>) => {
        return defer(() => {
            handler();
            return source$;
        });
    }
}

export function trackCreation<T, U extends T>(getTracker: () => Subject<T>, trackValue: U) {
    return <TObs>(source$: Observable<TObs>) => {
        return defer(() => {
            const tracker$$ = getTracker();
            tracker$$.next(trackValue);
            return source$;
        });
    }
}
export function trackEmission<T, U extends T>(getTracker: () => Subject<T>, trackValue: U) {
    return <TObs>(source$: Observable<TObs>) => {
        return source$.pipe(
            tap(() => {
                const tracker$$ = getTracker();
                tracker$$.next(trackValue);
            }));
    }
}

export function trackCompletion<T, U extends T>(getTracker: () => Subject<T>, trackValue: U) {
    return <TObs>(source$: Observable<TObs>) => {
        return defer(() => {
            return source$.pipe(
                finalize(() => {
                    const tracker$$ = getTracker();
                    tracker$$.next(trackValue);
                }));
        });
    }
}

/**Tracks the entire lifetime of the observable, from creation to completion. */
export function trackWith<T>(getTracker: () => Subject<boolean>) {
    return (source$: Observable<T>) => {
        return source$.pipe(
            trackCreation(getTracker, true),
            trackCompletion(getTracker, false));
    }
}

export function shareSingleReplay(refCount: boolean = true) {
    return <TObs>(source$: Observable<TObs>) => {
        return source$.pipe(shareReplay({ bufferSize: 1, refCount: refCount }));
    }
}

export function fromVoid() { return of(noop()); }

export function toVoid() {
    return <T>(source$: Observable<T>) => {
        return source$.pipe(map(noop));
    }
}

export function conditionalSwitchMap<TPos, TNeg>(positiveBranch$: Observable<TPos>, negativeBranch$: Observable<TNeg>) {
    return function (source$: Observable<boolean>) {
        return source$.pipe(
            switchMap(condition => {
                return iif(() => condition, positiveBranch$, negativeBranch$);
            }));
    }
}

export function reEmitWhen<T>(getTrigger: () => Observable<T>) {
    return function <T>(source$: Observable<T>) {
        return source$.pipe(
            switchMap(value => of(value).pipe(
                repeatWhen(getTrigger))));
    }
}

export function combineConditions(operator: 'ANY' | 'ALL', conditions: AnyArray<ObservableInput<boolean>>) {
    const conditions$ = combineLatest([...conditions]);
    switch (operator) {
        case 'ANY':
            return conditions$.pipe(map(values => {
                for (const value of values)
                    if (value === true)
                        return true;
                return false;
            }));
        case 'ALL':
            return conditions$.pipe(map(values => {
                for (const value of values)
                    if (value === false)
                        return false;
                return true;
            }));
        default:
            throw new Error('Conditions correlation operator not supported: ' + operator);
    }
}

export function typedUsing<TTeardownLogic extends TeardownLogic, TValue>(
    teardownLogicFactory: () => TTeardownLogic,
    observableFactory: (teardownLogic: TTeardownLogic) => ObservableInput<TValue>)
    : Observable<TValue> {

    if (teardownLogicFactory == null)
        throw new Error(`Teardown logic factory not defined.`);
    if (observableFactory == null)
        throw new Error(`Observable factory not provided.`);

    return new Observable<TValue>(subscriber => {
        const teardownLogic = teardownLogicFactory();
        const obsOrVoid = observableFactory(teardownLogic);
        if (!isObservable(obsOrVoid))
            throw new Error(`No observable provided.`);
        const subscription = obsOrVoid.subscribe(subscriber);
        return () => {
            subscription.unsubscribe();
            if (teardownLogic == null)
                return;
            if (typeof teardownLogic === 'function')
                return teardownLogic();
            return teardownLogic.unsubscribe();
        };
    });
}

export function createSubsTracker(trackSub: (sub: Subscription) => void) {
    return <T>(source$: Observable<T>, observer?: PartialObserver<T>) => {
        const sub = source$.subscribe(observer);
        trackSub(sub);
    }
}

export function usingSubs<TOut>(
    createObs$: (trackSub: <T>(source$: Observable<T>, observer?: PartialObserver<T>) => Subscription | void) => Observable<TOut>) {

    return typedUsing(
        () => new Subscription(),
        subsBag => defer(() => {
            const trackSub = <T>(source$: Observable<T>, observer?: PartialObserver<T>) => subsBag.add(source$.subscribe(observer));
            return createObs$(trackSub);
        }));
}

export function throwWhen<TValue>(isNotValid: (_: TValue) => boolean, errorFactory: (_: TValue) => Error) {
    return function (source$: Observable<TValue>): Observable<TValue> {
        return source$.pipe(map(value => {
            if (isNotValid(value))
                throw errorFactory(value);
            return value;
        }))
    }
}

export type ItemReplacement<T> = readonly [oldItem: T, newItem: T];
export const ImmutableArrayHandlers = {
    getItemsChangedHandler: <T>(newItems: readonly T[]) => {
        return (oldItems: readonly T[]) => {
            if (newItems == null)
                throw new Error('New items list not defined.');
            return newItems;
        };
    },
    getAppendItemsHandler: <T>(itemsToAppend: readonly T[]) => {
        return (sourceItems: readonly T[]) => {
            if (itemsToAppend == null)
                throw new Error('Items to append list not defined.');
            return itemsToAppend.length > 0
                ? [...sourceItems, ...itemsToAppend]
                : sourceItems;
        }
    },
    getRemoveItemHandler: <T>(itemToRemove: T) => {
        return (sourceItems: readonly T[]) => {
            if (itemToRemove == null)
                throw new Error('Item to remove not defined.');
            const i = sourceItems.indexOf(itemToRemove);
            return i !== -1
                ? [...sourceItems.slice(0, i), ...sourceItems.slice(i + 1, sourceItems.length)]
                : sourceItems;
        };
    },
    getRemoveItemsHandler: <T>(itemsToRemove: readonly T[]) => {
        return (sourceItems: readonly T[]) => {
            if (itemsToRemove == null)
                throw new Error('Items to remove list not defined.');
            if (itemsToRemove.length <= 0)
                return sourceItems;
            return sourceItems.filter(item => !itemsToRemove.includes(item))
        };
    },
    getReplaceItemByReplHandler: <T>(replacement: readonly [oldItem: T, newItem: T]) => {
        return (sourceItems: readonly T[]) => {
            if (replacement == null)
                throw new Error('Replacement not defined.');
            if (replacement.length !== 2 || replacement[0] == null || replacement[1] == null)
                throw new Error('Bad replacement format.');
            const [oldItem, newItem] = replacement;
            const i = sourceItems.indexOf(oldItem);
            return i !== -1
                ? [...sourceItems.slice(0, i), newItem, ...sourceItems.slice(i + 1, sourceItems.length)]
                : sourceItems;
        };
    },
    getReplaceItemsHandler: <T>(replacements: readonly ItemReplacement<T>[]) => {
        return (sourceItems: readonly T[]) => {
            if (replacements == null)
                throw new Error('Replacements list not defined.');

            const newItems: T[] = [];
            const remainingReplacements: ItemReplacement<T>[] = [...replacements];
            for (const sourceItem of sourceItems) {
                let nextItem = sourceItem;
                const replCount = remainingReplacements.length;
                for (let replIdx = 0; replIdx < replCount; replIdx++) {
                    const replacement = replacements[replIdx];
                    if (replacement == null)
                        throw new Error('Replacement not defined.');
                    if (replacement.length !== 2 || replacement[0] == null || replacement[1] == null)
                        throw new Error('Bad replacement format.');
                    const [oldItem, newItem] = replacement;

                    if (oldItem !== nextItem)
                        continue;

                    nextItem = newItem;
                    remainingReplacements.splice(replIdx, 1);
                }
                newItems.push(nextItem);
            }

            if (remainingReplacements.length > 0)
                throw new Error(`${remainingReplacements.length} replacements had no match.`);

            return newItems;
        };
    }
}

export const MutableArrayHandlers = {
    getItemsChangedHandler: <T>(newItems: T[]) => {
        return () => {
            return newItems;
        };
    },
    getAppendItemsHandler: <T>(itemsToAppend: readonly T[]) => {
        return (items: T[]) => {
            if (items == null)
                throw new Error('Items to append not defined');
            items.push(...itemsToAppend);
            return items;
        };
    },
    getRemoveItemHandler: <T>(itemToRemove: T) => {
        return (items: T[]) => {
            if (itemToRemove == null)
                throw new Error('Item to remove not defined');
            const i = items.indexOf(itemToRemove);
            if (i < 0)
                throw new Error('Item to remove is not included');
            items.splice(i, 1);
            return items;
        };
    },
    getRemoveItemsHandler: <T>(itemsToRemove: readonly T[]) => {
        return (items: T[]) => {
            if (itemsToRemove == null)
                throw new Error('Items to remove not defined');
            for (const itemToRemove of itemsToRemove) {
                if (itemToRemove == null)
                    throw new Error('Item to remove not defined');
                const i = items.indexOf(itemToRemove);
                if (i < 0)
                    throw new Error('Item to remove is not included');
                items.splice(i, 1);
            }
            return items;
        };
    },
    getReplaceItemHandler: <T>(oldItem: T, newItem: T) => {
        return (items: T[]) => {
            if (oldItem == null)
                throw new Error('Item to replace not defined');
            if (newItem == null)
                throw new Error('Item to use as replacement not defined');
            const i = items.indexOf(oldItem);
            if (i < 0)
                throw new Error('Item to replace is not included');
            if (items.includes(newItem))
                throw new Error('Item to use as replacement is already included');
            items[i] = newItem;
            return items;
        };
    },
    getReplaceItemsHandler: <T>(replacements: readonly ItemReplacement<T>[]) => {
        return (items: T[]) => {
            if (replacements == null)
                throw new Error('Replacements not defined');

            const count = items.length;
            const repl = [...replacements];
            let i = count;
            while (--i >= 0) {
                const item = items[i];
                const ri = repl.findIndex(x => x[0] === item);
                if (ri < 0)
                    continue;
                const r = repl[ri];
                repl.splice(ri, 1);
                items[i] = r[1];
            }
            if (repl.length > 0)
                throw new Error('Not all replacements could be applied.');

            return items;
        };
    }
}

export function cast<TTarget>() {
    return <TSource>(source$: Observable<TSource>) => {
        return source$ as any as Observable<TTarget>;
    }
}

// export function filterInstanceOf<TObs, TClass extends TObs>(ctor: { new (): TClass }) {
//     return (source$: Observable<TObs>) => {
//         return source$.pipe(
//             filter(value => value instanceof ))
//         return EMPTY;
//         return value;
//     }))
// }
// }