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
import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';

if (environment.PRODUCTION) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi(),withJsonpSupport()),
    provideRouter(routes),
    provideAnimationsAsync(),
    translationProvider(),
    httpInterceptorProviders,
    provideAngularQuery(new QueryClient()),
    { provide: 'ENVIRONMENT', useValue: environment },
  ],
};
