import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { MatchService } from '../../services/match.service';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent extends ReactiveComponent {

    constructor(
        // private readonly _matchService: MatchService,
        // private readonly _globalizationService: GlobalizationService,
        // private readonly _formBuilder: FormBuilder
        private readonly _matchService: MatchService,
        changeDetectorRef: ChangeDetectorRef
    ) {

        super(changeDetectorRef);
    }

    // private _matchSnapshot$$ = new BehaviorSubject<MatchSnapshot>(null);
    // public set matchSnapshot(value) { this._matchSnapshot$$.next(value); }
    // public get matchSnapshot() { return this._matchSnapshot$$.value; }
    // public get matchSnapshot$() { return this._matchSnapshot$$.asObservable(); }

    public get matchId$() { return this._matchService.currentMatchId$; }

    // public readonly availableLanguages$: Observable<ReadonlyArray<Language>> = from(this._matchService.getLanguagesAsync()).pipe(shareReplay());
    // private readonly _selectedLanguage$$ = new BehaviorSubject<Language | null>(null);
    // public get selectedLanguage$() { return this._selectedLanguage$$.asObservable(); }

    // public selectLanguage(language: Language) {
    //     console.log("Selected lang: " + language);
    //     this._selectedLanguage$$.next(language);
    // }

    // public printSelectedCategories(event) {
    //     this.selectedCategories = event;
    // }

    // public selectedCategories;

    // ngOnInit(): void {

    //     this.registerForDisposal(
    //         // when available langs chage, if the selected one is not present anymore, select the first of the availables
    //         this.availableLanguages$
    //             .pipe(
    //                 map(languages => {

    //                     if (!languages || languages.length <= 0)
    //                         return null;

    //                     if (!languages.includes(this._selectedLanguage$$.value)) {
    //                         // const i = Math.floor((languages.length - 1) / 2);
    //                         return languages[0];
    //                     }
    //                 }))
    //             .subscribe(value => this.selectLanguage(x)),

    //     );
    // }

}
