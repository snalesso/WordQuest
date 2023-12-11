export function getIsIncludedInFn<T = any>(items: Array<T> | ReadonlyArray<T> | Set<T> | ReadonlySet<T> | null | undefined): (item: T) => boolean {
    if (items == null)
        throw new Error('Items not defined.');
    if (items instanceof Array)
        return (item: T) => items.includes(item);
    if (items instanceof Set)
        return (item: T) => items.has(item);
    throw new Error('Unsupported type.');
}
