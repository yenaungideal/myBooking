export interface IApiPageParam {
    startPage : number;
    size : number;
    sort?: IFieldSort;
}

export interface IFieldSort {
    [field: string]: 'asc' | 'desc'
}