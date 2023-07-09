import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { MatchService } from 'src/app/game/services/match.service';

@Component({
    selector: 'app-match-round-phases',
    templateUrl: './match-round-phases.component.html',
    styleUrls: ['./match-round-phases.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchRoundPhasesComponent extends ReactiveComponent {

    constructor(
        cdr: ChangeDetectorRef,
        private readonly _matchService: MatchService) {
        super(cdr);
    }

    public get currentRound$() { return this._matchService.matchSnapshot$.pipe(map(x => x.currentRound)); }

}
