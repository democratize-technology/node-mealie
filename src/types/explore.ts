import type { PaginationBase, OrderDirection, OrderByNullPosition } from './common.js';

/**
 * Query parameters for explore endpoints
 */
export interface ExploreQueryParams {
  search?: string;
  orderBy?: string;
  orderByNullPosition?: OrderByNullPosition;
  orderDirection?: OrderDirection;
  queryFilter?: string;
  paginationSeed?: string;
  page?: number;
  perPage?: number;
  acceptLanguage?: string;
}

/**
 * Query parameters for explore recipes
 */
export interface ExploreRecipesParams extends ExploreQueryParams {
  categories?: string[];
  tags?: string[];
  tools?: string[];
  foods?: string[];
  households?: string[];
  cookbook?: string;
  requireAllCategories?: boolean;
  requireAllTags?: boolean;
  requireAllTools?: boolean;
  requireAllFoods?: boolean;
}

/**
 * Query parameters for recipe suggestions
 */
export interface RecipeSuggestionsParams {
  foods?: string[];
  tools?: string[];
  orderBy?: string;
  orderByNullPosition?: OrderByNullPosition;
  orderDirection?: OrderDirection;
  queryFilter?: string;
  paginationSeed?: string;
  limit?: number;
  maxMissingFoods?: number;
  maxMissingTools?: number;
  includeFoodsOnHand?: boolean;
  includeToolsOnHand?: boolean;
  acceptLanguage?: string;
}

/**
 * Food item in explore API
 */
export interface ExploreFoodItem {
  id: string;
  name: string;
  // Additional properties from IngredientFood-Output schema
}

/**
 * Household summary in explore context
 */
export interface ExploreHouseholdSummary {
  groupId: string;
  name: string;
  id: string;
  slug: string;
}

/**
 * Recipe category in explore context
 */
export interface ExploreRecipeCategory {
  name: string;
  slug: string;
  id?: string;
  groupId?: string;
}

/**
 * Recipe tag in explore context
 */
export interface ExploreRecipeTag {
  name: string;
  slug: string;
  id?: string;
  groupId?: string;
}

/**
 * Recipe tool in explore context
 */
export interface ExploreRecipeTool {
  id: string;
  name: string;
  slug: string;
}

/**
 * Cookbook summary
 */
export interface CookbookSummary {
  name: string;
  groupId: string;
  householdId: string;
  id: string;
}

/**
 * Recipe cookbook in explore context
 */
export interface ExploreRecipeCookBook extends CookbookSummary {
  recipes: ExploreRecipeSummary[];
}

/**
 * Recipe summary in explore context
 */
export interface ExploreRecipeSummary {
  id?: string;
  name?: string;
  slug?: string;
  // Additional properties based on schema
}

/**
 * Full recipe details
 */
export interface RecipeDetails {
  id?: string;
  name?: string;
  slug?: string;
  // Recipe-Output schema properties
}

/**
 * Category with recipes in explore context
 */
export interface ExploreCategoryOut {
  name: string;
  id: string;
  slug: string;
  groupId: string;
  recipes?: ExploreRecipeSummary[];
}

/**
 * Tag with recipes in explore context
 */
export interface ExploreTagOut {
  name: string;
  groupId: string;
  id: string;
  slug: string;
  recipes?: ExploreRecipeSummary[];
}

/**
 * Tool with recipes in explore context
 */
export interface ExploreRecipeToolOut {
  name: string;
  id: string;
  slug: string;
  recipes?: ExploreRecipeSummary[];
}

/**
 * Recipe suggestion response item in explore context
 */
export interface ExploreRecipeSuggestionResponseItem {
  recipe: ExploreRecipeSummary;
  missingFoods: ExploreFoodItem[];
  missingTools: ExploreRecipeTool[];
}

/**
 * Recipe suggestion response in explore context
 */
export interface ExploreRecipeSuggestionResponse {
  items: ExploreRecipeSuggestionResponseItem[];
}

// Export pagination types for explore endpoints
export type ExploreFoodsPagination = PaginationBase<ExploreFoodItem>;
export type ExploreHouseholdsPagination = PaginationBase<ExploreHouseholdSummary>;
export type ExploreCategoriesPagination = PaginationBase<ExploreRecipeCategory>;
export type ExploreTagsPagination = PaginationBase<ExploreRecipeTag>;
export type ExploreToolsPagination = PaginationBase<ExploreRecipeTool>;
export type ExploreCookbooksPagination = PaginationBase<CookbookSummary>;
export type ExploreRecipesPagination = PaginationBase<ExploreRecipeSummary>;
