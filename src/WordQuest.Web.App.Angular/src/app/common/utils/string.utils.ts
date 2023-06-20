import { getRandomItem } from "./array.utils";
import { generateIntegers } from "./number.utils";
import { isNil } from "./utils";

export function generateChars(start: string, end: string): string[] {
    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);
    return generateIntegers(startCode, endCode).map(charCode => String.fromCharCode(charCode));
}

export function getRandomString(length: number, values: string[]): string {

    if (length < 0)
        throw new Error('Length cannot be negative');
    if (isNil(values) || values.length <= 0)
        throw new Error('Ranges not defined');

    let randString = '';
    let charPos = 1;
    while (charPos <= length) {
        randString += getRandomItem(values)?.charAt(0);
        charPos++;
    }

    return randString;
}