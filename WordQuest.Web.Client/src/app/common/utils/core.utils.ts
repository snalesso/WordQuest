export function isNil<T>(value: T) {
    return value === undefined || value === null;
}
export function isNotNil<T>(value: T) {
    return value !== undefined && value !== null;
}