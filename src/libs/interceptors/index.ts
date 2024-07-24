import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BaseRequestInterceptor } from "./base-request.interceptor";
import { FormDataRequestInterceptor } from "./form-data-request.interceptor";

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: BaseRequestInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: FormDataRequestInterceptor, multi:true},
]