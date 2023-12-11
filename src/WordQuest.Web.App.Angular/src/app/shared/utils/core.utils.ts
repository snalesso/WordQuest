import { propNameOf } from "./utils";

/** Returns `true` if `obj` is either `undefined` or `null` */
export function isNil<T>(obj: T): obj is undefined | null extends Extract<T, undefined | null> ? never : T {
    return obj === undefined || obj === null;
}

/** Returns `true` if `obj` is neither `undefined` or `null` */
export function isNotNil<T = any>(obj: T): obj is NonNullable<T> {
    return obj !== null && obj !== undefined;
}

/** Implements the logical XOR operator */
export function logicalXOR(left: boolean, right: boolean): boolean {
    return (left && !right) || (!left && right);
}

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

export type Unpacked<T> = T extends (infer U)[]
    ? U
    : T extends (...args: any[]) => infer U
    ? U
    : T extends Promise<infer U>
    ? U
    : T;

export type Optional<T, Keys extends keyof T> = Omit<T, Keys> & Partial<Pick<T, Keys>>;
export type Nullable<T> = T | null;
export type Nillable<T> = T | null | undefined;

export function isPositiveInteger(id: any): id is number {
    return id != null && !Number.isNaN(id) && Number.isInteger(id) && id > 0;
}


export type ComparisonResult = -1 | 0 | 1;
export type ComparerFn<T> = (left: T, right: T) => ComparisonResult;

export interface IIncludes<T> {
    includes(value: T): boolean;
}
export class RangeBound<T> {
    constructor(
        public readonly value: T,
        public readonly isIncluded: boolean = true) { }

    // public abstract compareTo(value: T): ComparisonResult;
}
export abstract class Range<T> implements IIncludes<T> {

    protected constructor(
        public readonly lower: RangeBound<T>,
        public readonly upper: RangeBound<T>,
        public readonly comparerFn: ComparerFn<T>) {

        if (lower == null)
            throw new Error(propNameOf<Range<T>>('lower') + ' not defined');
        if (upper == null)
            throw new Error(propNameOf<Range<T>>('upper') + ' not defined');
    }

    // public abstract compare(left: T, right: T): ComparisonResult;

    public isInsideBound(bound: RangeBound<T>, value: T, expectedResult: ComparisonResult): boolean {
        const comp = this.comparerFn(bound.value, value);
        return comp === expectedResult || (comp === 0 && bound.isIncluded);
    }

    public isInsideLower(value: T) {
        return this.isInsideBound(this.lower, value, -1);
    }

    public isInsideUpper(value: T) {
        return this.isInsideBound(this.upper, value, 1);
    }

    public includes(value: T): boolean {
        return this.isInsideLower(value) && this.isInsideUpper(value);
    }
}

export class NumbersRange extends Range<number> {

    constructor(
        lower: RangeBound<number>,
        upper: RangeBound<number>) {
        super(lower, upper, NumbersRange.compare);
    }

    private static compare(left: number, right: number): ComparisonResult {
        if (left < right)
            return -1;
        if (left === right)
            return 0;
        return 1;
    }
}

export class ComposedRange<T> implements IIncludes<T> {

    constructor(public readonly ranges: Range<T>[]) {
        // TODO: validate intersections        
    }

    public static includes<V>(composedRange: ComposedRange<V>, value: V): boolean {
        return composedRange.ranges.some(range => range.includes(value));
    }

    public includes(value: T): boolean {
        return ComposedRange.includes(this, value);
    }
}

// export function isNilOrEmpty(value: string | null | undefined): boolean;
// export function isNilOrEmpty<TValue>(value: Array<TValue> | ReadonlyArray<TValue> | Set<TValue> | ReadonlySet<TValue> | null | undefined): boolean;
// export function isNilOrEmpty<TKey, TValue>(value: Map<TKey, TValue> | ReadonlyMap<TKey, TValue> | string | null | undefined): boolean;
// export function isNilOrEmpty<TValueOrKey, TMappedValue = TValueOrKey>(
//     value: null | undefined
//         | string
//         | Array<TValueOrKey> | ReadonlyArray<TValueOrKey> | Set<TValueOrKey> | ReadonlySet<TValueOrKey>
//         | Map<TValueOrKey, TMappedValue> | ReadonlyMap<TValueOrKey, TMappedValue>

export function isNilOrEmpty(
    value:
        null | undefined
        | string | Array<unknown> | ReadonlyArray<unknown> | Set<unknown> | ReadonlySet<unknown>
        | Map<unknown, unknown> | ReadonlyMap<unknown, unknown>
): boolean {
    if (value == null)
        return true;
    if (typeof value === 'string' || value instanceof Array)
        return value.length <= 0;
    if (value instanceof Map || value instanceof Set)
        return value.size <= 0;
    throw new Error('Unsupported type.');
}

export function isNotNilNorEmpty(
    value:
        null | undefined
        | string | Array<unknown> | ReadonlyArray<unknown> | Set<unknown> | ReadonlySet<unknown>
        | Map<unknown, unknown> | ReadonlyMap<unknown, unknown>
): boolean {
    return !isNilOrEmpty(value);
}

export function allEqualTo<T>(
    items: Array<T> | ReadonlyArray<T> | Set<T> | ReadonlySet<T>,
    value: T
): boolean {
    if (items == null)
        throw new Error('Values collection not defined.');
    if (items instanceof Array)
        return items.every(item => item === value);
    if (items instanceof Set) {
        for (const item of items.values())
            if (item !== value)
                return false;
        return true;
    }
    throw new Error('Unsupported type.');
}
function createAllEqualTo<T>(value: T) {
    return (items: Array<T> | ReadonlyArray<T> | Set<T> | ReadonlySet<T>): boolean => {
        return allEqualTo(items, value);
    };
}

export const allTrue = createAllEqualTo(true);
export const allFalse = createAllEqualTo(false);