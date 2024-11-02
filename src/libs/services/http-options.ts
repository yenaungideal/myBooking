import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface HttpOptions{
    headers?:
    | HttpHeaders
    | {
        [header: string] : string | string[];
    };
    context?: HttpContext;
    params?:
    | HttpParams
    | {
        [param: string] : string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    body?: any | null;
}