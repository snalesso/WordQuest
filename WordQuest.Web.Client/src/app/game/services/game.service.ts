import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Dictionary } from 'src/app/root/models/core';
import { Alphabet, AlphabetsDict, Language, LanguagesDict } from 'src/app/root/models/culture.DTOs';
import { NcbApiService } from 'src/app/common/services/ncb-api.service';
import { CategoryDto, CategoryHeaderDto, CategoryHeadersDict, MatchSettingsDto, MatchSnapshot } from '../models/game.DTOs';

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

    return this.http.get<CategoryHeadersDict>(this.getEndpoint("GetCategories"), { params: queryParams }).pipe(
      map(categs => {
        return categs;
      }),
      catchError(err => of<CategoryHeadersDict>(null))
    );
  }

  public getAlphabetsAsync() {
    return this.http.get<AlphabetsDict>(this.getEndpoint("GetAlphabets"));
  }

  public getLanguagesAsync() {
    return this.http.get<LanguagesDict>(this.getEndpoint("GetLanguages")).pipe(
      map(langChars => langChars),
      catchError(err => of<LanguagesDict>(null))
    );
  }
}
