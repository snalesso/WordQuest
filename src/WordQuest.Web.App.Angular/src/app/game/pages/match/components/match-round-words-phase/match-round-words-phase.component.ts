import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { MatchSettings } from 'src/app/game/models/game.DTOs';
import { MatchService } from '../../../../services/match.service';

@Component({
    selector: 'app-match-round-words-phase',
    templateUrl: './match-round-words-phase.component.html',
    styleUrls: ['./match-round-words-phase.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchRoundWordsPhaseComponent extends ReactiveComponent {

    constructor(
        private readonly _matchService: MatchService,
        changeDetectorRef: ChangeDetectorRef) {

        super(changeDetectorRef);
    }

    @Input() public matchSettings: MatchSettings | null = null;

    public get match$() { return this._matchService.matchSnapshot$; }
    public get categories$() { return this._matchService.matchSnapshot$.pipe(map(x => x.currentRound.categories)); }

    // public readonly categories$: Observable<ReadonlyArray<ICategoryDto>> =
    //     from(this._matchesService.getCategoriesAsync(Language.Italian/*, AlphabetFamily.Latin*/))
    //         .pipe(
    //             map(value => x
    //                 .filter((cat, index) => index % 2 === 0)
    //                 .filter((cat, index) => index < 10)),
    //             shareReplay()
    //         );
}
