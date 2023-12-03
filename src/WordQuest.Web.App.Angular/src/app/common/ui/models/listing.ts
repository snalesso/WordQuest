// import { BehaviorSubject } from "rxjs";
// import { shareReplayChangeLog } from "../../utils/debug/rxjs";

// export class Selectable<T>{

//     public readonly item: NonNullable<T>;

//     private readonly _isSelected$$ = new BehaviorSubject<boolean>(false);
//     public get isSelected() { return this._isSelected$$.value; }
//     public set isSelected(value: boolean) { this._isSelected$$.next(value); }
//     public readonly isSelected$ = this._isSelected$$.pipe(shareReplayChangeLog(this, 'isSelected'));

//     constructor(item: NonNullable<T>, isSelected: boolean = false) {
//         this.item = item;
//         this.isSelected = isSelected;
//     }
// }