export type AnyArray<T> = T[] | readonly T[];
export type AnySet<T> = Set<T> | ReadonlySet<T>;
export type TypedArray = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array;
export type AnyCollection<T> = AnyArray<T> | AnySet<T>;