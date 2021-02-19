import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventEmitter } from 'events';
import { from, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { Alphabet, AlphabetsDict as AlphabetsDict } from 'src/app/root/models/culture.DTOs';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-alphabet-variant-selector',
  templateUrl: './alphabet-variant-selector.component.html',
  styleUrls: ['./alphabet-variant-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetVariantSelectorComponent extends ReactiveComponent {

  constructor(
    private readonly _matchService: MatchService,
    changeDetectorRef: ChangeDetectorRef) {

    super(changeDetectorRef);

    this._selectedAlphabet$$ = new BehaviorSubject<Alphabet>(null);
    // this.selectedAlphabet$ = this._selectedAlphabet$$.asObservable().pipe(distinctUntilChanged());
  }

  // @Input()
  // public availableAlphabetsMap: AlphabetsMap[];

  // @Input()
  // public availableAlphabetsMap$: Observable<AlphabetsMap>;

  @Input()
  public availableAlphabets$: Observable<Alphabet[]>;

  public selectAlphabet(alphabet: Alphabet) {
    this.selectedAlphabet = alphabet;
  }

  // @Input()
  // public availableAlphabets$: Observable<Alphabets[]>;

  // public readonly availableAlphabetAlphabets$ = from(this._matchService.getAvailableCulturesAsync())
  //   .pipe(
  //     shareReplay({ refCount: true, bufferSize: 1 }));

  private readonly _selectedAlphabet$$: BehaviorSubject<Alphabet>;
  @Output()
  public get selectedAlphabet$(): Observable<Alphabet> { return this._selectedAlphabet$$.asObservable(); }
  public get selectedAlphabet() { return this._selectedAlphabet$$.value; }
  public set selectedAlphabet(value: Alphabet) { this._selectedAlphabet$$.next(value); }
}
