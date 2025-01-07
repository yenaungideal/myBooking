import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizeRequestInterceptor } from './authorize-request.interceptor';
import { BaseRequestInterceptor } from './base-request.interceptor';
import { FormDataRequestInterceptor } from './form-data-request.interceptor';
import { LoaderInterceptor } from './loader.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseRequestInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizeRequestInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FormDataRequestInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
];
