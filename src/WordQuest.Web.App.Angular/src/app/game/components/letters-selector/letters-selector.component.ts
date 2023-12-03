import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, multicast, refCount, shareReplay, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/reactive.component';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { ISelectable } from 'src/app/root/models/core';
import { Char, CharMetadata } from 'src/app/root/models/culture.DTOs';

@Component({
    selector: 'app-letters-selector',
    templateUrl: './letters-selector.component.html',
    styleUrls: ['./letters-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LettersSelectorComponent extends ReactiveComponent implements OnInit {

    private readonly _alphabetChars$$ = new BehaviorSubject<Partial<Record<Char, CharMetadata>> | undefined>(undefined);
    public get alphabetChars() { return this._alphabetChars$$.value; }
    @Input()
    public set alphabetChars(value) { this._alphabetChars$$.next(value); }
    @Output()
    public readonly alphabetChars$ = this._alphabetChars$$.pipe(
        distinctUntilChanged(),
        tap(value => {
            logEvent(this, 'alphabet chars', value);
        }),
        shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _selectableChars$$ = new BehaviorSubject<ISelectable<Char>[] | undefined>(undefined);
    public get selectableChars() { return this._selectableChars$$.value; }
    @Output()
    public readonly selectableChars$ = this.alphabetChars$.pipe(
        map(alphabetChars => {
            if (alphabetChars == null)
                return undefined;
            const entries = Object.entries(alphabetChars);
            if (entries.length <= 0)
                return [];
            const selectableChars = entries.map<ISelectable<Char>>(char => ({ value: char[0] as Char, isSelected: char[1]?.isUncommon !== true }));
            return selectableChars;
        }),
        catchError(() => {
            return of(undefined);
        }),
        multicast(() => this._selectableChars$$),
        refCount(),
        distinctUntilChanged(),
        tap(value => {
            logEvent(this, 'selectable chars', value);
        }),
        shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _selectedChars$$ = new BehaviorSubject<readonly Char[] | undefined>(undefined);
    public get selectedChars() { return this._selectedChars$$.value; }
    private setSelectedChars(value: readonly Char[] | undefined) { this._selectedChars$$.next(value); }
    @Output()
    public readonly selectedChars$ = this._selectedChars$$.pipe(
        distinctUntilChanged(),
        tap(value => {
            logEvent(this, 'selected chars', value);
        }),
        shareReplay({ bufferSize: 1, refCount: true }));

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngOnInit(): void {
        this.subscribe([
            this.alphabetChars$,
            this.selectedChars$,
            this.selectableChars$
        ]);

        this.subscribe(this.selectableChars$, {
            next: selectableChars => {
                const newSelections = selectableChars == null
                    ? undefined
                    : selectableChars.filter(charChoice => charChoice.isSelected).map(x => x.value);
                this.setSelectedChars(newSelections);
            }
        });
    }

    public toggleSelection(item: ISelectable<Char>) {
        if (this.selectableChars == null || this.selectableChars.length <= 0)
            throw new Error('No character selectable.');
        if (item == null)
            throw new Error('Character to toggle not defined.');
        item.isSelected = !item.isSelected;
        const newSelections = this.selectableChars.filter(charChoice => charChoice.isSelected).map(x => x.value);
        this.setSelectedChars(newSelections);
    }

    // @Input()
    // public set charInfos(value: CharInfo[]) { this._charInfos$$.next(value); }
    // public get charInfos() { return this._charInfos$$.value; }

    // @Input()
    // public charInfos$: Observable<CharInfo[]>;
    // private readonly _charInfos$$ = new BehaviorSubject<CharInfo[]>(null);
}
