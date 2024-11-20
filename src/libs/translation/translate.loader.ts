import {
  HttpClient,
  HttpErrorResponse,
  HttpXhrBackend,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { EMPTY, Observable, catchError } from 'rxjs';
import { environment } from '../../environments';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private ENVIRONMENT = environment;

  private http = new HttpClient(
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    new HttpXhrBackend({ build: () => new XMLHttpRequest() })
  );

  public constructor() {}

  public getTranslation(lang: string): Observable<Translation> {
    return this.fetchLanguageFromBackend(lang).pipe(
      catchError((e: HttpErrorResponse) => {
        return EMPTY;
      })
    );
  }

  private fetchLanguageFromBackend(lang: string): Observable<Translation> {
    return this.http
      .get<Translation>(`${this.ENVIRONMENT.ASSET_PATH}/i18n/${lang}.json`)
      .pipe(
        catchError(() => {
          return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
        })
      );
  }
}
