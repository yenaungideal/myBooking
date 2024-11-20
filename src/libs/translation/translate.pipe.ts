import { Pipe, PipeTransform, inject } from '@angular/core';
import { HashMap, TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { take } from 'rxjs';
import { trxFindMatch } from './find-match';
import { TranslocoHttpLoader } from './translate.loader';

@Pipe({
  name: 'trx',
  standalone: true,
  pure: false,
})
export class TranslatePipe extends TranslocoPipe implements PipeTransform {
  private _service = inject(TranslocoService);
  private _translationloader = inject(TranslocoHttpLoader);

  public override transform(
    key: string,
    params?: HashMap | undefined,
    inlineLang?: string | undefined
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

      return super.transform(fullKey || key, params, inlineLang);
    }
    return key;
  }
}
