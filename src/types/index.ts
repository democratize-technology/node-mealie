// App Info Types
export interface AppInfo {
  production: boolean;
  version: string;
  demoStatus: boolean;
  allowSignup: boolean;
  enableOidc: boolean;
  oidcRedirect: string;
  oidcProviderName: string;
  enableOpenai: boolean;
  enableOpenaiImageServices: boolean;
}

export interface AppTheme {
  [key: string]: unknown;
}

export interface AppStartupInfo {
  isFirstLogin: boolean;
  isDemo: boolean;
}

// Authentication Types
export interface AuthToken {
  access_token: string;
  token_type: string;
}

// API Client Options
export interface MealieClientOptions {
  baseUrl?: string;
  token?: string;
  username?: string;
  password?: string;
  debug?: boolean;
}

// OAuth Authentication Types
export interface OAuthInitResponse {
  redirectUrl: string;
}

export interface OAuthCallbackParams {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
}

export interface TokenRefreshResponse extends AuthToken {
  refresh_token?: string;
}

export interface LogoutResponse {
  success: boolean;
}

// Error Types
export class MealieError extends Error {
  constructor(message: string, public statusCode?: number, public statusText?: string, public response?: any) {
    super(message);
    this.name = 'MealieError';
  }
}

// Re-export user types
export * from './user.js';

// Re-export common types
export * from './common.js';

// Re-export recipe types
export * from './recipe.js';

// Re-export recipe extension types
export * from './recipe-extensions.js';

// Re-export household types
export * from './household/index.js';

// Re-export group types
export * from './groups.js';

// Re-export organizer types
export * from './organizers.js';

export * from './shared.js';

// Re-export ingredient parser types
export * from './ingredient-parser.js';

// Re-export foods types
export * from './foods.js';

// Re-export units types
export type { CreateIngredientUnit, MergeUnit, IngredientUnitPagination } from './units.js';

// Re-export admin types
export * from './admin.js';

// Re-export media types
export * from './media.js';

// Re-export explore types
export type {
  ExploreQueryParams,
  ExploreRecipesParams,
  RecipeSuggestionsParams,
  ExploreFoodItem,
  ExploreFoodsPagination,
  ExploreHouseholdsPagination,
  ExploreCategoriesPagination,
  ExploreTagsPagination,
  ExploreToolsPagination,
  ExploreCookbooksPagination,
  ExploreRecipesPagination,
  ExploreHouseholdSummary,
  ExploreRecipeCategory,
  ExploreRecipeTag,
  ExploreRecipeTool,
  CookbookSummary,
  ExploreRecipeCookBook,
  ExploreRecipeSummary,
  RecipeDetails,
  ExploreCategoryOut,
  ExploreTagOut,
  ExploreRecipeToolOut,
  ExploreRecipeSuggestionResponseItem,
  ExploreRecipeSuggestionResponse,
} from './explore.js';

// Re-export utils types
export * from './utils.js';
