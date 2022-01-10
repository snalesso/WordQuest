import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { MatchSettingsDto } from 'src/app/game/models/game.DTOs';
import { MatchService } from 'src/app/game/services/match.service';

@Component({
    selector: 'app-match-round',
    templateUrl: './match-round.component.html',
    styleUrls: ['./match-round.component.scss']
})
export class MatchRoundComponent extends ReactiveComponent {

    constructor(
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _matchService: MatchService,
        changeDetectorRef: ChangeDetectorRef
    ) {

        super(changeDetectorRef);
    }

    private _matchSettings$$ = new BehaviorSubject<MatchSettingsDto>(null);
    @Input()
    public set matchSettings(value) { this._matchSettings$$.next(value); }
    public get matchSettings() { return this._matchSettings$$.value; }
    public get matchSettings$() { return this._matchSettings$$.asObservable(); }

    public get currentRound$() { return this._matchService.matchSnapshot$.pipe(map(x => x.currentRound)) }
}
