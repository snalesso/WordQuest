import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment.dev';

@Injectable()
export abstract class NcbApiService {

    private readonly ApiAddress: string = environment.api.getHostAddress();

    constructor(protected readonly _http: HttpClient) { }

    protected getEndpoint(...routeSteps: string[]): string {
        return [this.ApiAddress, ...routeSteps].join("/");
    }

    // public get<T>(...endpoint: string[]) {
    //     return this._http.get<T>(endpoint.join('/'));
    // }
}