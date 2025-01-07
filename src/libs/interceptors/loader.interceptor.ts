import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Env } from '../../environments';
import { LoaderService } from '../services';
import { SHOW_UNIVERSAL_LOADER } from '../types';
import { LoaderNames } from '../types/loader-names.enum';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  public constructor(
    @Inject('ENVIRONMENT') private ENVIRONMENT: Env,
    private loaderService: LoaderService
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes(this.ENVIRONMENT.API_URL) &&
      request.context.get(SHOW_UNIVERSAL_LOADER)
    ) {
      this.loaderService.setLoader({
        isLoading: true,
        name: LoaderNames.global,
      });
      return next
        .handle(request)
        .pipe(
          finalize(() =>
            this.loaderService.setLoader({
              isLoading: false,
              name: LoaderNames.global,
            })
          )
        );
    }
    return next.handle(request);
  }
}
