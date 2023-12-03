import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, throwError } from "rxjs";

export interface IDialogConfig {
    readonly title: string;
    readonly message: string;
}
export interface IDialogChoiceButton<T> {
    readonly label: string;
    readonly getValue: () => Observable<T>;
}
export interface IChoiceDialogConfig<T> {
    readonly title: string;
    readonly message: string;
    readonly buttons: readonly IDialogChoiceButton<T>[];
}
export interface IFormDialogConfig<TForm extends FormGroup, TDialogResult> {
    readonly title: string;
    readonly form: TForm;
    readonly submit: (form: TForm) => Observable<TDialogResult>;
}

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor() { }

    public showMessage(config: IDialogConfig): Observable<void> {
        return throwError(() => new Error(`Not implemented.`));
    }

    public showChoice<TResult>(config: IChoiceDialogConfig<TResult>): Observable<TResult> {
        return throwError(() => new Error(`Not implemented.`));
    }

    public showForm<TForm extends FormGroup, TResult>(config: IFormDialogConfig<TForm, TResult>): Observable<TResult> {
        return throwError(() => new Error(`Not implemented.`));
    }
}