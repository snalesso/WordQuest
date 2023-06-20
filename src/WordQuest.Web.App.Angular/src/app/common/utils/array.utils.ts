import { isNil } from "./core.utils";
import { getRandomInt } from "./number.utils";

export function getRandomIndex<T>(array: readonly T[] | T[] | null | undefined): number {

    if (isNil(array) || array!.length <= 0)
        return -1;

    return getRandomInt(0, array!.length - 1);
}

export function getRandomItem<T>(array: readonly T[] | T[] | null | undefined): T | undefined {

    if (isNil(array) || array!.length <= 0)
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