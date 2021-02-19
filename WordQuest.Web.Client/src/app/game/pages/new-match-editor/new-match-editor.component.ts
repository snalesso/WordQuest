import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, concat, from, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { ISelectable } from 'src/app/root/models/core';
import { Alphabet, Char, Language, LanguagesDict } from 'src/app/root/models/culture.DTOs';
import { arrayToDictionary } from 'src/app/root/models/utils';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { CategoryDto, CategoryHeaderDto, MatchSettingsDto } from '../../models/game.DTOs';
import { GameService } from '../../services/game.service';
import { MatchService } from '../../services/match.service';
import { switchMapWith } from 'src/app/common/pipes/awaitingWith';

@Component({
    selector: 'app-new-match-editor',
    templateUrl: './new-match-editor.component.html',
    styleUrls: ['./new-match-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMatchEditorComponent extends ReactiveComponent {

    constructor(
        private readonly _gameService: GameService,
        private readonly _matchService: MatchService,
        private readonly _globalizationService: GlobalizationService,
        private readonly _formBuilder: FormBuilder,
        changeDetectorRef: ChangeDetectorRef) {

        super(changeDetectorRef);

        this.languagesMap$ = this.alphabetsMap$.pipe(
            map(alphabets => {
                const langs = !!alphabets ? Object.values(alphabets).map((alph) => alph.language) : null;
                return arrayToDictionary(langs, l => l.id, l => l);
            }),
            shareReplay(1));
        this.languages$ = this.alphabets$.pipe(
            map(alphabets => alphabets.map(x => x.language)),
            shareReplay(1));

        this.selectableChars$ = this.selectedAlphabet$.pipe(
            map(selAlph => {
                const charInfos = !!selAlph ? Object.values(selAlph.charInfos) : null;
                const selectableChars = !!charInfos ? charInfos.map<ISelectable<Char>>(ci => ({ value: ci.char, isSelected: !ci.isRare })) : null;
                return selectableChars;
            }),
            shareReplay(1));

        this.categories$ = this.selectedAlphabet$.pipe(
            tap(() => console.log("Categories - Loading ...")),
            switchMapWith(
                null,
                alph => !!alph,
                alph => this._gameService.getCategoryHeadersAsync(alph.language.id, alph.id).pipe(
                    map(catsMap => Object
                        .values(catsMap)
                        .map<ISelectable<CategoryHeaderDto>>(x => ({ value: x, isSelected: false }))))
            ),
            tap(x => !!x ? console.log("Categories - Loaded: " + x.length) : console.log("Categories - Reset")),
            shareReplay(1));

        this.subscribe(this.categories$, { next: cats => this._categoryIds = !!cats ? new Set(cats.map(x => x.value.id)) : null });

        // logs
        this.subscribe(this.alphabets$, { next: x => console.log("Alphabets - Loaded: " + x?.length) });
        this.subscribe(this.languages$, { next: x => console.log("Languages - Loaded: " + x?.length) });
        this.subscribe(this.selectableChars$, { next: x => console.log("New selectable chars: " + x?.length) });
        this.subscribe(this.selectedAlphabet$, { next: x => console.log("Selected alphabet: " + x?.nativeName) });
        this.subscribe(this.selectedLanguage$, { next: x => console.log("Selected language: " + x?.nativeName) });
        this.subscribe(this.selectedChars$, { next: x => console.log("Selected chars: " + x) });
        // this.subscribe(this.secondsPerWord$, x => console.log("Seconds per word: " + x));
        // this.subscribe(this.roundsCount$, x => console.log("Rounds count: " + x));
    }

    public readonly alphabetsMap$ = from(this._gameService.getAlphabetsAsync()).pipe(shareReplay(1));
    public readonly alphabets$ = this.alphabetsMap$.pipe(map(dict => Object.values(dict)), shareReplay(1));

    @Output()
    public readonly languagesMap$: Observable<LanguagesDict>;
    public readonly languages$: Observable<Language[]>;

    public get selectedLanguage() { return this._selectedLanguage$$.value; }
    public set selectedLanguage(value: Language) { this._selectedLanguage$$.next(value); }
    public selectLanguage(language: Language) { this.selectedLanguage = language; }
    // event
    private readonly _selectedLanguage$$: BehaviorSubject<Language> = new BehaviorSubject<Language>(null);
    public get selectedLanguage$() { return this._selectedLanguage$$.asObservable(); }

    public get selectedAlphabet() { return this._selectedAlphabet$$.value; }
    public set selectedAlphabet(value: Alphabet) { this._selectedAlphabet$$.next(value); }
    public selectAlphabet(alphabet: Alphabet) { this.selectedAlphabet = alphabet; }
    // event
    private readonly _selectedAlphabet$$: BehaviorSubject<Alphabet> = new BehaviorSubject<Alphabet>(null);
    public get selectedAlphabet$() { return this._selectedAlphabet$$.asObservable(); }

    private _categoryIds: Set<CategoryHeaderDto["id"]>;
    public readonly categories$: Observable<ISelectable<CategoryHeaderDto>[]>;
    public setSelectedCategories(categories: ReadonlyArray<CategoryDto>) { }

    public readonly selectableChars$: Observable<ISelectable<Char>[]>;

    public get selectedChars(): Char[] { return this._selectedChars$$.value; }
    public set selectedChars(value) { this._selectedChars$$.next(value); }
    private readonly _selectedChars$$: BehaviorSubject<Char[]> = new BehaviorSubject(null);
    public get selectedChars$() { return this._selectedChars$$.asObservable(); }
    public setSelectedChars(selectedChars: Char[]) { this.selectedChars = selectedChars; }

    private readonly _secondsPerWord$$ = new BehaviorSubject<number>(10);
    public get secondsPerWord() { return this._secondsPerWord$$.value; }
    public set secondsPerWord(value) { this._secondsPerWord$$.next(value); }
    public get secondsPerWord$() { return this._secondsPerWord$$.asObservable().pipe(distinctUntilChanged()); }
    public readonly SecondsPerWord_MIN: number = 3;
    public readonly SecondsPerWord_MAX: number = 60;

    private readonly _roundsCount$$ = new BehaviorSubject<number>(8);
    public get roundsCount() { return this._roundsCount$$.value; }
    public set roundsCount(value) { this._roundsCount$$.next(value); }
    public get roundsCount$() { return this._roundsCount$$.asObservable().pipe(distinctUntilChanged()); }
    public readonly RoundsCount_MIN: number = 5;
    public readonly RoundsCount_MAX: number = 20;

    doCreateMatch(): void {
        // const matchConfig: MatchConfigDto = {};
        // matchConfig.alphabetId = this.selectedAlphabet.id;
        // matchConfig.categoryIds = this.categories$.
    }
}
