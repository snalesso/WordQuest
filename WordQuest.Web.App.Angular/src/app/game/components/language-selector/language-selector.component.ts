import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { } from 'src/app/root/models/core';
import { Language } from 'src/app/root/models/culture.DTOs';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent extends ReactiveComponent {

  private readonly _selectedLanguage$$ = new BehaviorSubject<number>(null);

  constructor(
    private readonly _matchService: MatchService,
    changeDetectorRef: ChangeDetectorRef) {

    super(changeDetectorRef);

    // this._availableLanguages$$ = new BehaviorSubject<Array<ILanguageDto>>(null);
    // this.availableLanguages$ = this._availableLanguages$$.pipe(
    //   // catchError(x => of(null)),
    //   distinctUntilChanged(),
    //   shareReplay({ refCount: true, bufferSize: 1 }));

    // this.languages$ = from(this._matchService.getAvailableCulturesAsync())
    //   .pipe(
    //     // retry(3),
    //     map(langChars => {
    //       return null;
    //       // const langNamesMap = new Map<Language, string>();
    //       // for (let langChar of langChars) {
    //       //     langNamesMap.set(langChar.language, langChar.nativeName);
    //       // }

    //       // return langNamesMap;
    //     }),
    //     shareReplay(1)//{ refCount: true, bufferSize: 1 })
    //   );

    this.selectedLanguage$ = this._selectedLanguage$$
      .pipe(
        distinctUntilChanged(),
        tap(x => {
          console.log("Language-Selector - Selected lang: " + x);
        }));
  }

  // public readonly availableLanguageAlphabets$ =
  //   from(this._matchService.getLanguageOptionsAsync())
  //     .pipe(
  //       // retry(3),
  //       shareReplay({ refCount: true, bufferSize: 1 }));

  private _hasErrors: boolean = false;
  public get hasErrors(): boolean { return this._hasErrors; }
  // private set hasErrors(value: boolean) { this._hasErrors = value; }

  // private _availableLanguages$$: BehaviorSubject<Array<ILanguageDto>>;
  @Input()
  public languages$: Observable<Array<Language>>;
  // @Input()
  // public set availableLanguages(value: Array<ILanguageDto>) { this._availableLanguages$$.next(value); }
  // public get availableLanguages(): Array<ILanguageDto> { return this._availableLanguages$$.value; }

  @Output()
  public readonly selectedLanguage$: Observable<number>;
  public get selectedLanguage() { return this._selectedLanguage$$.value; }
  public set selectedLanguage(value: number) { this._selectedLanguage$$.next(value); }

  public selectLanguage(language: number) { this.selectedLanguage = +language; }
}
