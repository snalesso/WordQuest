export function isNilOrEmpty<T>(items: T[]) {
    return items === undefined || items === null || items.length <= 0;
}