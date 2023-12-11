import { getRandomInt } from "./number.utils";

export function getRandomIndex<T>(array: readonly T[] | T[] | null | undefined): number {

    if (array == null || array!.length <= 0)
        return -1;

    return getRandomInt(0, array!.length - 1);
}

export function getRandomItem<T>(array: readonly T[] | T[] | null | undefined): T | undefined {

    if (array == null || array!.length <= 0)
        return undefined;

    const i = getRandomInt(0, array!.length - 1);

    return array![i];
}

/** Returns `null` if `a` is an empty array, otherwise returns `a` */
export function nullIfEmpty<T = any>(a: T[]) {
    if (!a) return a;
    return a.length > 0 ? a : null;
}

export function clearArray<T>(items: T[]) {
    items.splice(0, items.length);
}

export function areSetsEqual<T>(
    left: Set<T> | ReadonlySet<T>,
    right: Set<T> | ReadonlySet<T>,
    // areEqualFn?: (left: TItems, right: TItems) => boolean
): boolean {
    if (left == null)
        throw new Error('Left set not defined.');
    if (right == null)
        throw new Error('Right set not defined.');
    // const leftItems = left.
    if (left.size !== right.size)
        return false;
    for (const l of left) {
        if (!right.has(l))
            return false;
    }
    return true;
}