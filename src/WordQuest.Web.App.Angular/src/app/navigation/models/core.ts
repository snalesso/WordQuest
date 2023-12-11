
export interface IRange<T> {
    readonly start: T;
    readonly end: T;
    readonly exclusions?: ReadonlySet<T>;
}

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createPromise<T>(value: T, min?: number, max?: number) {

    // both null
    if (min == max && min == null) {
        return Promise.resolve(value);
    }

    // one is null
    if (min == null || max == null) {
        return new Promise<T>(resolve => setTimeout(resolve, min || max, value));
    }

    // both not null

    // one negative
    // OR both zero
    if ((min < 0 || max < 0)
        || (min == 0 && max == 0)) {
        return Promise.resolve(value);
    }

    const delay = randomInt(
        Math.min(min, max),
        Math.max(min, max));

    return new Promise<T>(resolve => setTimeout(resolve, delay, value));
}

function printStringCharCodes(text: string) {
    const chars = Array.from(text);
    console.log("Printing: " + text);
    for (const c of chars) {
        console.log(c + " == " + c.charCodeAt(0));
    }
    console.log();
}

function areStringsEqual(a: string, b: string) {
    return
    typeof a === 'string' && typeof b === 'string'
        ? a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0
        : a === b;
}

// console.log("'a' = 'a'?", ciEquals('a', 'a'));
// console.log("'AaA' = 'aAa'?", ciEquals('AaA', 'aAa'));
// console.log("'a' = 'á'?", ciEquals('a', 'á'));
// console.log("'a' = 'Á'?", ciEquals('a', 'Á'));
// console.log("'a' = 'b'?", ciEquals('a', 'b'));