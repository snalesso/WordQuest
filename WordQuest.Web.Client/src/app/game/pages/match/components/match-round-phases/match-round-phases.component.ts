import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { MatchSettingsDto } from 'src/app/game/models/game.DTOs';
import { MatchService } from 'src/app/game/services/match.service';

@Component({
    selector: 'app-match-round-phases',
    templateUrl: './match-round-phases.component.html',
    styleUrls: ['./match-round-phases.component.scss']
})
export class MatchRoundPhasesComponent extends ReactiveComponent {

    constructor(
        private readonly _matchService: MatchService,
        changeDetectorRef: ChangeDetectorRef) {

        super(changeDetectorRef);
    }

    public get currentRound$() { return this._matchService.matchSnapshot$.pipe(map(x => x.currentRound)); }

}
