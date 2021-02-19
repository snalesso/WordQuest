import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class NcbApiService {

    private readonly ApiAddress: string = "http://localhost:7071/api";

    constructor(protected readonly http: HttpClient) { }

    protected getEndpoint(...routeSteps: string[]): string {
        return [this.ApiAddress, ...routeSteps].join("/");
    }

    // public get<T>(...endpoint: string[]) {
    //     return this._http.get<T>(endpoint.join('/'));
    // }
}