export function isNilOrEmpty<T = any>(value: Array<T> | ReadonlyArray<T> | Set<T> | ReadonlySet<T> | string | null | undefined): value is null | undefined {
    if (value == null)
        return true;
    if (value instanceof Array)
        return value.length <= 0;
    if (value instanceof Set)
        return value.size <= 0;
    throw new Error('Unsupported type.');
}

/** Returns `null` if `a` is an empty array, otherwise returns `a` */
export function nullIfEmpty<T = any>(a: T[]) {
    if (!a) return a;
    return a.length > 0 ? a : null;
}

export function clearArray<T>(items: T[]) {
    items.splice(0, items.length);
}

export function isSingleItem<T = any>(a: T[] | readonly T[]): boolean {
    return a != null && a.length === 1;
}

export function getSingleItem<T = any>(a: T[] | readonly T[]): T {
    if (!isSingleItem(a))
        throw new Error('Array is not made of a single item.');
    return a[0];
}

export function getSingleOrDefault<T = any, TDefault = undefined>(a: T[] | readonly T[], def?: TDefault): T | TDefault | undefined {
    if (!isSingleItem(a))
        return def;
    return getSingleItem(a);
}

import { areEqualCore, isNil, isNotNil } from "../core";

export function hasItems<TItem>(items: Array<TItem> | ReadonlyArray<TItem>): boolean {
    return items != null && items.length >= 1;
}

/**
 * Determines if each element of the first array is the same reference or has the same value of the element at the same position in the second array.
 * 
 * Arrays must be defined.
 */
export function areArraysSequentiallyEqual<T>(
    left: T[] | readonly T[],
    right: T[] | readonly T[],
    config?: {
        readonly compareItemFn?: ((left: T, right: T) => boolean);
        readonly areNilEqual?: boolean;
    }): boolean {

    if (left.length !== right.length)
        return false;

    for (let i = 0; i < left.length; i++) {
        const li = left[i];
        const ri = right[i];
        const areEqual = config?.compareItemFn == null
            ? (li === ri || ((config?.areNilEqual ?? false) && li == null && ri == null))
            : config?.compareItemFn?.(li, ri) ?? areEqualCore(li, ri, { areNilEqual: config?.areNilEqual });
        if (!areEqual)
            return false;
    }

    return true;
}

/**
 * Determines if each element of the first array is the same reference or has the same value of the element at the same position in the second array.
 * 
 * Arrays must be defined.
 */
export function areArraysEqual<T>(
    leftItems: T[] | readonly T[],
    rightItems: T[] | readonly T[],
    config?: {
        readonly compareItemFn?: ((left: T, right: T) => boolean);
        readonly areNilEqual?: boolean;
    }): boolean {

    if (leftItems.length !== rightItems.length)
        return false;

    const areEqual = config?.compareItemFn == null
        ? (leftItem: T, rightItem: T) => (leftItem === rightItem || ((config?.areNilEqual ?? false) && leftItem == null && rightItem == null))
        : config?.compareItemFn ?? ((leftItem: T, rightItem: T) => areEqualCore(leftItem, rightItem, { areNilEqual: config?.areNilEqual }));

    for (let i = 0; i < leftItems.length; i++) {
        const leftItem = leftItems[i];
        const hasMatch = rightItems.some(rightItem => areEqual(leftItem, rightItem));
        if (!hasMatch)
            return false;
    }

    return true;
}

export function asReadonly<T>(items: T[] | readonly T[]): readonly T[] { return items; }

export function allTrue(items: boolean[] | readonly boolean[]): boolean {
    return items.every(x => x === true);
}
export function anyTrue(items: boolean[] | readonly boolean[]): boolean {
    return items.some(x => x === true);
}
export function allFalse(items: boolean[] | readonly boolean[]): boolean {
    return items.every(x => x === false);
}
export function anyFalse(items: boolean[] | readonly boolean[]): boolean {
    return items.some(x => x === false);
}

export function executeWithSingleItem<TItem, TResult>(items: Array<TItem> | ReadonlyArray<TItem>, action: (item: TItem) => TResult) {
    if ((items?.length ?? 0) !== 1)
        return;

    const item = items[0];
    action(item);
}

export function anyNotNil<T>(items: Array<T> | ReadonlyArray<T>): boolean {
    if (items == null)
        throw new Error('Argument "Items" not defiend.');
    return items.length > 0 && items.some(isNotNil);
}

export function joinStringsSafe<T = string | number | null | undefined>(chunks: Array<T> | ReadonlyArray<T>, separator: string = ' ') {
    if (chunks == null)
        return undefined;
    if (chunks.length <= 0)
        return undefined;
    if (chunks.every(isNil))
        return undefined;
    return chunks.join(separator ?? ' ');
}

export function spliceAll<T = any>(array: T[], newItems: T[] | readonly T[]): void {
    array.splice(0, array.length, ...newItems);
}

export function filterItems<T = unknown>(rowsMap: [T, boolean][]): T[] {
    return rowsMap.filter(e => e[1]).map(e => e[0]);
}
