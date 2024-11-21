import {
  EnvironmentProviders,
  importProvidersFrom,
  isDevMode,
  makeEnvironmentProviders,
} from '@angular/core';
import {
  TranslocoConfig,
  TranslocoModule,
  TranslocoPipe,
  TranslocoService,
  provideTransloco,
} from '@jsverse/transloco';

import { TRANSL_LANGS } from './translate-languages';
import { TranslocoHttpLoader } from './translate.loader';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';

/** INFO: custom wrapper to provide transloco base config */
export function translationProvider(): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(TranslocoModule),
    TranslocoService,
    TranslateService,
    TranslatePipe,
    TranslocoPipe,
    provideTransloco({
      config: {
        availableLangs: TRANSL_LANGS,
        defaultLang: 'en',
        fallbackLang: 'en',
        failedRetries: 1,
        missingHandler: {
          // It will use the first language set in the fallbackLang property
          useFallbackTranslation: true,
          logMissingKey: true,
        },
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      } as TranslocoConfig,
      loader: TranslocoHttpLoader,
    }),
  ]);
}
