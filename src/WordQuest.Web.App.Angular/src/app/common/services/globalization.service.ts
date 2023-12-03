import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Language } from '../../root/models/culture.DTOs';
import { shareReplayChangeLog } from '../utils/debug/rxjs';
import { storeIn } from '../utils/rxjs/rxjs.utils';
import { isNotNil } from '../utils/utils';
import { NcbApiService } from './ncb-api.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalizationService extends NcbApiService {

    constructor(http: HttpClient) {
        super(http);

        this.subscribe([
            this.languages$,
            this.areLanguagesAvailable$,
            this.selectedLanguage$,
        ]);
    }

    private getAvailableLanguages(): ReadonlySet<Language> {
        return new Set<Language>([
            { id: 1033, nativeName: 'English' },
            { id: 1040, nativeName: 'Italiano' }
        ]);
    }

    private readonly _languages$$ = new BehaviorSubject<ReadonlySet<Language>>(new Set());
    public get languages() { return this._languages$$.value; }
    public readonly languages$ = of(this.getAvailableLanguages()).pipe(
        storeIn(() => this._languages$$),
        shareReplayChangeLog(this, 'languages'));

    private readonly _areLanguagesAvailable$$ = new BehaviorSubject<boolean>(isNotNil(this.languages) && this.languages.size > 0);
    public get areLanguagesAvailable() { return this._areLanguagesAvailable$$.value; }
    public readonly areLanguagesAvailable$ = this.languages$.pipe(
        map(langs => isNotNil(langs) && langs.size > 0),
        storeIn(() => this._areLanguagesAvailable$$),
        shareReplayChangeLog(this, 'areLanguagesAvailable'));

    private readonly _selectedLanguage$$ = new BehaviorSubject<Language | undefined>(undefined);
    public readonly selectedLanguage$ = this._selectedLanguage$$.asObservable();
    public set selectedLanguage(value: Language | undefined) { this._selectedLanguage$$.next(value); }
    public get selectedLanguage() { return this._selectedLanguage$$.value; }
    public selectLanguage(language: Language) { this._selectedLanguage$$.next(language); }

    private readonly _isLanguageSelected$$ = new BehaviorSubject<boolean>(this.selectedLanguage != null);
    public get isLanguageSelected() { return this._isLanguageSelected$$.value; }
    public readonly isLanguageSelected$ = this.selectedLanguage$.pipe(
        map(value => value != null),
        storeIn(() => this._isLanguageSelected$$),
        shareReplayChangeLog(this, 'isLanguageSelected'));
}
