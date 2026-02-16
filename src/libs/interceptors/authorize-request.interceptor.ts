import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';

import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from '../../data-access/auth';
import { Env } from '../../environments';
import { BaseRequestInterceptor } from './base-request.interceptor';

@Injectable()
export class AuthorizeRequestInterceptor extends BaseRequestInterceptor {
  private authService = inject(AuthService);
  public constructor(
    @Inject('ENVIRONMENT') protected override ENVIRONMENT: Env
  ) {
    super(ENVIRONMENT);
    this.allowedServicePaths = ['/halo-core-service/', '/lfcms/halo/v5/'];
  }

  public override intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.checkAllowedService(request.url)) {
      if (!this.authService.isAuthenticated) {
        throw new Error('Unauthorized request - user not authenticated.');
      }

      const token = this.authService.getToken();
      if (!token) {
        throw new Error('Unauthorized request - no authentication token available.');
      }

      return from(Promise.resolve(token)).pipe(
        switchMap((authToken) => {
          const newReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${authToken}`),
          });
          return next.handle(newReq);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
