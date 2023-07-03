import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, multicast, refCount, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { allTrue, isNilOrEmpty, isNotNil } from 'src/app/common/utils/core.utils';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { mapInvertedBool } from 'src/app/common/utils/rxjs.utils';
import { AlphabetVariantOption, Char, CharMetadata, Language } from 'src/app/root/models/culture.DTOs';
import { CategoryOption } from '../../models/game.DTOs';
import { GameService } from '../../services/game.service';
import { MatchService } from '../../services/match.service';

@Component({
    selector: 'app-new-match-editor',
    templateUrl: './new-match-editor.component.html',
    styleUrls: ['./new-match-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// TODO: implement ValueProvider (to make it behave like a form)
export class NewMatchEditorComponent extends ReactiveComponent implements OnInit {

    @Output()
    public readonly alphabetVariants$ = this._gameService.getAlphabetVariantOptionsAsync().pipe(shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _selectedLanguageId$$ = new BehaviorSubject<Language['id'] | undefined>(undefined);
    public get selectedLanguageId() { return this._selectedLanguageId$$.value; }
    @Input()
    public set selectedLanguageId(value: Language['id'] | undefined) { this._selectedLanguageId$$.next(value); }
    @Output()
    public readonly selectedLanguageId$ = this._selectedLanguageId$$.asObservable();

    private readonly _selectedAlphabet$$ = new BehaviorSubject<AlphabetVariantOption | undefined>(undefined);
    public get selectedAlphabet() { return this._selectedAlphabet$$.value; }
    @Input()
    public set selectedAlphabet(value: AlphabetVariantOption | undefined) { this._selectedAlphabet$$.next(value); }
    @Output()
    public readonly selectedAlphabet$ = this._selectedAlphabet$$.pipe(distinctUntilChanged());

    private readonly _categories$$ = new BehaviorSubject<readonly CategoryOption[] | undefined>(undefined);
    public get categories() { return this._categories$$.value; }
    @Output()
    public readonly categories$ = this.selectedAlphabet$.pipe(
        switchMap(alphabetVariant => {
            if (alphabetVariant == null)
                return of(undefined);
            return this._gameService.getCategoryOptionsAsync(alphabetVariant.id).pipe(
                catchError(() => of(undefined)),
                startWith(undefined));
        }),
        multicast(() => this._categories$$),
        refCount(),
        distinctUntilChanged(),
        tap(categories => logEvent(this, "categories", categories)),
        shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _selectedCategories$$ = new BehaviorSubject<readonly CategoryOption[] | undefined>(undefined);
    public get selectedCategories() { return this._selectedCategories$$.value; }
    @Input()
    public set selectedCategories(value) { this._selectedCategories$$.next(value); }
    @Output()
    public readonly selectedCategories$ = this._selectedCategories$$.asObservable();

    private readonly _alphabetChars$$ = new BehaviorSubject<Partial<Record<Char, CharMetadata>> | undefined>(undefined);
    public get alphabetChars() { return this._alphabetChars$$.value; }
    @Output()
    public readonly alphabetChars$ = this.selectedAlphabet$.pipe(
        map(alphabetVariant => {
            if (alphabetVariant == null)
                return undefined;
            return alphabetVariant.charMetadataMap;
        }),
        catchError(() => of(undefined)),
        multicast(() => this._alphabetChars$$),
        refCount(),
        distinctUntilChanged(),
        tap(value => logEvent(this, "alphabet chars", value)),
        shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _selectedChars$$ = new BehaviorSubject<readonly Char[] | undefined>(undefined);
    public get selectedChars() { return this._selectedChars$$.value; }
    @Input()
    public set selectedChars(value) { this._selectedChars$$.next(value); }
    @Output()
    public readonly selectedChars$ = this._selectedChars$$.pipe(
        distinctUntilChanged(),
        tap(value => logEvent(this, "selected chars", value)),
        shareReplay({ bufferSize: 1, refCount: true }));

    private readonly _secondsPerWord$$ = new BehaviorSubject<number>(10);
    public get secondsPerWord() { return this._secondsPerWord$$.value; }
    @Input()
    public set secondsPerWord(value) { this._secondsPerWord$$.next(value); }
    @Output()
    public readonly secondsPerWord$ = this._secondsPerWord$$.pipe(distinctUntilChanged());
    public readonly SecondsPerWord_MIN: number = 3;
    public readonly SecondsPerWord_MAX: number = 60;

    private readonly _roundsCount$$ = new BehaviorSubject<number>(8);
    public get roundsCount() { return this._roundsCount$$.value; }
    @Input()
    public set roundsCount(value) { this._roundsCount$$.next(value); }
    @Output()
    public readonly roundsCount$ = this._roundsCount$$.pipe(distinctUntilChanged());
    public readonly RoundsCount_MIN: number = 5;
    public readonly RoundsCount_MAX: number = 20;

    private readonly _canCreateMatch$$ = new BehaviorSubject<boolean>(
        allTrue([
            isNotNil(this.selectedAlphabet),
            !isNilOrEmpty(this.selectedCategories)
        ]));
    public get canCreateMatch() { return this._canCreateMatch$$.value; }
    @Output()
    public readonly canCreateMatch$ = combineLatest([
        this.selectedAlphabet$.pipe(map(isNotNil), distinctUntilChanged()),
        this.selectedCategories$.pipe(map(isNilOrEmpty), mapInvertedBool(), distinctUntilChanged())
    ]).pipe(
        map(allTrue),
        multicast(() => this._canCreateMatch$$),
        refCount(),
        distinctUntilChanged());

    constructor(
        cdr: ChangeDetectorRef,
        private readonly _gameService: GameService,
        private readonly _matchService: MatchService,
        private readonly _globalizationService: GlobalizationService,
        private readonly _formBuilder: UntypedFormBuilder) {
        super(cdr);
    }

    ngOnInit(): void {
        this.subscribe([
            this.categories$,
            this.roundsCount$,
            this.selectedChars$,
            this.secondsPerWord$,
            this.alphabetChars$,
            this.alphabetVariants$,
            this.selectedAlphabet$,
            this.selectedCategories$,
            this.selectedLanguageId$,
        ]);
    }

    public createMatch(): void {
        // const matchConfig: MatchConfigDto = {};
        // matchConfig.alphabetId = this.selectedAlphabet.id;
        // matchConfig.categoryIds = this.categories$.
    }
}
