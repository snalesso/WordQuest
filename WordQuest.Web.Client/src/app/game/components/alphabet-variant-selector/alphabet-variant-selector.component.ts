import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { isNotNil } from 'src/app/common/utils/core.utils';
import { Alphabet } from 'src/app/root/models/culture.DTOs';

@Component({
  selector: 'app-alphabet-variant-selector',
  templateUrl: './alphabet-variant-selector.component.html',
  styleUrls: ['./alphabet-variant-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetVariantSelectorComponent extends ReactiveComponent {

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  private readonly _availableAlphabets$$ = new BehaviorSubject<ReadonlyArray<Alphabet>>(null);
  @Output()
  public readonly availableAlphabets$ = this._availableAlphabets$$.asObservable();
  @Input()
  public set availableAlphabets(value) { this._availableAlphabets$$.next(value); }
  public get availableAlphabets() { return this._availableAlphabets$$.value; }

  public readonly areAvailableAlphabetsLoaded$ = this.availableAlphabets$
    .pipe(
      map(isNotNil));
  public readonly hasAvailableAlphabets$ = this.availableAlphabets$
    .pipe(
      map(alphabets => isNotNil(alphabets) && alphabets.length > 0));
  public readonly canSelectAlphabet$ = this.hasAvailableAlphabets$;

  // @Output()
  // public readonly areAlphabetsLoading$ = this.availableAlphabets$
  //   .pipe(
  //     map(alphabets => {
  //       return (alphabets !== null && alphabets !== undefined)
  //         ? true
  //         : null;
  //     }),
  //     startWith(true),
  //     catchError(error => of(true)),
  //     tap(x => console.log("Languages dropdown status: " + (!!x ? "loaded" : "loading"))));

  // public readonly isAlphabetsLoadingFaulted$ = this._availableAlphabets$$.pipe(isEmpty());
  // public readonly placeholderText$ = this.isAlphabetsLoadingFaulted$.pipe(map(isFaulted => isFaulted ? 'Loading failed' : 'Select a language ...'));

  private readonly _selectedAlphabet$$: BehaviorSubject<Alphabet> = new BehaviorSubject<Alphabet>(null);;
  @Output()
  public get selectedAlphabet$(): Observable<Alphabet> { return this._selectedAlphabet$$.asObservable(); }
  public get selectedAlphabet() { return this._selectedAlphabet$$.value; }
  public set selectedAlphabet(value: Alphabet) { this._selectedAlphabet$$.next(value); }

  public selectAlphabet(alphabet: Alphabet) { this.selectedAlphabet = alphabet; }
}
