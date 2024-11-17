export interface IApiPageParam {
  startPage: number;
  size: number;
  sort?: IFieldSort;
}

export type IFieldSort = Record<string, 'asc' | 'desc'>;
