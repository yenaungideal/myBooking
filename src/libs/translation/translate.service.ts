import { inject, Injectable } from '@angular/core';
import {
  HashMap,
  TranslateParams,
  Translation,
  TranslocoScope,
  TranslocoService,
} from '@jsverse/transloco';
import { Observable, take } from 'rxjs';
import { trxFindMatch } from './find-match';
import { TranslocoHttpLoader } from './translate.loader';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private _service = inject(TranslocoService);
  private _translationloader = inject(TranslocoHttpLoader);

  /* Usage as below ...
    const streamingCount = 100; 
    this.traslateService.instant('streaming.message',{streamingCount});
    Streaming Message Declaration as below ...
    'streaming.message' : 'Enabled Streaming , total streaming count {{streamingCount}}'
  */
  public instant(
    key: string,
    params?: HashMap | undefined,
    lang?: string | undefined
  ): string {
    const currentLang = this._service.getActiveLang();
    const translationsMap = this._service.getTranslation();
    if (!translationsMap.size) {
      this._translationloader
        .getTranslation(currentLang)
        .pipe(take(1))
        .subscribe((translations) => {
          this._service.setTranslation(translations);
        });
    }

    if (translationsMap.size) {
      const translationObj = translationsMap.get(currentLang);

      const fullKey = Object.keys(translationObj || {}).find((k) =>
        trxFindMatch(k, key)
      );

      const translation = this._service.translate(fullKey || key, params, lang);
      return translation;
    }
    return key;
  }

  public selectTranslate<T = any>(
    key: TranslateParams,
    params?: HashMap | undefined,
    lang?: TranslocoScope | TranslocoScope[],
    _isObject?: boolean | undefined
  ): Observable<T> {
    return this._service.selectTranslate(key, params, lang, _isObject);
  }

  public getActiveLang(): string {
    return this._service.getActiveLang();
  }

  public getTranslation(): Map<string, Translation> {
    return this._service.getTranslation();
  }

  public setTranslation(translations: Translation): void {
    this._service.setTranslation(translations);
  }
}
