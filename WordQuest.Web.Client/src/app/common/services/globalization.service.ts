import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, iif, Observable, of } from 'rxjs';
import { map, shareReplay, startWith, withLatestFrom } from 'rxjs/operators';
import { Language, LanguagesDict } from '../../root/models/culture.DTOs';
import { NcbApiService } from './ncb-api.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalizationService extends NcbApiService {

    constructor(http: HttpClient) { super(http); }

    private getAvailableLanguages() {
        return this.http.get<LanguagesDict>(this.getEndpoint("GetLanguages"));
    }

    public readonly availableLanguagesMap$ = from(this.getAvailableLanguages()).pipe(shareReplay(1));
    public readonly availableLanguages$ = this.availableLanguagesMap$.pipe(
        map(x => Object.values(x)),
        shareReplay(1));

    private readonly _selectedLanguage$$: BehaviorSubject<Language> = new BehaviorSubject<Language>(null);
    private readonly _firstAvailableLang$ = this.availableLanguagesMap$.pipe(
        map(langsDict => {
            const langs = Object.entries(langsDict);
            return langs.length > 0 ? langs[0][1] : null;
        }));
    public get language$() { return this._selectedLanguage$$; }

    public setlanguage(language: Language) {
        this._selectedLanguage$$.next(language);
    }
}
