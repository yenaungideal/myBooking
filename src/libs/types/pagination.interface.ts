// DEPRECATED. from old table1
export interface IHaloTableOptions<T = object> {
  pagination: IHaloTablePaginatorEvent;
  size: number;
  sort?: IApiTableSortedColumns;
  clickOnSort?: boolean;
  first?: boolean;
  customParameters?: T;
}

// DEPRECATED from old table1
export type IApiTableSortedColumns = Record<string, 'asc' | 'desc'>;

export interface IHaloTablePaginatorEvent {
  /** The current page index. from IApiTableData aka number */
  pageIndex: number;
  /** total number of pages from IApiTableData interface, without 0 counting, from 1 to 10 */
  totalPages?: number;
  /** Index of the page that was selected previously */
  previousPageIndex?: number;
}
