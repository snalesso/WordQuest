import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, share, shareReplay, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { logEvent } from 'src/app/common/utils/dev.utils';
import { Alphabet, AlphabetVariantOption } from 'src/app/root/models/culture.DTOs';
import { GameService } from '../../services/game.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-alphabet-variant-selector',
  templateUrl: './alphabet-variant-selector.component.html',
  styleUrls: ['./alphabet-variant-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetVariantSelectorComponent extends ReactiveComponent {

  private readonly _alphabets$$ = new BehaviorSubject<readonly AlphabetVariantOption[] | undefined>(undefined);
  public get alphabets() { return this._alphabets$$.value; }
  @Input('alphabets')
  public set alphabets(value: readonly AlphabetVariantOption[] | undefined) { this._alphabets$$.next(value); }
  @Output()
  public readonly alphabets$ = this._alphabets$$
    .pipe(
      catchError(() => of<AlphabetVariantSelectorComponent['alphabets']>([])),
      distinctUntilChanged(),
      tap(x => logEvent(this, 'alphabets', x)),
      shareReplay({ bufferSize: 1, refCount: true }));

  public get areAlphabetsAvailable() { return (this.alphabets?.length ?? 0) > 0; }
  @Output()
  public readonly areAlphabetsAvailable$ = this.alphabets$
    .pipe(
      map(alphabets => alphabets !== undefined && alphabets.length > 0),
      // startWith(false),
      distinctUntilChanged(),
      tap(x => logEvent(this, 'are alphabets available', x)),
      shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _selectedAlphabet$$ = new BehaviorSubject<Alphabet | undefined>(undefined);
  public get selectedAlphabet() { return this._selectedAlphabet$$.value; }
  public set selectedAlphabet(value: Alphabet | undefined) { this._selectedAlphabet$$.next(value); }
  @Output()
  public readonly selectedAlphabet$ = this._selectedAlphabet$$.pipe(distinctUntilChanged());

  public get isAlphabetSelected() { return this.selectAlphabet !== undefined; }
  @Output()
  public readonly isAlphabetSelected$ = this.selectedAlphabet$
    .pipe(
      map(alphabet => alphabet !== undefined),
      distinctUntilChanged());

  //#region UI

  private readonly _isEnabled$$ = new BehaviorSubject<boolean>(true);
  @Input('isEnabled')
  public set isEnabled(value: boolean) { this._isEnabled$$.next(value); }
  public get isEnabled() { return this._isEnabled$$.value; }
  @Output()
  public readonly isEnabled$ = this._isEnabled$$
    .pipe(
      distinctUntilChanged(),
      tap(x => logEvent(this, 'is enabled', x)),
      share());

  @Output()
  public readonly canSelectAlphabet$ = combineLatest([this.isEnabled$, this.areAlphabetsAvailable$])
    .pipe(
      map(([isEnabled, areAlphabetsAvailable]) => isEnabled && areAlphabetsAvailable),
      distinctUntilChanged());
  public get canSelectAlphabet() { return this.isEnabled && this.areAlphabetsAvailable; }

  //#endregion

  constructor(
    private readonly _gameService: GameService,
    private readonly _matchService: MatchService,
    private readonly _globalizationService: GlobalizationService,
    private readonly _formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  public selectAlphabet(alphabet: Alphabet) {
    if (!this.canSelectAlphabet)
      throw new Error('Cannot select alphabet.');

    this.selectedAlphabet = alphabet;
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
//       tap(x => logEvent(this, 'is loading', x)),
//       shareReplay({ bufferSize: 1, refCount: true }));

//   @Output()
//   private readonly _alphabetsFromSvc$ = this._gameService.getAlphabetOptionsAsync()
//     .pipe(
//       tapOnSub(() => this._isLoading$$.next(true)),
//       first(),
//       finalize(() => this._isLoading$$.next(false)),
//       tap(x => logEvent(this, 'alphabets from svc', x)),
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
//       tap(x => logEvent(this, 'alphabets from input', x)),
//       shareReplay({ bufferSize: 1, refCount: true }));
//   @Output()
//   // public readonly alphabets$ = this._alphabetsFromInput$
//   public readonly alphabets$ = this._alphabetsFromSvc$
//     .pipe(
//       catchError(() => of<readonly Alphabet[]>([])),
//       distinctUntilChanged(),
//       tap(x => logEvent(this, 'alphabets', x)),
//       shareReplay({ bufferSize: 1, refCount: true }));
//   public readonly alphabetsLoadFailed$ = this.alphabets$
//     .pipe(
//       startWith(false),
//       catchError(() => of(true)),
//       distinctUntilChanged(),
//       tap(x => logEvent(this, 'alphabets load failed', x)),
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
//       tap(x => logEvent(this, 'are alphabets available', x)),
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
//   //     tap(x => console.log("Languages dropdown status: " + (!!x ? "loaded" : "loading"))));

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
