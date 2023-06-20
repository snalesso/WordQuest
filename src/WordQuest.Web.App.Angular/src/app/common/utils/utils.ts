
/** Returns `true` if `obj` is either `undefined` or `null` */
export function isNil(obj: any): obj is undefined | null { return obj === undefined || obj === null; }

/** Returns `true` if `obj` is neither `undefined` or `null` */
export function isNotNil<T = any>(obj: T): obj is NeverWith<T, undefined | null> { return obj !== undefined && obj !== null; }

/** Implements the logical XOR operator */
export function logicalXOR(left: boolean, right: boolean): boolean {
    return (left && !right) || (!left && right);
}
export function areBothNil<T>(left: T, right: T): boolean {
    return isNil(left) && isNil(right);
}
export function onlyOneIsNil<T>(left: T, right: T): boolean {
    return logicalXOR(isNil(left), isNil(right));
}
/**
 * Determina se 2 oggetti possono essere considerati equivalenti. Considera `null` e `undefined` equivalenti.
 * @param left 
 * @param right 
 * @param compareContentFn Funzione per il confronto semantico: confronta il contenuto dell'oggetto. Se undefined il confronto viene fatto solo sul riferimento.
 * @returns Una booleana che indica se i 2 oggetti posso essere considerati equivalenti.
 */
export function areEqualCore<T>(left: T, right: T, compareContentFn?: (l: T, r: T) => boolean): boolean {
    if (isNil(left) && isNil(right))
        return true;
    if (onlyOneIsNil(left, right))
        return false;
    if (left === right)
        return true;
    return compareContentFn?.(left, right) ?? false;
}

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export type Unpacked<T> = T extends (infer TArrayItem)[]
    ? TArrayItem
    : T extends readonly (infer TROArrayItem)[]
    ? TROArrayItem
    : T extends (...args: any[]) => infer FuncRet
    ? FuncRet
    : T extends Promise<infer PromiseType>
    ? PromiseType
    : T;

export type RecordKeyType<T> = T extends Record<infer TKey, infer TValue> ? TKey : never;
export type RecordValueType<T> = T extends Record<infer TKey, infer TValue> ? TValue : never;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Extend<T, TSub extends Partial<{ [Property in keyof T]: TSub[Property] }>> = { [Property in keyof T]: T[Property] | TSub[Property] };
export type WithNullables<T, TKey extends keyof T> = T & { [P in TKey]: T[P] | null };
export type AllNullable<T> = { [P in keyof T]: T[P] | null };
export type AllOptional<T> = { [P in keyof T]?: T[P] };
export type AllOptionalAndNullable<T> = AllOptional<AllNullable<T>>;
export type AllRequiredAndNotNullable<T> = Required<{ [P in keyof T]: NonNullable<T[P]> }>;
export type NeverWith<T, U> = U extends Extract<T, U> ? never : T;
export function propNameOf<T>(propName: keyof T & string, o?: T) { return propName; };
export function propNamesOf<T>(...propNames: (keyof T & string)[]) { return propNames; };

/*
Check if color is light or dark
*/
export function hexColorIsLight(color: string) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > 155;
}