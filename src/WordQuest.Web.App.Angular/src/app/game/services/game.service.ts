import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';
import { NcbApiService } from 'src/app/common/services/ncb-api.service';
import { delayInDev } from 'src/app/common/utils/dev.utils';
import { AlphabetVariant, AlphabetVariantOption, Char, CharMetadata, Language } from 'src/app/root/models/culture.DTOs';
import { CategoryOption, MatchSettings, MatchSnapshot } from '../models/game.DTOs';

@Injectable({
  providedIn: 'root'
})
// TODO: rename to MatchCreationService
export class GameService extends NcbApiService {

  constructor(http: HttpClient) { super(http); }

  public async getMatchDefaultSettingsAsync() {
    return throwError(() => new Error("Not implemented"));
  }

  public getCategoryOptionsAsync(/*languageId: Language["id"],*/ alphabetVariantId: AlphabetVariant["id"]) {

    let queryParams: HttpParams = new HttpParams();
    /*if (!!languageId)
      queryParams = queryParams.append("languageId", "" + languageId);*/
    if (!!alphabetVariantId)
      queryParams = queryParams.append("alphabetVariantId", alphabetVariantId.toString());

    return this._http.get<readonly CategoryOption[]>(this.getEndpoint("GetCategoryOptions"), { params: queryParams }).pipe(
      delayInDev(),
      //   map(categs => {
      //     return categs;
      //   }),
      //   catchError(err => EMPTY)
    );
  }

  // public getAlphabetOptionsAsync() {
  //   return this.http.get<readonly Alphabet[]>(this.getEndpoint("GetAlphabetOptions"))
  //     .pipe(
  //       forceDelayInDev(3000),
  //       // map(alphabets => new Set(alphabets) as ReadonlySet<Alphabet>),
  //       // tap(value => logEvent(this, 'alphabet options', value)),
  //       //   catchError(error => EMPTY))
  //     );
  // }

  public getAlphabetVariantOptionsAsync() {
    return this._http.get<readonly AlphabetVariantOption[]>(this.getEndpoint("GetAlphabetVariantOptions")).pipe(
      delayInDev(),
      // map(alphabets => new Set(alphabets) as ReadonlySet<Alphabet>),
      // tap(value => logEvent(this, 'alphabet options', value)),
      //   catchError(error => EMPTY))
    );
  }

  public getAlphabetVariantCharOptionsAsync(alphabetVariantId: AlphabetVariant['id']) {

    let queryParams: HttpParams = new HttpParams();
    if (!!alphabetVariantId) queryParams = queryParams.append("alphabetVariantId", alphabetVariantId.toString());
    return this._http.get<readonly CharMetadata[]>(this.getEndpoint("GetAlphabetVariantCharOptions"), { params: queryParams }).pipe(
      delayInDev(),
      map(charMetadataMap => {
        const map = new Map<Char, CharMetadata>();
        const entries = Object.entries(charMetadataMap) as [Char, CharMetadata][];
        for (const [key, value] of entries) {
          map.set(key, value);
        }
        return map as ReadonlyMap<Char, CharMetadata>;
      }),
      // tap(value => logEvent(this, 'alphabet options', value)),
      //   catchError(error => EMPTY))
    );
  }

  public getLanguageOptionsAsync() {
    return this._http.get<ReadonlySet<Language>>(this.getEndpoint("GetLanguageOptions")).pipe(
      delayInDev(),
      // catchError(err => EMPTY)
    );
  }

  public createMatchAsync(settings: MatchSettings) { return of("NEhnXXf78is"); }

  public joinAsync(matchId: MatchSnapshot["id"]): Observable<MatchSnapshot> {
    return throwError(() => new Error('Not implemented'));
  }
}
