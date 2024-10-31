import { HttpParams } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { ApiInfiniteData, ApiInfiniteQueryResult, ApiQueryResult, IApiPageParam, IApiTableData } from './../types/index';
import {
  CreateInfiniteQueryResult,
  InfiniteData,
  QueryClient,
  QueryKey,
  injectInfiniteQuery,
  injectMutation,
  injectQuery,
  injectQueryClient
} from '@tanstack/angular-query-experimental';
import { Observable, fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { ApiService } from '.';
import { HttpOptions } from './http-options';

@Injectable({ providedIn: 'root' })
export class ApiCacheService {
  protected readonly http = inject(ApiService);

  public getQuery<T>(
    url: string,
    queryKey: readonly unknown[],
    injector: Injector,
    httpOptions: HttpOptions = {}
  ): ApiQueryResult<T> {
    return injectQuery(
      () => ({
        queryKey: queryKey,
        queryFn: async (context) => {
          const abort$ = fromEvent(context.signal, 'abort');
          return lastValueFrom(this.http.get<T>(url, httpOptions).pipe(takeUntil(abort$)));
        }
      }),
      injector
    );
  }

  public getInfiniteQuery<T>(
    url: string,
    pageParam: IApiPageParam,
    queryKey: readonly unknown[],
    injector: Injector,
    httpOptions: HttpOptions = {}
  ): ApiInfiniteQueryResult<ApiInfiniteData<IApiTableData<T>, number>, Error> {
    return this.infiniteQuery(
      (params: HttpParams) => {
        return this.http.get<IApiTableData<T>>(url, { ...httpOptions, params });
      },
      pageParam,
      queryKey,
      injector
    );
  }

  public postInfiniteQuery<T, D, G>(
    url: string,
    data: D,
    pageParam: IApiPageParam,
    queryKey: readonly unknown[],
    injector: Injector,
    httpOptions: HttpOptions = {}
  ): ApiInfiniteQueryResult<ApiInfiniteData<IApiTableData<T>, number>, Error> {
    return this.infiniteQuery<T, G>(
      (params: HttpParams) => {
        return this.http.post<G>(url, JSON.stringify(data), { ...httpOptions, params });
      },
      pageParam,
      queryKey,
      injector
    );
  }

  public postQuery<T, D>(
    url: string,
    data: D,
    queryKey: readonly unknown[],
    injector: Injector,
    httpOptions: HttpOptions = {}
  ): ApiQueryResult<T> {
    return injectQuery(
      () => ({
        queryKey: queryKey,
        queryFn: async (context) => {
          const abort$ = fromEvent(context.signal, 'abort');
          return lastValueFrom(this.http.post<T>(url, JSON.stringify(data), httpOptions).pipe(takeUntil(abort$)));
        }
      }),
      injector
    );
  }

  public post<T, D>(
    url: string,
    data: D,
    queryKeys: QueryKey[],
    injector: Injector,
    httpOptions: HttpOptions = {}
  ): Promise<T> {
    return this.mutate(data, this.http.post<T>(url, JSON.stringify(data), httpOptions), queryKeys, injector);
  }

  public post2<T, D>(
    url: string,
    data: D,
    queryKeys: QueryKey[],
    injector: Injector,
    httpOptions: HttpOptions = {}
  ): Promise<T> {
    return this.mutate(data, this.http.post2<T, D>(url, data, httpOptions), queryKeys, injector);
  }

  public put<T, D>(
    url: string,
    data: D,
    queryKeys: QueryKey[],
    injector?: Injector,
    httpOptions: HttpOptions = {}
  ): Promise<T> {
    return this.mutate(data, this.http.put<T>(url, JSON.stringify(data), httpOptions), queryKeys, injector);
  }

  public put2<T, D>(
    url: string,
    data: D,
    queryKeys: QueryKey[],
    injector: Injector,
    httpOptions: HttpOptions = {},
    refetchType = 'active' as any,
    successCallback?: (client: QueryClient, queryKeys: QueryKey[], refetchType: any, data: any) => void
  ): Promise<T> {
    return this.mutate(
      data,
      this.http.put2<T, D>(url, data, httpOptions),
      queryKeys,
      injector,
      refetchType,
      successCallback
    );
  }

  public patch<T>(
    url: string,
    data: string,
    queryKeys: QueryKey[],
    injector: Injector,
    httpOptions: HttpOptions = {}
  ): Promise<T> {
    return this.mutate(data, this.http.patch<T>(url, data, httpOptions), queryKeys, injector);
  }

  public patch2<T, D>(
    url: string,
    data: D,
    queryKeys: QueryKey[],
    injector: Injector,
    httpOptions: HttpOptions = {}
  ): Promise<T> {
    return this.mutate(data, this.http.patch2<T, D>(url, data, httpOptions), queryKeys, injector);
  }

  public delete<T, D>(
    url: string,
    data: D,
    queryKeys: QueryKey[],
    injector: Injector,
    httpOptions: HttpOptions = {}
  ): Promise<T> {
    return this.mutate(data, this.http.delete<T, D>(url, { ...httpOptions, body: data }), queryKeys, injector);
  }

  public infiniteQuery<T, G>(
    fn: (params: HttpParams) => Observable<G>,
    pageParam: IApiPageParam,
    queryKey: readonly unknown[],
    injector: Injector
  ): CreateInfiniteQueryResult<InfiniteData<IApiTableData<T>, number>, Error> {
    return injectInfiniteQuery(
      () => ({
        queryKey: queryKey,
        queryFn: async (context) => {
          const params = this.generatePageHttpParams(pageParam, context.pageParam);
          const abort$ = fromEvent(context.signal, 'abort');
          return this.transformData(
            await lastValueFrom(fn(params).pipe(takeUntil(abort$))),
            context.pageParam,
            pageParam
          );
        },
        initialPageParam: pageParam.startPage,
        getNextPageParam: (page) => (page.number + 1 < page.totalPages ? page.number + 1 : undefined),
        getPreviousPageParam: (page) => (page.number > pageParam.startPage ? page.number - 1 : undefined)
      }),
      injector
    );
  }

  public hasQuery(queryKey: QueryKey, injector: Injector): boolean {
    const queryClient = injectQueryClient({ injector });
    return !!queryClient.getQueryState(queryKey);
  }

  public removeQueries(queryKeys: QueryKey[], injector: Injector): void {
    const queryClient = injectQueryClient({ injector });
    queryKeys.forEach((queryKey) => queryClient.removeQueries({ queryKey }));
  }

  public clearCache(injector: Injector): void {
    injectQueryClient({ injector }).clear();
  }

  protected generatePageHttpParams(pageParam: IApiPageParam, pageNumber: number): HttpParams {
    if (!pageParam) throw new Error('Page parameter is missing.');
    let params = new HttpParams().set('page', pageNumber);
    params = params.append('size', 'size' in pageParam ? pageParam.size : 10);
    if (pageParam.sort) params = params.append('sort', Object.entries(pageParam.sort).join(',').replace(/_/g, ''));
    return params;
  }

  protected transformData<T, G>(data: G, pageNumber: number, pageParam: IApiPageParam): IApiTableData<T> {
    return data as IApiTableData<T>;
  }

  private defaultSuccessCallback(cl: QueryClient, queryKeys: QueryKey[], refetchType: any, data: any): void {
    queryKeys.forEach(async (queryKey: any) => await cl.invalidateQueries({ queryKey, refetchType }));
  }

  private mutate<T, D>(
    data: D,
    api: Observable<T>,
    queryKeys: QueryKey[],
    injector?: Injector,
    refetchType = 'active' as any,
    successCallback = this.defaultSuccessCallback
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const mutation = injectMutation((client): any => {
        return {
          mutationFn: (data: D) => lastValueFrom(api),
          onError: (error: Error) => {
            reject(error);
          },
          //successCallback.bind(this, client, queryKeys, injector)
          onSuccess: (data: D) => {
            successCallback(client, queryKeys, refetchType, data);

            resolve(data as any);
          }
        };
      }, injector);

      mutation.mutate(data as any);
    });
  }
}