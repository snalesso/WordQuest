import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, multicast, refCount, shareReplay, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { allTrue, isNilOrEmpty, isNotNil } from 'src/app/common/utils/core.utils';
import { shareReplayChangeLog } from 'src/app/common/utils/debug/rxjs';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { mapInvertedBool } from 'src/app/common/utils/rxjs.utils';
import { storeIn } from 'src/app/common/utils/rxjs/rxjs.utils';
import { AlphabetVariantOption, Char, Language } from 'src/app/root/models/culture.DTOs';
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

    private readonly _selectedLanguageId$$ = new BehaviorSubject<Language['id'] | undefined>(undefined);
    public get selectedLanguageId() { return this._selectedLanguageId$$.value; }
    @Input() public set selectedLanguageId(value: Language['id'] | undefined) { this._selectedLanguageId$$.next(value); }
    @Output() public readonly selectedLanguageId$ = this._selectedLanguageId$$.asObservable();

    private readonly _alphabetVariant$$ = new BehaviorSubject<AlphabetVariantOption | undefined>(undefined);
    public get alphabetVariant() { return this._alphabetVariant$$.value; }
    @Input() public set alphabetVariant(value: AlphabetVariantOption | undefined) { this._alphabetVariant$$.next(value); }
    @Output() public readonly alphabetVariant$ = this._alphabetVariant$$.pipe(distinctUntilChanged());

    private readonly _alphabetVariantId$$ = new BehaviorSubject<AlphabetVariantOption['id'] | undefined>(undefined);
    public get alphabetVariantId() { return this._alphabetVariantId$$.value; }
    @Output() public readonly alphabetVariantId$ = this.alphabetVariant$.pipe(
        map(alphabetVariant => alphabetVariant?.id),
        storeIn(() => this._alphabetVariantId$$),
        shareReplayChangeLog(this, 'alphabetVariantId'));

    private readonly _selectedCategories$$ = new BehaviorSubject<readonly CategoryOption[] | undefined>(undefined);
    public get selectedCategories() { return this._selectedCategories$$.value; }
    @Input() public set selectedCategories(value) { this._selectedCategories$$.next(value); }
    @Output() public readonly selectedCategories$ = this._selectedCategories$$.asObservable();

    private readonly _selectedChars$$ = new BehaviorSubject<ReadonlySet<Char> | undefined>(undefined);
    public get selectedChars() { return this._selectedChars$$.value; }
    @Input() public set selectedChars(value) { this._selectedChars$$.next(value); }
    @Output() public readonly selectedChars$ = this._selectedChars$$.pipe(
        distinctUntilChanged(),
        tap(value => logEvent(this, "selected chars", value)),
        shareReplay({ bufferSize: 1, refCount: true }));

    public readonly SecondsPerWord_MIN: number = 3;
    public readonly SecondsPerWord_MAX: number = 60;
    private readonly _secondsPerWord$$ = new BehaviorSubject<number>(Math.max(this.SecondsPerWord_MIN, Math.min(this.SecondsPerWord_MAX, 10)));
    public get secondsPerWord() { return this._secondsPerWord$$.value; }
    @Input() public set secondsPerWord(value) { this._secondsPerWord$$.next(value); }
    @Output() public readonly secondsPerWord$ = this._secondsPerWord$$.pipe(distinctUntilChanged());

    public readonly RoundsCount_MIN: number = 5;
    public readonly RoundsCount_MAX: number = 20;
    private readonly _roundsCount$$ = new BehaviorSubject<number>(Math.max(this.RoundsCount_MIN, Math.min(this.RoundsCount_MAX, 8)));
    public get roundsCount() { return this._roundsCount$$.value; }
    @Input() public set roundsCount(value) { this._roundsCount$$.next(value); }
    @Output() public readonly roundsCount$ = this._roundsCount$$.pipe(distinctUntilChanged());

    private readonly _canCreateMatch$$ = new BehaviorSubject<boolean>(
        allTrue([
            isNotNil(this.alphabetVariant),
            !isNilOrEmpty(this.selectedCategories)
        ]));
    public get canCreateMatch() { return this._canCreateMatch$$.value; }
    @Output() public readonly canCreateMatch$ = combineLatest([
        this.alphabetVariant$.pipe(map(isNotNil), distinctUntilChanged()),
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
            // this.alphabetVariants$,
            this.alphabetVariant$,
            this.alphabetVariantId$,
            this.roundsCount$,
            this.selectedChars$,
            this.secondsPerWord$,
            // this.alphabetChars$,
            this.alphabetVariant$,
            this.selectedCategories$,
            this.selectedLanguageId$,
        ]);
    }

    public createMatch(): void {
        // const matchConfig: MatchConfigDto = {};
        // matchConfig.alphabetId = this.alphabetVariant.id;
        // matchConfig.categoryIds = this.categories$.
    }
}
