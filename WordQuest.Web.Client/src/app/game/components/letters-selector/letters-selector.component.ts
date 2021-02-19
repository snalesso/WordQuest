import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, multicast, publishReplay, refCount, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { ISelectable } from 'src/app/root/models/core';
import { Char, CharInfo } from 'src/app/root/models/culture.DTOs';

@Component({
    selector: 'app-letters-selector',
    templateUrl: './letters-selector.component.html',
    styleUrls: ['./letters-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LettersSelectorComponent extends ReactiveComponent {

    constructor(changeDetectorRef: ChangeDetectorRef) {

        super(changeDetectorRef);

        this.selectedChars$ = combineLatest([this.selectableChars$, this._trigger$]).pipe(
            map(([selectableChars, _]) => {

                if (!selectableChars)
                    return null;
                const selChars = selectableChars.filter(x => !!x.isSelected).map(x => x.value);
                return selChars;
            }));
    }

    @Input()
    public set selectableChars(value) { this._selectableChars$$.next(value); }
    private _selectableChars$$: BehaviorSubject<ISelectable<Char>[]> = new BehaviorSubject<ISelectable<Char>[]>(null);
    public get selectableChars() { return this._selectableChars$$.value; }
    public get selectableChars$(): Observable<ISelectable<Char>[]> { return this._selectableChars$$.asObservable(); }

    @Output()
    public readonly selectedChars$: Observable<Char[]>; // { return this._selectedChars$; } //$.asObservable(); }
    // private _selectedChars$$: BehaviorSubject<Char[]> = new BehaviorSubject<Char[]>(null);
    // private readonly _selectedChars$: Observable<Char[]>;

    private readonly _trigger$: EventEmitter<void> = new EventEmitter();
    public toggleSelection(item: ISelectable<Char>) {
        item.isSelected = !item.isSelected;
        this._trigger$.next();
    }
    public get selectionsChanged(): Observable<void> { return this._trigger$.asObservable(); }

    // @Input()
    // public set charInfos(value: CharInfo[]) { this._charInfos$$.next(value); }
    // public get charInfos() { return this._charInfos$$.value; }

    // @Input()
    // public charInfos$: Observable<CharInfo[]>;
    // private readonly _charInfos$$ = new BehaviorSubject<CharInfo[]>(null);
}
