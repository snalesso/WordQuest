import { getRandomItem } from "./array.utils";
import { generateIntegers } from "./number.utils";

export function generateChars(start: string, end: string): string[] {
    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);
    return generateIntegers(startCode, endCode).map(charCode => String.fromCharCode(charCode));
}

export function getRandomString(length: number, values: string[]): string {

    if (length < 0)
        throw new Error('Length cannot be negative');
    if (values == null || values.length <= 0)
        throw new Error('Ranges not defined');

    let randString = '';
    let charPos = 1;
    while (charPos <= length) {
        randString += getRandomItem(values)?.charAt(0);
        charPos++;
    }

    return randString;
}

export function formatStr(format: string, ...values: any[]) {
    if (arguments.length > 1) {
        for (let i = 1; i < arguments.length; i++) {
            const arg = arguments[i];
            const regex = new RegExp(`\\{${i - 1}\\}`, 'gi');
            switch (typeof arg) {
                case 'string':
                    format = format.replace(regex, arg);
                    break;
                default:
                    format = format.replace(regex, JSON.stringify(arg));
            }
        }
    }

    return format;
};
