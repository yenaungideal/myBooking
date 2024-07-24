// import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Inject, Injectable } from '@angular/core';
// import { AuthService } from '@halo-data-access';
// import { Env } from '@halo-shared';
// import { Observable, from, switchMap } from 'rxjs';
// import { BaseRequestInterceptor } from './base-request.interceptor';

// @Injectable()
// export class AuthorizeRequestInterceptor extends BaseRequestInterceptor {
//   public constructor(
//     @Inject('ENVIRONMENT') protected override ENVIRONMENT: Env,
//     // private authService: AuthService
//   ) {
//     super(ENVIRONMENT);
//     this.allowedServicePaths = ['/halo-core-service/', '/lfcms/halo/v5/'];
//   }

//   public override intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     if (this.checkAllowedService(request.url)) {
//     //   if (!this.authService.isAuthenticated) throw 'Unauthorized request.';
//       return from(this.authService.getToken()).pipe(
//         switchMap((token) => {
//           const newReq = request.clone({
//             headers: request.headers.set('Authorization', `Bearer ${token}`)
//           });
//           return next.handle(newReq);
//         })
//       );
//     } else return next.handle(request);
//   }
// }