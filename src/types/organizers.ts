/**
 * Organizer types for categories, tags, and tools
 */

import type { PaginationBase } from './common.js';
import type { RecipeCategory, RecipeTag, RecipeTool } from './recipe.js';

// Categories
export interface CategoryBase {
  id: string;
  slug: string;
  name: string;
}

export interface CategoryIn {
  name: string;
}

export interface CategorySummary extends CategoryBase {
  recipes?: RecipeSummary[];
}

export interface RecipeCategoryPagination extends PaginationBase<RecipeCategory> {}

// Tags
export interface TagIn {
  name: string;
}

export interface RecipeTagResponse extends RecipeTag {}

export interface RecipeTagPagination extends PaginationBase<RecipeTag> {}

// Tools
export interface RecipeToolCreate {
  name: string;
}

export interface RecipeToolResponse extends RecipeTool {}

export interface RecipeToolPagination extends PaginationBase<RecipeTool> {}

// Imports needed from other types
import type { RecipeSummary } from './recipe.js';
