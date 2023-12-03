import { BehaviorSubject } from "rxjs";
import { IDisposable } from "src/app/common/components/IDisposable";
import { ReactiveObject } from "src/app/common/components/ReactiveObject";
import { shareReplayChangeLog } from "src/app/common/utils/debug/rxjs";

export interface IRange<T> {
    readonly start: T;
    readonly end: T;
    readonly exclusions?: ReadonlySet<T>;
}

export class Selectable<T> extends ReactiveObject implements IDisposable {

    private readonly _isSelected$$ = new BehaviorSubject<boolean>(false);
    public get isSelected() { return this._isSelected$$.value; }
    public set isSelected(value: boolean) { this._isSelected$$.next(value); }
    public readonly isSelected$ = this._isSelected$$.pipe(shareReplayChangeLog(this, 'isSelected'));

    constructor(
        public readonly item: T,
        isSelected: boolean = false) {

        super();
        this.isSelected = isSelected;
    }

    public override dispose(): void {
        this._isSelected$$.complete();
        super.dispose();
    }

    public toggleSelection() {
        this.isSelected = !this.isSelected;
    }
}

// export interface ILocalizedLanguageOption {
//     readonly language: Language;
//     readonly selfLocalizedName: string;
// }

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createPromise<T>(value: T, min?: number, max?: number) {

    // both null
    if (min == max && min == null) {
        return Promise.resolve(value);
    }

    // one is null
    if (min == null || max == null) {
        return new Promise<T>(resolve => setTimeout(resolve, min || max, value));
    }

    // both not null

    // one negative
    // OR both zero
    if ((min < 0 || max < 0)
        || (min == 0 && max == 0)) {
        return Promise.resolve(value);
    }

    const delay = randomInt(
        Math.min(min, max),
        Math.max(min, max));

    return new Promise<T>(resolve => setTimeout(resolve, delay, value));
}

function printStringCharCodes(text: string) {
    const chars = Array.from(text);
    console.log("Printing: " + text);
    for (const c of chars) {
        console.log(c + " == " + c.charCodeAt(0));
    }
    console.log();
}

function areStringsEqual(a: string, b: string) {
    return
    typeof a === 'string' && typeof b === 'string'
        ? a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0
        : a === b;
}

// console.log("'a' = 'a'?", ciEquals('a', 'a'));
// console.log("'AaA' = 'aAa'?", ciEquals('AaA', 'aAa'));
// console.log("'a' = 'á'?", ciEquals('a', 'á'));
// console.log("'a' = 'Á'?", ciEquals('a', 'Á'));
// console.log("'a' = 'b'?", ciEquals('a', 'b'));