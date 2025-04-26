/**
 * Recipe Types Extension based on OpenAPI Spec
 */

import type {
  PaginationBase,
  QueryParams,
  RecipeSummary,
  UserBase,
  OrderByNullPosition,
  OrderDirection,
} from './index.js';

// Export-related types
export interface FormatResponse {
  json: string[];
  zip: string[];
  jinja2: string[];
}

export interface RecipeZipTokenResponse {
  token: string;
}

// Scrape-related types
export interface ScrapeRecipeTest {
  url: string;
}

export interface ScrapeRecipe {
  url: string;
  includeTags?: boolean;
}

export interface ScrapeRecipeData {
  data: string;
  dataType?: 'html' | 'json';
}

// Create recipe types
export interface CreateRecipe {
  name: string;
  description?: string;
  recipeYield?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
}

export interface CreateRecipeByUrlBulk {
  imports: CreateRecipeBulk[];
}

export interface CreateRecipeBulk {
  url: string;
  categories?: string[];
  tags?: string[];
}

// Recipe operations types
export interface RecipeDuplicate {
  name?: string;
}

export interface RecipeLastMade {
  timestamp: string;
}

// Recipe asset types
export interface RecipeAsset {
  name: string;
  icon: string;
  fileName?: string;
}

// Recipe bulk action types
export interface AssignTags {
  recipes: string[];
  tags: string[];
}

export interface AssignSettings {
  recipes: string[];
  settings: RecipeSettings;
}

export interface AssignCategories {
  recipes: string[];
  categories: string[];
}

export interface DeleteRecipes {
  recipes: string[];
}

export interface ExportRecipes {
  recipes: string[];
  exportFormat?: ExportTypes;
}

export interface ExportTypes {
  json?: boolean;
  zip?: boolean;
}

// Timeline event types
export interface RecipeTimelineEventIn {
  recipeId: string;
  subject: string;
  eventType: TimelineEventType;
  timestamp?: string;
  image?: string;
}

export interface RecipeTimelineEventOut extends RecipeTimelineEventIn {
  id: string;
  groupId: string;
  householdId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeTimelineEventUpdate {
  subject: string;
  eventType?: TimelineEventType;
  timestamp?: string;
}

export type TimelineEventType = 'system' | 'info' | 'comment';
export type TimelineEventImage = 'has image' | 'does not have image';

// Recipe suggestion types
export interface RecipeSuggestionResponse {
  items: RecipeSuggestionResponseItem[];
}

export interface RecipeSuggestionResponseItem {
  recipe: RecipeSummary;
  missingFoods: string[];
  missingTools: string[];
}

// Recipe comment types
export interface RecipeCommentOut {
  id: string;
  recipeId: string;
  text: string;
  userId: string;
  user: UserBase;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeCommentCreate {
  recipeId: string;
  text: string;
}

export interface RecipeCommentUpdate {
  id: string;
  text: string;
}

export interface RecipeCommentPagination extends PaginationBase<RecipeCommentOut> {}

// Comment query parameters
export interface CommentQueryParams extends QueryParams {
  orderBy?: string;
  orderByNullPosition?: OrderByNullPosition;
  orderDirection?: OrderDirection;
  queryFilter?: string;
  paginationSeed?: string;
  page?: number;
  perPage?: number;
}

// Recipe settings type
export interface RecipeSettings {
  public?: boolean;
  showNutrition?: boolean;
  showAssets?: boolean;
  landscapeView?: boolean;
  disableComments?: boolean;
  disableAmount?: boolean;
  locked?: boolean;
}

// Form data types for multipart requests
export interface CreateRecipeFromZipFormData {
  archive: File | Blob;
}

export interface CreateRecipeFromImageFormData {
  images: File | Blob | File[] | Blob[];
}

export interface UpdateRecipeImageFormData {
  image: File | Blob;
  extension: string;
}

export interface UploadRecipeAssetFormData {
  name: string;
  icon: string;
  extension: string;
  file: File | Blob;
}

export interface UpdateEventImageFormData {
  image: File | Blob;
  extension: string;
}

export interface UpdateImageResponse {
  image: string;
}

// Query parameter types for recipe endpoints
export interface RecipeQueryParams extends QueryParams {
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
  search?: string;
}

export interface RecipeSuggestionQueryParams extends QueryParams {
  foods?: string[];
  tools?: string[];
  limit?: number;
  maxMissingFoods?: number;
  maxMissingTools?: number;
  includeFoodsOnHand?: boolean;
  includeToolsOnHand?: boolean;
}

// Export response type
export interface GroupDataExport {
  id: string;
  groupId: string;
  name: string;
  filename: string;
  path: string;
  size: string;
  expires: string;
}

// Timeline pagination response type
export interface RecipeTimelineEventPagination extends PaginationBase<RecipeTimelineEventOut> {}
