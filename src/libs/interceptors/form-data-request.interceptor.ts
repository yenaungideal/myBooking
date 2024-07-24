import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FormDataRequestInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newReq = request;
    if (request.body instanceof File || request.body instanceof FormData) {
      newReq = request.clone({
        headers: new HttpHeaders() // clear header for form data payload
      });
    }
    return next.handle(newReq);
  }
}