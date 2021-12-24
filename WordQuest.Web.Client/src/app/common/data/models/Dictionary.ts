export type Dictionary<Key extends string | number | symbol, Value> = Partial<Record<Key, Value>>;