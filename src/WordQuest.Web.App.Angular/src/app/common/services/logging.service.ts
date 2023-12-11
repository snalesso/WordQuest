import { Injectable } from "@angular/core";
import { Observable, defer, throwError } from "rxjs";
import { fromVoid } from "../utils/rxjs.utils";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    constructor() { }

    public log(level: 'info' | 'error' | 'warning', ...data: any): Observable<void> {
        switch (level) {
            case 'info':
                return defer(() => {
                    console.info(...data);
                    return fromVoid();
                });
            case 'warning':
                return defer(() => {
                    console.warn(...data);
                    return fromVoid();
                });
            case 'info':
                return defer(() => {
                    console.info(...data);
                    return fromVoid();
                });
            default:
                return throwError(() => new Error(`Not implemented.`));
        }
    }
}