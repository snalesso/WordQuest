import { areEqualCore, isNil, isNotNil } from "../core";

export function isNilOrEmpty<T>(items: T[] | readonly T[] | null | undefined): items is null | undefined {
  return items == null || items.length <= 0;
}

export function hasItems<TItem>(items: Array<TItem> | ReadonlyArray<TItem>): boolean {
  return items != null && items.length >= 1;
}

export function areArraysEqual<T>(
  left: T[] | readonly T[],
  right: T[] | readonly T[],
  compareItemFn: ((left: T, right: T) => boolean) | undefined = undefined): boolean {

  if (left.length !== right.length)
    return false;

  for (let i = 0; i < left.length; i++) {
    const li = left[i];
    const ri = right[i];
    const areEqual = compareItemFn == null ? li === ri : areEqualCore(li, ri, compareItemFn);
    if (!areEqual)
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

export function composeStringSafe<T = string | number | null | undefined>(chunks: Array<T> | ReadonlyArray<T>) {
  if (chunks == null)
    return undefined;
  if (chunks.length <= 0)
    return undefined;
  if (chunks.every(isNil))
    return undefined;
  return chunks.join(' ');
}

export function spliceAll<T = any>(array: T[], newItems: T[] | readonly T[]): void {
  array.splice(0, array.length, ...newItems);
}

export function filterItems<T = unknown>(rowsMap: [T, boolean][]): T[] {
  return rowsMap.filter(e => e[1]).map(e => e[0]);
}