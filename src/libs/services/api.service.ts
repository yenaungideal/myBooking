import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOptions } from './http-options';

/**
 * Wrapper service for Angular HttpClient with type-safe methods
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  public get<T>(url: string, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.get<T>(url, httpOptions);
  }

  public post<T, D = unknown>(url: string, data: D, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.post<T>(url, data, httpOptions);
  }

  public put<T, D = unknown>(url: string, data: D, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.put<T>(url, data, httpOptions);
  }

  public patch<T, D = unknown>(url: string, data: D, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.patch<T>(url, data, httpOptions);
  }

  public delete<T>(url: string, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.delete<T>(url, httpOptions);
  }
}