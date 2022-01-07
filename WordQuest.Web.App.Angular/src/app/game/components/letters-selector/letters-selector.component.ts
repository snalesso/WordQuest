import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { ISelectable } from 'src/app/root/models/core';
import { Char } from 'src/app/root/models/culture.DTOs';

@Component({
    selector: 'app-letters-selector',
    templateUrl: './letters-selector.component.html',
    styleUrls: ['./letters-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LettersSelectorComponent extends ReactiveComponent {

    constructor(changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    private readonly _selectableChars$$ = new BehaviorSubject<readonly ISelectable<Char>[]>(null);
    public readonly selectableChars$ = this._selectableChars$$.asObservable();
    @Input()
    public set selectableChars(value) { this._selectableChars$$.next(value); }
    public get selectableChars() { return this._selectableChars$$.value; }

    private readonly _trigger$$: Subject<void> = new Subject<void>();
    public readonly selectionsChanged$ = this._trigger$$.asObservable();
    @Output()
    public readonly selectedChars$ = combineLatest([this.selectableChars$, this._trigger$$])
        .pipe(
            map(([selectableChars, _]) =>
                // TODO: avoid recreating the array every time
                (selectableChars?.filter(x => x.isSelected).map(x => x.value)) as readonly Char[]));

    public toggleSelection(item: ISelectable<Char>) {
        item.isSelected = !item.isSelected;
        this._trigger$$.next();
    }

    // @Input()
    // public set charInfos(value: CharInfo[]) { this._charInfos$$.next(value); }
    // public get charInfos() { return this._charInfos$$.value; }

    // @Input()
    // public charInfos$: Observable<CharInfo[]>;
    // private readonly _charInfos$$ = new BehaviorSubject<CharInfo[]>(null);
}
