export interface IApiTableData<T> {
    content: T; // items array
    totalPages: number; //aka count - count of pages, 10 for example, without 0 counting, from 1 to 10
    number: number; // aka page - current page index starting from 0 index
    size: number; // count of items for 1 page, like 10 per page
    totalElements: number; // total of elements at all in query
  }
  
  export interface IApiTableDataExtra {
    first: boolean; // is it first page? flag true/false
    last: boolean; // is it last page? flag true/false
    empty: boolean; // is it page without items? flag true/false
    numberOfElements: number; // number of elements on the page currently, like 5 of last page
    totalElements: number; // total of elements at all in query
    sort?: IApiTableSort; // don't need, db related metadata
    pageable?: IApiTablePageable; // don't need, db related metadata
  }
  
  export interface IApiTableSort {
    empty: boolean; // no sort
    sorted: boolean; // was sorted
    unsorted: boolean; // was unsorted
  }
  
  export interface IApiTablePageable {
    sort: IApiTableSort;
    offset: number; // 0
    pageNumber: number; // 0
    pageSize: number; // 10
    paged: boolean;
    unpaged: boolean;
  }