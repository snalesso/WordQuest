import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

export interface INotification {
    type: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor() { }

    public show(data: INotification): Observable<void> {
        return throwError(() => new Error(`Not implemented.`));
    }
}