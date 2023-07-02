import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, multicast, refCount, shareReplay, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { allTrue, isNilOrEmpty, isNotNil } from 'src/app/common/utils/core.utils';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { AlphabetVariantOption } from 'src/app/root/models/culture.DTOs';
import { GameService } from '../../services/game.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-alphabet-variant-selector',
  templateUrl: './alphabet-variant-selector.component.html',
  styleUrls: ['./alphabet-variant-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetVariantSelectorComponent extends ReactiveComponent implements OnInit {

  private readonly _alphabetVariants$$ = new BehaviorSubject<readonly AlphabetVariantOption[] | undefined>(undefined);
  public get alphabetVariants() { return this._alphabetVariants$$.value; }
  @Input()
  public set alphabetVariants(value: readonly AlphabetVariantOption[] | undefined) { this._alphabetVariants$$.next(value); }
  @Output()
  public readonly alphabetVariants$ = this._alphabetVariants$$.pipe(
    catchError(() => of(undefined)),
    distinctUntilChanged(),
    tap(value => logEvent(this, 'alphabetVariants', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _areAlphabetVariantsAvailable$$ = new BehaviorSubject<boolean>(!isNilOrEmpty(this.alphabetVariants));
  public get areAlphabetVariantsAvailable() { return !isNilOrEmpty(this.alphabetVariants); }
  @Output()
  public readonly areAlphabetVariantsAvailable$ = this.alphabetVariants$.pipe(
    map(x => !isNilOrEmpty(x)),
    multicast(() => this._areAlphabetVariantsAvailable$$),
    refCount(),
    distinctUntilChanged(),
    tap(value => logEvent(this, 'are alphabet variants available', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _selectedAlphabetVariant$$ = new BehaviorSubject<AlphabetVariantOption | undefined>(undefined);
  @Input()
  public get selectedAlphabetVariant() { return this._selectedAlphabetVariant$$.value; }
  public set selectedAlphabetVariant(value: AlphabetVariantOption | undefined) { this._selectedAlphabetVariant$$.next(value); }
  @Output()
  public readonly selectedAlphabetVariant$ = this._selectedAlphabetVariant$$.pipe(distinctUntilChanged());

  private readonly _isAlphabetVariantSelected$$ = new BehaviorSubject<boolean>(isNotNil(this.selectedAlphabetVariant));
  public get isAlphabetVariantSelected() { return this._isAlphabetVariantSelected$$.value; }
  @Output()
  public readonly isAlphabetVariantSelected$ = this.selectedAlphabetVariant$.pipe(
    map(isNotNil),
    multicast(() => this._isAlphabetVariantSelected$$),
    refCount(),
    distinctUntilChanged());

  private readonly _isEnabled$$ = new BehaviorSubject<boolean>(true);
  @Input()
  public set isEnabled(value: boolean) { this._isEnabled$$.next(value); }
  public get isEnabled() { return this._isEnabled$$.value; }
  @Output()
  public readonly isEnabled$ = this._isEnabled$$.pipe(
    distinctUntilChanged(),
    tap(value => logEvent(this, 'is enabled', value)),
    shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _canSelectAlphabetVariant$$ = new BehaviorSubject<boolean>(allTrue([this.isEnabled, this.areAlphabetVariantsAvailable]));
  public get canSelectAlphabetVariant() { return this._canSelectAlphabetVariant$$.value; }
  @Output()
  public readonly canSelectAlphabetVariant$ = combineLatest([
    this.isEnabled$,
    this.areAlphabetVariantsAvailable$
  ]).pipe(
    map(allTrue),
    multicast(() => this._canSelectAlphabetVariant$$),
    refCount(),
    distinctUntilChanged());

  constructor(
    cdr: ChangeDetectorRef,
    private readonly _g11nSvc: GlobalizationService,
    private readonly _gameService: GameService,
    private readonly _matchService: MatchService,
    private readonly _globalizationService: GlobalizationService) {
    super(cdr);
  }

  ngOnInit(): void {
    this.subscribe([
      this.isEnabled$,
      this.alphabetVariants$,
      this.areAlphabetVariantsAvailable$,
      this.canSelectAlphabetVariant$,
      this.selectedAlphabetVariant$,
      this.isAlphabetVariantSelected$,
    ]);

    this.subscribe(this.alphabetVariants$, {
      next: alphabetVariants => {
        this.selectedAlphabetVariant = alphabetVariants == null || alphabetVariants.length <= 0
          ? undefined
          : alphabetVariants[0]; // TODO: select first variant for current app lang .find(av => av.languageId === this._g11nSvc.selectedLanguage?.id);
      }
    })
  }

  public select(alphabetVariant: AlphabetVariantOption) {
    if (!this.canSelectAlphabetVariant)
      throw new Error('Cannot select alphabet variant.');

    this.selectedAlphabetVariant = alphabetVariant;
  }
}

// alphabets obtained from inside

// export class AlphabetVariantSelectorComponent extends ReactiveComponent {

//   private readonly _isLoading$$ = new ReplaySubject<boolean>(1);
//   @Output()
//   public readonly isLoading$ = this._isLoading$$
//     .pipe(
//       startWith(false),
//       distinctUntilChanged(),
//       tap(value => logEvent(this, 'is loading', value)),
//       shareReplay({ bufferSize: 1, refCount: true }));

//   @Output()
//   private readonly _alphabetsFromSvc$ = this._gameService.getAlphabetOptionsAsync()
//     .pipe(
//       tapOnSub(() => this._isLoading$$.next(true)),
//       first(),
//       finalize(() => this._isLoading$$.next(false)),
//       tap(value => logEvent(this, 'alphabets from svc', value)),
//       shareReplay({ bufferSize: 1, refCount: true }));
//   // private readonly _alphabetsFromSvc$: Observable<readonly Alphabet[]> = throwError(() => new Error('fewfawefwe'));

//   public readonly alphabetsSource = new ObservableValueSource(
//     () => this._gameService.getAlphabetOptionsAsync(),
//     {
//       loggingId: 'Alphabets variants source'
//     });
//   // @Output() public readonly alphabets$ = this._alphabetsSource.value$;
//   // public readonly alphabetsSource = new ObservableValueSource(
//   //   () => this._gameService.getAlphabetOptionsAsync(),
//   //   {
//   //     loggingId: 'Alphabets',
//   //     isLoggingEnabled: true
//   //   });
//   private readonly _alphabetsFromInput$$ = new ReplaySubject<readonly Alphabet[]>(1);
//   @Input('alphabets')
//   public set alphabetsFromInput(value: readonly Alphabet[]) { this._alphabetsFromInput$$.next(value); }
//   private readonly _alphabetsFromInput$ = this._alphabetsFromInput$$
//     .pipe(
//       filter(isNotNil),
//       distinctUntilChanged(),
//       tap(value => logEvent(this, 'alphabets from input', value)),
//       shareReplay({ bufferSize: 1, refCount: true }));
//   @Output()
//   // public readonly alphabets$ = this._alphabetsFromInput$
//   public readonly alphabets$ = this._alphabetsFromSvc$
//     .pipe(
//       catchError(() => of<readonly Alphabet[]>([])),
//       distinctUntilChanged(),
//       tap(value => logEvent(this, 'alphabets', value)),
//       shareReplay({ bufferSize: 1, refCount: true }));
//   public readonly alphabetsLoadFailed$ = this.alphabets$
//     .pipe(
//       startWith(false),
//       catchError(() => of(true)),
//       distinctUntilChanged(),
//       tap(value => logEvent(this, 'alphabets load failed', value)),
//       shareReplay({ bufferSize: 1, refCount: true }));
//   // public get availableAlphabets() { return this._availableAlphabets$$.value; }

//   // public readonly areAvailableAlphabetsLoaded$ = this.alphabets$
//   //   .pipe(
//   //     map(isNotNil),
//   //     distinctUntilChanged());
//   public readonly areAlphabetsAvailable$ = this.alphabets$
//     .pipe(
//       mapTo(true),
//       startWith(false),
//       distinctUntilChanged(),
//       tap(value => logEvent(this, 'are alphabets available', value)),
//       shareReplay({ bufferSize: 1, refCount: true }));
//   public readonly canSelectAlphabet$ = this.areAlphabetsAvailable$;

//   // @Output()
//   // public readonly areAlphabetsLoading$ = this.availableAlphabets$
//   //   .pipe(
//   //     map(alphabets => {
//   //       return (alphabets !== null && alphabets !== undefined)
//   //         ? true
//   //         : null;
//   //     }),
//   //     startWith(true),
//   //     catchError(error => of(true)),
//   //     tap(value => console.log("Languages dropdown status: " + (!!x ? "loaded" : "loading"))));

//   // public readonly isAlphabetsLoadingFaulted$ = this._availableAlphabets$$.pipe(isEmpty());
//   // public readonly placeholderText$ = this.isAlphabetsLoadingFaulted$.pipe(map(isFaulted => isFaulted ? 'Loading failed' : 'Select a language ...'));

//   private readonly _selectedAlphabet$$ = new ReplaySubject<Alphabet>(1);
//   @Output()
//   public get selectedAlphabet$(): Observable<Alphabet> { return this._selectedAlphabet$$.pipe(distinctUntilChanged()); }
//   // public get selectedAlphabet() { return this._selectedAlphabet$$.value; }
//   // public set selectedAlphabet(value: Alphabet) { this._selectedAlphabet$$.next(value); }

//   public selectAlphabet(alphabet: Alphabet) { this._selectedAlphabet$$.next(alphabet); }

//   //#region UI

//   // @Output()
//   // public readonly isEnabled$ = combineLatest([this.alphabetsSource.hasValue$, this.alphabetsSource.hasError$])
//   //   .pipe(
//   //     map(([hasValue, hasError]) => !hasError && hasValue),
//   //     distinctUntilChanged());

//   @Output()
//   public readonly isDisabled$ = this.areAlphabetsAvailable$
//     .pipe(
//       mapInvertedBool(),
//       distinctUntilChanged());

//   //#endregion

//   constructor(
//     private readonly _gameService: GameService,
//     private readonly _matchService: MatchService,
//     private readonly _globalizationService: GlobalizationService,
//     private readonly _formBuilder: FormBuilder,
//     changeDetectorRef: ChangeDetectorRef) {
//     super(changeDetectorRef);
//   }
// }
