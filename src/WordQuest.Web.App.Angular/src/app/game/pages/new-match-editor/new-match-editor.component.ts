import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { ISelectable } from 'src/app/root/models/core';
import { Alphabet, Char, Language } from 'src/app/root/models/culture.DTOs';
import { Category, CategoryHeader } from '../../models/game.DTOs';
import { GameService } from '../../services/game.service';
import { MatchService } from '../../services/match.service';

@Component({
    selector: 'app-new-match-editor',
    templateUrl: './new-match-editor.component.html',
    styleUrls: ['./new-match-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// TODO: implement ValueProvider (to make it behave like a form)
export class NewMatchEditorComponent extends ReactiveComponent {

    // private readonly _alphabetsSource = new ObservableValueSource(this._gameService.getAlphabetOptionsAsync);
    // @Output() public readonly alphabets$ = this._alphabetsSource.value$;
    @Output()
    public readonly alphabets$ = this._gameService.getAlphabetVariantOptionsAsync().pipe(shareReplay({ bufferSize: 1, refCount: true }));
    // public readonly alphabets$: Observable<readonly Alphabet[]> = throwError(() => new Error('fewfawefwe'));
    @Output()
    public readonly languages$ = this.alphabets$.pipe(
        map(alphabets => {
            return alphabets.map(x => x.language);
        }),
        // map(languages => new Set(languages) as ReadonlySet<Language>), // TODO: find a better way to make it readonly (asReadonly()?)
        tap(x => logEvent(this, 'languages', x)),
        shareReplay({ bufferSize: 1, refCount: true }));;
    // @Output()
    // public readonly languagesMap$: Observable<ReadonlyArray<Language>>;

    // private readonly _selectedLanguage$$ = new ReplaySubject<Language>(1);
    private readonly _selectedLanguage$$ = new BehaviorSubject<Language | undefined>(undefined);
    public get selectedLanguage() { return this._selectedLanguage$$.value; }
    public set selectedLanguage(value: Language | undefined) { this._selectedLanguage$$.next(value); }
    public selectLanguage(language: Language) { this.selectedLanguage = language; }
    @Output()
    public readonly selectedLanguage$ = this._selectedLanguage$$.asObservable();

    // private readonly _selectedAlphabet$$ = new ReplaySubject<Alphabet>(1);
    private readonly _selectedAlphabet$$ = new BehaviorSubject<Alphabet | undefined>(undefined);
    public get selectedAlphabet() { return this._selectedAlphabet$$.value; }
    public set selectedAlphabet(value: Alphabet | undefined) { this._selectedAlphabet$$.next(value); }
    public selectAlphabet(alphabet: Alphabet) { this.selectedAlphabet = alphabet; }
    @Output()
    public readonly selectedAlphabet$ = this._selectedAlphabet$$.pipe(distinctUntilChanged());

    // private _categoryIds: Set<CategoryHeaderDto["id"]>;
    @Output()
    public readonly categories$ = this.selectedAlphabet$
        .pipe(
            tap(() => console.log("Categories - Loading ...")),
            switchMap(alph => {
                if (alph === undefined)
                    return of(undefined);
                const categoryOptions$ = this._gameService.getCategoryHeadersAsync(/*alph.language.id,*/ alph.id)
                    .pipe(
                        map(catsMap => Object
                            .values(catsMap)
                            .map<ISelectable<CategoryHeader>>(x => ({ value: x, isSelected: false }))));

                return categoryOptions$.pipe(startWith(undefined));
                // return concat(of(undefined), categoryOptions$);
            }),
            tap(x => {
                logEvent(this, "Categories", x);
            }),
            shareReplay({ bufferSize: 1, refCount: true }));

    public setSelectedCategories(categories: ReadonlyArray<Category>) { }

    @Output()
    public readonly selectableChars$ = this.selectedAlphabet$.pipe(
        map(selAlph => {
            const charInfos = !!selAlph ? Object.values(selAlph.charInfos) : null;
            const selectableChars = !!charInfos ? charInfos.map<ISelectable<Char>>(ci => ({ value: ci.char, isSelected: !ci.isRare })) : [];
            return selectableChars;
        }),
        shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _selectedChars$$ = new ReplaySubject<readonly Char[]>(1);
    // public get selectedChars(): Char[] { return this._selectedChars$$.value; }
    public set selectedChars(value: readonly Char[]) { this._selectedChars$$.next(value); }
    public setSelectedChars(selectedChars: Char[]) { this.selectedChars = selectedChars; }
    @Output()
    public readonly selectedChars$ = this._selectedChars$$.asObservable();

    private readonly _secondsPerWord$$ = new BehaviorSubject<number>(10);
    public get secondsPerWord() { return this._secondsPerWord$$.value; }
    public set secondsPerWord(value) { this._secondsPerWord$$.next(value); }
    @Output()
    public readonly secondsPerWord$ = this._secondsPerWord$$.pipe(distinctUntilChanged());
    public readonly SecondsPerWord_MIN: number = 3;
    public readonly SecondsPerWord_MAX: number = 60;

    private readonly _roundsCount$$ = new BehaviorSubject<number>(8);
    public get roundsCount() { return this._roundsCount$$.value; }
    public set roundsCount(value) { this._roundsCount$$.next(value); }
    @Output()
    public readonly roundsCount$ = this._roundsCount$$.pipe(distinctUntilChanged());
    public readonly RoundsCount_MIN: number = 5;
    public readonly RoundsCount_MAX: number = 20;

    //#region UI

    @Output()
    public readonly areCategoriesAvailable$ = this.categories$
        .pipe(
            map(categories => categories !== undefined && categories.length > 0),
            // startWith(false),
            distinctUntilChanged()
            // shareReplay({ bufferSize: 1, refCount: true })
        );

    //#endregion

    constructor(
        private readonly _gameService: GameService,
        private readonly _matchService: MatchService,
        private readonly _globalizationService: GlobalizationService,
        private readonly _formBuilder: FormBuilder,
        changeDetectorRef: ChangeDetectorRef) {

        super(changeDetectorRef);

        // this.subscribe(this.categories$, { next: cats => this._categoryIds = !!cats ? new Set(cats.map(x => x.value.id)) : null });

        // logs
        // this.subscribe(this.alphabets$, { next: x => console.log("Alphabets - Loaded: " + x?.size) });
        // this.subscribe(this.languages$, { next: x => console.log("Languages - Loaded: " + x?.size) });
        // this.subscribe(this.selectableChars$, { next: x => console.log("New selectable chars: " + x?.length) });
        // this.subscribe(this.selectedAlphabet$, { next: x => console.log("Selected alphabet: " + x?.nativeName) });
        // this.subscribe(this.selectedLanguage$, { next: x => console.log("Selected language: " + x?.nativeName) });
        // this.subscribe(this.selectedChars$, { next: x => console.log("Selected chars: " + x) });
        // this.subscribe(this.secondsPerWord$, x => console.log("Seconds per word: " + x));
        // this.subscribe(this.roundsCount$, x => console.log("Rounds count: " + x));
    }

    doCreateMatch(): void {
        // const matchConfig: MatchConfigDto = {};
        // matchConfig.alphabetId = this.selectedAlphabet.id;
        // matchConfig.categoryIds = this.categories$.
    }
}
