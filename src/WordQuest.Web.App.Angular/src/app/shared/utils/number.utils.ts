export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateIntegers(start: number, end: number) {
    const count = end - start + 1;
    const numbers = new Array<number>(count);
    let index = -1;
    while (++index < count) {
        numbers[index] = start + index;
    }
    return numbers;
}