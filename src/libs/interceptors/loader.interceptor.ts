// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Inject, Injectable } from '@angular/core';
// import { Env, SHOW_UNIVERSAL_LOADER } from '@halo-shared';
// import { Observable, finalize } from 'rxjs';
// import { HaloLoaderNames, HaloLoaderService } from '../..';

// @Injectable()
// export class LoaderInterceptor implements HttpInterceptor {
//   public constructor(
//     @Inject('ENVIRONMENT') private ENVIRONMENT: Env,
//     private loaderService: HaloLoaderService
//   ) {}

//   public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     if (
//       (request.url.includes(this.ENVIRONMENT.API_URL) || request.url.includes(this.ENVIRONMENT.API_GEE_CMS_URL)) &&
//       request.context.get(SHOW_UNIVERSAL_LOADER)
//     ) {
//       this.loaderService.setLoader({ isLoading: true, name: HaloLoaderNames.global });
//       return next
//         .handle(request)
//         .pipe(finalize(() => this.loaderService.setLoader({ isLoading: false, name: HaloLoaderNames.global })));
//     }
//     return next.handle(request);
//   }
// }