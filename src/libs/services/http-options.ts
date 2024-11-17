import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  context?: HttpContext;
  params?:
    | HttpParams
    | Record<
        string,
        string | number | boolean | readonly (string | number | boolean)[]
      >;
  body?: any | null;
}
