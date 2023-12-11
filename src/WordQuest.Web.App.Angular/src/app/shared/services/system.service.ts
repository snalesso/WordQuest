import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NcbApiService } from "./ncb-api.service";

@Injectable({
    providedIn: 'root'
})
export class SystemService extends NcbApiService {

    constructor(http: HttpClient) { super(http); }

    public getSystemInfo() {
        return this._http.get<Date>(this.getEndpoint('GetSystemInfo'));
    }
}