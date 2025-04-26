/**
 * Types for Households: Cookbooks endpoints
 * https://demo.mealie.io/openapi.json
 */

import type { Recipe } from '../recipe.js';

export interface CreateCookBook {
  name: string;
  description?: string;
  public?: boolean;
  categories?: string[];
  tags?: string[];
  tools?: string[];
  requireAllCategories?: boolean;
  requireAllTags?: boolean;
  requireAllTools?: boolean;
}

export interface UpdateCookBook {
  name: string;
  groupId?: string;
  householdId?: string;
  id: string;
  slug?: string;
  description?: string;
  public?: boolean;
  categories?: string[];
  tags?: string[];
  tools?: string[];
  requireAllCategories?: boolean;
  requireAllTags?: boolean;
  requireAllTools?: boolean;
}

export interface ReadCookBook {
  name: string;
  groupId: string;
  householdId: string;
  id: string;
  slug?: string;
  description?: string;
  public?: boolean;
  categories?: string[];
  tags?: string[];
  tools?: string[];
  requireAllCategories?: boolean;
  requireAllTags?: boolean;
  requireAllTools?: boolean;
}

export interface RecipeCookBook extends ReadCookBook {
  recipes: Recipe[];
}

export interface CookBookPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: ReadCookBook[];
  next?: string;
  previous?: string;
}
