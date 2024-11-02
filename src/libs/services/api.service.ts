import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOptions } from './http-options';

@Injectable({ providedIn: 'root' })
export class ApiService {
  public constructor(public http: HttpClient) {}

  public get<T>(url: string, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.get<T>(url, httpOptions);
  }

  public post<T>(url: string, data: string, httpOptions: HttpOptions = {}): Observable<T> {
    return this.post2<T, string>(url, data, httpOptions);
  }

  public post2<T, D>(url: string, data: D, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.post<T>(url, data, httpOptions);
  }

  public put<T>(url: string, data: string, httpOptions: HttpOptions = {}): Observable<T> {
    return this.put2<T, string>(url, data, httpOptions);
  }

  public put2<T, D>(url: string, data: D, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.put<T>(url, data, httpOptions);
  }

  public patch<T>(url: string, data: string, httpOptions: HttpOptions = {}): Observable<T> {
    return this.patch2<T, string>(url, data, httpOptions);
  }

  public patch2<T, D>(url: string, data: D, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.patch<T>(url, data, httpOptions);
  }

  public delete<T, D>(url: string, httpOptions: HttpOptions = {}): Observable<T> {
    return this.http.delete<T>(url, httpOptions);
  }
}