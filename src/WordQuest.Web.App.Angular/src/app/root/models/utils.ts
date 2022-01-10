export function generateNumbers(start: number, end: number) {
    return Array.from(Array(end - start + 1).keys());
}

export function generateTSCharType(start: number, end: number) {
    return generateAlphabet_FromCharCodes(start, end).map(c => "'" + c + "'").join(" | ");
}

export function generateAlphabet_FromCharCodes(start: number, end: number) {
    return generateNumbers(start, end).map(c => String.fromCharCode(c + start));
}
export function generateAlphabet_FromChars(start: string, end: string) {
    const startCharCode = start.charCodeAt(0);
    const endCharCode = end.charCodeAt(0);
    return generateAlphabet_FromCharCodes(startCharCode, endCharCode);
}

export function generateAlphabet_Greek_Capital() { return generateAlphabet_FromChars('Α', 'Ω'); }
export function generateAlphabet_Russian_Capital() { return generateAlphabet_FromCharCodes(1040, 1071); }

export function arrayToDictionary<TItem, TKey extends number | string | symbol, TValue>(
    array: TItem[],
    idSelector: (item: TItem) => TKey,
    valueSelector: (item: TItem) => TValue) {

    if (!array)
        return null;

    const dict: Partial<Record<TKey, TValue>> = {};

    for (const item of array) {
        dict[idSelector(item)] = valueSelector(item);
    }

    return dict;
}

export function transformDictionary<
    TKeyIn extends number | string | symbol,
    TValueIn,
    TKeyOut extends number | string | symbol,
    TValueOut>(
        dictIn: Partial<Record<TKeyIn, TValueIn>>,
        keySelector: (key: TKeyIn, value: TValueIn) => TKeyOut,
        valueSelector: (key: TKeyIn, value: TValueIn) => TValueOut) {

    if (!dictIn)
        return null;

    const dictOut: Partial<Record<TKeyOut, TValueOut>> = {};

    for (const keyIn in dictIn) {
        const valueIn = dictIn[keyIn];
        dictOut[keySelector(keyIn, valueIn)] = valueSelector(keyIn, valueIn);
    }

    return dictOut;
}