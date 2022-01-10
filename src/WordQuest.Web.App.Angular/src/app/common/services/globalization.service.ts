import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, defer, EMPTY, from, iif, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Language } from '../../root/models/culture.DTOs';
import { NcbApiService } from './ncb-api.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalizationService extends NcbApiService {

    constructor(http: HttpClient) { super(http); }

    private getAvailableLanguages() {
        return this.http.get(this.getEndpoint("GetLanguageOptions"));
    }

    // public readonly availableLanguagesMap$ = from(this.getAvailableLanguages()).pipe(shareReplay(1));
    public readonly availableLanguages$ = defer(() => this.getAvailableLanguages()).pipe(shareReplay(1));

    private readonly _firstAvailableLanguage$ = this.availableLanguages$.pipe(map(langs => langs?.[0][1]));

    private readonly _selectedLanguage$$: BehaviorSubject<Language> = new BehaviorSubject<Language>(null);
    public readonly selectedLanguage$ = this._selectedLanguage$$.asObservable();
    // public set selectedLanguage(value: Language) { this._selectedLanguage$$.next(value); }
    // public get selectedLanguage() { return this._selectedLanguage$$.value; }
    public async setlanguageAsync(language: Language) {
        // TODO: download & set language
        this._selectedLanguage$$.next(language);
    }
}
