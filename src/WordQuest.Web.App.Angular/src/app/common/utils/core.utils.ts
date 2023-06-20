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

export function isValidId(id: number | null | undefined) {

    if (isNotNil(id)) {
        var x = id;
    }
    else {
        var k = id;
    }

    return id !== null && id !== undefined && !Number.isNaN(id) && Number.isInteger(id) && id > 0;
}

/**
 * Determina se 2 oggetti possono essere considerati equivalenti.
 * @param left 
 * @param right 
 * @param compareContent Funzione per il confronto semantico: confronta il contenuto dell'oggetto. Se undefined il confronto viene fatto solo sul riferimento.
 * @returns Una booleana che indica se i 2 oggetti posso essere considerati equivalenti.
 */
export function areEqualCore<T>(left: T, right: T, compareContent?: (l: T, r: T) => boolean): boolean {
    if (isNil(left) && isNil(right))
        return true;
    if (logicalXOR(isNil(left), isNil(right)))
        return false;
    if (left === right)
        return true;
    return compareContent?.(left, right) ?? false;
}

export function areIdsEqual(leftId: number | undefined, rightId: number | undefined) {
    return leftId === rightId
        || (!isValidId(leftId) && !isValidId(rightId));
}


type ComparisonResult = -1 | 0 | 1;
type ComparerFn<T> = (left: T, right: T) => ComparisonResult;

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

        if (isNil(lower))
            throw new Error(propNameOf<Range<T>>('lower') + ' not defined');
        if (isNil(upper))
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