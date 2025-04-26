/**
 * Types for the units service
 */

// Re-export common types that we use
export type { OrderDirection, OrderByNullPosition, QueryParams } from './common.js';

export interface CreateIngredientUnit {
  name: string;
  [key: string]: any;
}

export interface IngredientUnit {
  id: string;
  name: string;
  [key: string]: any;
}

export interface IngredientUnitPagination {
  items: IngredientUnit[];
  page?: number;
  perPage?: number;
  total?: number;
  totalPages?: number;
}

export interface MergeUnit {
  fromUnit: string;
  toUnit: string;
}

export interface CreateIngredientUnitAlias {
  name: string;
  [key: string]: any;
}

export interface IngredientUnitAlias {
  name: string;
  [key: string]: any;
}
