import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';
import { Language } from '../../root/models/culture.DTOs';
import { NcbApiService } from './ncb-api.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalizationService extends NcbApiService {

    constructor(http: HttpClient) { super(http); }

    private getAvailableLanguages() {
        return of<ReadonlySet<Language>>(
            new Set<Language>(
                [
                    {
                        id: 1033,
                        nativeName: 'English'
                    },
                    {
                        id: 1040,
                        nativeName: 'Italiano'
                    }
                ]));
        // return this.http
        //     .get<ReadonlySet<Language>>(this.getEndpoint("GetLanguageOptions"))
        //     .pipe(
        //         catchError((error: HttpErrorResponse) => {
        //             const emptyLangs = new Set<Language>();
        //             return of<ReadonlySet<Language>>(emptyLangs);
        //         }));
    }

    private readonly _languages$$ = new ReplaySubject<ReadonlySet<Language>>(1);
    public readonly languages$ = this.getAvailableLanguages()
        .pipe(
            multicast(() => this._languages$$),
            refCount());

    // private readonly _availableLanguagesMap$$ = new ReplaySubject<ReadonlyMap<Language['id'], Language>>(1);
    // public readonly availableLanguagesMap$ = this.getAvailableLanguages()
    //     .pipe(
    //         multicast(languages => this._availableLanguages$$),
    //         map(languages => {
    //             const map = new Map<Language['id'], Language>();
    //             for (const language of languages) {
    //                 map.set(language.id, language);
    //             }
    //             return map;
    //         }),
    //         multicast(() => this._availableLanguagesMap$$),
    //         refCount());

    // private readonly _selectedLanguage$$ = new ReplaySubject<Language>(1);
    private readonly _selectedLanguage$$ = new BehaviorSubject<Language | undefined>(undefined);
    public readonly selectedLanguage$ = this._selectedLanguage$$.asObservable();
    public set selectedLanguage(value: Language | undefined) { this._selectedLanguage$$.next(value); }
    public get selectedLanguage() { return this._selectedLanguage$$.value; }
    public setlanguage(language: Language) {
        // TODO: download & set language
        this._selectedLanguage$$.next(language);
    }
    // private readonly _firstAvailableLanguage$ = this.availableLanguages$.pipe(map(langs => langs[0]));
}
