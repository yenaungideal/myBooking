import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  enableProdMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpInterceptorProviders } from '../libs/interceptors';
import { translationProvider } from '../libs/translation';
import { environment } from '../environments';

if (environment.PRODUCTION) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    translationProvider(),
    httpInterceptorProviders,
    { provide: 'ENVIRONMENT', useValue: environment },
  ],
};
