import { ComparisonResult } from "./core.utils"

/** Returns `true` if `obj` is either `undefined` or `null` */
export function isNil<T>(obj: T | undefined | null): obj is undefined | null {
  return obj === undefined || obj === null
}

/** Returns `true` if `obj` is neither `undefined` or `null` */
export function isNotNil<T>(obj: T): obj is NonNullable<T> {
  return obj !== undefined && obj !== null
}

/** Implements the logical XOR operator */
export function logicalXOR(left: boolean, right: boolean): boolean {
  return (left && !right) || (!left && right)
}
export function areBothNil<T>(left: T, right: T): boolean {
  return left == null && right == null
}
export function onlyOneIsNil<T>(left: T, right: T): boolean {
  return logicalXOR(left == null, right == null)
}

export type ComparerFn<T> = (left: T, right: T) => boolean;
/**
 * Determina se 2 oggetti possono essere considerati equivalenti. Considera `null` e `undefined` equivalenti.
 * @param left
 * @param right
 * @param compareContentFn Funzione per il confronto semantico: confronta il contenuto dell'oggetto. Se undefined il confronto viene fatto solo sul riferimento.
 * @returns Una booleana che indica se i 2 oggetti posso essere considerati equivalenti.
 */
export function areEqualCore<T>(
  left: T | null | undefined,
  right: T | null | undefined,
  config?: {
    readonly compareFn?: (left: T, right: T, config?: { readonly areNilEqual?: boolean }) => boolean;
    readonly areNilEqual?: boolean;
  }): boolean {
  if (left === right || ((config?.areNilEqual ?? false) && left == null && right == null))
    return true;
  if (left == null || right == null)
    return false;
  return config?.compareFn?.(left, right, { areNilEqual: config?.areNilEqual }) ?? false;
}

// export function checkEqualityWith<T>(compareContentFn?: ComparerFn<NonNullable<T>>) {
//   return function <TNull = TNull extends T ? TNull : never>(left: TNull, right: TNull): boolean {
//     return areEqualCore<TNull>(left, right, compareContentFn);
//   }
// }

// export function arePrimitiveStructuresEqual<T>(left: PrimitiveObject<T>, right: PrimitiveObject<T>): boolean {
//     return areEqualCore(left, right, (l, r) => {

//         if (!(l ))

//         const leftKeys = Object.getOwnPropertyNames(l);
//         const rightKeys = Object.getOwnPropertyNames(r);
//         const keys = new Set<string>(...leftKeys, ...rightKeys);

//         for (const key of keys) {
//             const lv = l[key];
//             const rv = r[key];
//             if ()
//         }
//     });
// }

export type Nillable<T> = T | null | undefined;

export type PrimitiveObject<T> = T extends
  | string
  | number
  | boolean
  | null
  | undefined
  ? T
  : T extends Function
  ? never
  : T extends object
  ? { [K in keyof T]: PrimitiveObject<T[K]> }
  : never

export type Writeable<T> = T extends ReadonlyMap<infer K, infer V>
  ? Map<K, V>
  : T extends ReadonlyArray<infer TItem>
  ? Array<TItem>
  : { -readonly [P in keyof T]: T[P] }
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

export type Unpacked<T> = T extends (infer TArrayItem)[]
  ? TArrayItem
  : T extends readonly (infer TROArrayItem)[]
  ? TROArrayItem
  : T extends (...args: any[]) => infer FuncRet
  ? FuncRet
  : T extends Promise<infer PromiseType>
  ? PromiseType
  : T

export type RecordKeyType<T> = T extends Record<infer TKey, infer TValue>
  ? TKey
  : never
export type RecordValueType<T> = T extends Record<infer TKey, infer TValue>
  ? TValue
  : never
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Extend<
  T,
  TSub extends Partial<{ [Property in keyof T]: TSub[Property] }>
> = { [Property in keyof T]: T[Property] | TSub[Property] }
export type WithNullables<T, TKey extends keyof T> = T & {
  [P in TKey]: T[P] | null
}
export function propNameOf<T>(propName: keyof T & string, o?: T) {
  return propName
}
export function propNamesOf<T>(...propNames: (keyof T & string)[]) {
  return propNames
}

export class Comparer<T, O> {
  constructor(
    public readonly getValue: (item: T) => O,
    public readonly compareValues: (left: O, right: O) => ComparisonResult
  ) { }
}

export function compareCore<T>(
  left: T | undefined,
  right: T | undefined,
  compareProperties: (l: T, r: T) => ComparisonResult
) {
  // same object
  if (Object.is(left, right)) return 0

  // both nil
  if (left == null) {
    if (right == null) return 0
    return -1
  }
  if (right == null) return 1

  // both not nil & different references/primitive values
  // COMPARE PROPERTIES

  return compareProperties(left, right)
}

export function onErrorReturn<T, TFallback = T>(fn: () => T, fallbackValue: TFallback): T | TFallback {
  try {
    return fn();
  }
  catch
  {
    return fallbackValue;
  }
}

export function inlineThrow(errorFactory: () => Error): never {
  throw errorFactory();
}

export function parseJsonSafe<TValue, TFallback = TValue>(json: string, fallbackValue?: TFallback): TValue | TFallback | undefined {
  try {
    const value = JSON.parse(json) as TValue;
    return value;
  }
  catch {
    return fallbackValue;
  }
}