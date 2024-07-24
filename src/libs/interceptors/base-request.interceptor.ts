import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Env } from '../../environments/index'
import { Observable } from 'rxjs';

@Injectable()
export class BaseRequestInterceptor implements HttpInterceptor {
  protected allowedServicePaths: string[] | '*' = '*';
  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newReq = request;
    if (!request.url.includes('://')) {
      // do not append API URL if domain is already provided
      newReq = request.clone({
        url: `${this.ENVIRONMENT.API_URL}${request.url}`,
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
    }

    return next.handle(newReq);
  }

  protected checkAllowedService(url: string): boolean {
    return this.allowedServicePaths === '*' || this.allowedServicePaths?.some((a) => url.includes(a));
  }
}