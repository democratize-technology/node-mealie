/**
 * Types for the foods service
 */

// Re-export common types that we use
export type { OrderDirection, OrderByNullPosition, QueryParams } from './common.js';

export interface CreateIngredientFood {
  name: string;
  [key: string]: any;
}

export interface FoodItem {
  id: string;
  name: string;
  [key: string]: any;
}

export interface FoodPagination {
  items: FoodItem[];
  page?: number;
  perPage?: number;
  total?: number;
  totalPages?: number;
}

export interface MergeFood {
  fromFood: string;
  toFood: string;
}
