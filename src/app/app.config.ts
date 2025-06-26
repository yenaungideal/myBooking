import {
  ApplicationConfig,
  enableProdMode,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withInterceptorsFromDi,
  withJsonpSupport,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments';
import { httpInterceptorProviders } from '../libs/interceptors';
import { translationProvider } from '../libs/translation';
import { routes } from './app.routes';

if (environment.PRODUCTION) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
    provideRouter(routes),
    provideAnimationsAsync(),
    translationProvider(),
    httpInterceptorProviders,
    // provideTanStackQuery(
    //   new QueryClient({
    //     defaultOptions: {
    //       queries: {
    //         staleTime: 10 * (60 * 1000), // 10 mins
    //         gcTime: 15 * (60 * 1000), // 15 mins
    //       },
    //     },
    //   })
    // ),
    { provide: 'ENVIRONMENT', useValue: environment },
  ],
};
