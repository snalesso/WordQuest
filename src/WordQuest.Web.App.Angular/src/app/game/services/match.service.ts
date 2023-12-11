import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NcbApiService } from 'src/app/shared/services/ncb-api.service';
import { isNotNil } from 'src/app/shared/utils/utils';
import { MatchSnapshot } from '../models/game.DTOs';

@Injectable({
    providedIn: 'root'
})
export class MatchService extends NcbApiService {

    private readonly _hubConnectionBuilder: signalR.HubConnectionBuilder = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/MatchHub");
    private _matchHubConnection: signalR.HubConnection | undefined = undefined;

    constructor(http: HttpClient) {
        super(http);
    }

    private readonly _matchSnapshot$$ = new ReplaySubject<MatchSnapshot>(1);
    // public set matchSnapshot(value) { this._matchSnapshot$$.next(value); }
    // public get matchSnapshot() { return this._matchSnapshot$$.value; }
    public readonly matchSnapshot$ = this._matchSnapshot$$.asObservable();
    public readonly isMatchJoined$ = this.matchSnapshot$.pipe(map(isNotNil));
    public readonly currentMatchId$ = this.matchSnapshot$.pipe(map(x => x.id));

    private get isConnected() {
        return !!this._matchHubConnection && this._matchHubConnection.state === signalR.HubConnectionState.Connected;
    }

    private async connectAsync() {

        this._matchHubConnection ??= this._hubConnectionBuilder.build();

        if (this.isConnected)
            return true;

        const res = await this._matchHubConnection.start()
            .then(success => {
                return true;
            })
            .catch(rejection => {
                return false;
            });

        return res;
    }

    private async dispatchToHubAsync<T>(asyncAction: (isc: boolean) => Promise<T>) {

        var isConnected = await this.connectAsync();
        const delegatedPromise = asyncAction(isConnected);
        return delegatedPromise;
    }

    public async terminateAsync() {

        return this.dispatchToHubAsync(
            async (isConnected) => {

                if (isConnected)
                    return await this._matchHubConnection?.invoke<boolean>("Terminate");

                return true;
            }
        );
    }
}
