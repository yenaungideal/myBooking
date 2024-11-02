import {
    CreateInfiniteQueryResult,
    CreateMutationResult,
    CreateQueryResult,
    InfiniteData
  } from '@tanstack/angular-query-experimental';
  
  export type ApiQueryResult<T> = CreateQueryResult<T>;
  export type ApiMutationResult<T, Error, D> = CreateMutationResult<T, Error, D, unknown>;
  export type ApiInfiniteQueryResult<T, Error> = CreateInfiniteQueryResult<T, Error>;
  export type ApiInfiniteData<T, D> = InfiniteData<T, D>;