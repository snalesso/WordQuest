import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    constructor() { }

    public log(level: 'info' | 'error' | 'warning', ...data: any): Observable<void> {
        return throwError(() => new Error(`Not implemented.`));
    }
}