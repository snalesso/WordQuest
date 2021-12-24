import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, NEVER, Observable, of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Alphabet, Language } from 'src/app/root/models/culture.DTOs';
import { NcbApiService } from 'src/app/common/services/ncb-api.service';
import { CategoryDto, CategoryHeaderDto, MatchSettingsDto, MatchSnapshot } from '../models/game.DTOs';

@Injectable({
  providedIn: 'root'
})
export class GameService extends NcbApiService {

  constructor(http: HttpClient) { super(http); }

  public async getMatchDefaultSettingsAsync() { return of("Not implemented"); }

  public getCategoryHeadersAsync(languageId: Language["id"], alphabetId: Alphabet["id"]) {

    let queryParams: HttpParams = new HttpParams();
    if (!!languageId)
      queryParams = queryParams.append("languageId", "" + languageId);
    if (!!alphabetId)
      queryParams = queryParams.append("alphabetId", "" + alphabetId);

    return this.http.get<ReadonlyArray<CategoryHeaderDto>>(this.getEndpoint("GetCategories"), { params: queryParams })
      // .pipe(
      //   map(categs => {
      //     return categs;
      //   }),
      //   catchError(err => EMPTY))
      ;
  }

  public getAlphabetsAsync() {
    return this.http.get<ReadonlyArray<Alphabet>>(this.getEndpoint("GetAlphabets"))
      // .pipe(
      //   catchError(error => EMPTY))
      ;
  }

  public getLanguagesAsync() {
    return this.http.get<ReadonlyArray<Language>>(this.getEndpoint("GetLanguages"))
      // .pipe(
      //   catchError(err => EMPTY))
      ;
  }

  public createMatchAsync(settings: MatchSettingsDto) { return of("NEhnXXf78is"); }

  public joinAsync(matchId: MatchSnapshot["id"]): Observable<MatchSnapshot> {
    return of(null);
  }
}
