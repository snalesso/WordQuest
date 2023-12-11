import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { ReactiveObject } from "../components/ReactiveObject";

@Injectable()
export abstract class NcbApiService extends ReactiveObject {

    private readonly _apiHostAddress: string = environment.api.getHostAddress();

    constructor(protected readonly _http: HttpClient) { super() }

    protected getEndpoint(...routeSteps: string[]): string {
        return [this._apiHostAddress, ...routeSteps].join("/");
    }

    // public get<T>(...endpoint: string[]) {
    //     return this._http.get<T>(endpoint.join('/'));
    // }
}