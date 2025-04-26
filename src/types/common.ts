/**
 * Common types used across the application
 */

export type OrderDirection = 'asc' | 'desc';
export type OrderByNullPosition = 'first' | 'last';

export interface PaginationBase<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: T[];
  next?: string;
  previous?: string;
}

export interface SuccessResponse {
  message: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface QueryParams {
  orderBy?: string;
  orderByNullPosition?: OrderByNullPosition;
  orderDirection?: OrderDirection;
  queryFilter?: string;
  paginationSeed?: string;
  page?: number;
  perPage?: number;
}
