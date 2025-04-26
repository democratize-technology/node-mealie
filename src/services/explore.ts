import { MealieClient } from '../client.js';
import type {
  ExploreQueryParams,
  ExploreRecipesParams,
  RecipeSuggestionsParams,
  ExploreFoodsPagination,
  ExploreHouseholdsPagination,
  ExploreCategoriesPagination,
  ExploreTagsPagination,
  ExploreToolsPagination,
  ExploreCookbooksPagination,
  ExploreRecipesPagination,
  ExploreFoodItem,
  ExploreHouseholdSummary,
  ExploreCategoryOut,
  ExploreTagOut,
  ExploreRecipeToolOut,
  ExploreRecipeCookBook,
  RecipeDetails,
  ExploreRecipeSuggestionResponse,
} from '../types/explore.js';

/**
 * Service for handling explore API endpoints
 */
export class ExploreService extends MealieClient {
  /**
   * Builds query string from parameters
   */
  private buildQueryString(params?: Record<string, any>): string {
    if (!params) return '';

    const queryParams = new URLSearchParams();
    const excludeFromQuery = ['acceptLanguage'];

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && !excludeFromQuery.includes(key)) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== undefined && item !== null) {
              queryParams.append(key, String(item));
            }
          });
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Get all foods for a group
   */
  async getFoods(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreFoodsPagination> {
    const query = this.buildQueryString(params);
    const headers: Record<string, string> = {};
    
    if (params?.acceptLanguage) {
      headers['Accept-Language'] = params.acceptLanguage;
    }

    return this.get<ExploreFoodsPagination>(
      `/api/explore/groups/${groupSlug}/foods${query}`,
      { headers }
    );
  }

  /**
   * Get a specific food by ID
   */
  async getFood(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreFoodItem> {
    const headers: Record<string, string> = {};
    
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    return this.get<ExploreFoodItem>(
      `/api/explore/groups/${groupSlug}/foods/${itemId}`,
      { headers }
    );
  }

  /**
   * Get all households for a group
   */
  async getHouseholds(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreHouseholdsPagination> {
    const query = this.buildQueryString(params);
    const headers: Record<string, string> = {};
    
    if (params?.acceptLanguage) {
      headers['Accept-Language'] = params.acceptLanguage;
    }

    return this.get<ExploreHouseholdsPagination>(
      `/api/explore/groups/${groupSlug}/households${query}`,
      { headers }
    );
  }

  /**
   * Get a specific household by slug
   */
  async getHousehold(groupSlug: string, householdSlug: string, acceptLanguage?: string): Promise<ExploreHouseholdSummary> {
    const headers: Record<string, string> = {};
    
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    return this.get<ExploreHouseholdSummary>(
      `/api/explore/groups/${groupSlug}/households/${householdSlug}`,
      { headers }
    );
  }

  /**
   * Get all categories for a group
   */
  async getCategories(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreCategoriesPagination> {
    const query = this.buildQueryString(params);
    const headers: Record<string, string> = {};
    
    if (params?.acceptLanguage) {
      headers['Accept-Language'] = params.acceptLanguage;
    }

    return this.get<ExploreCategoriesPagination>(
      `/api/explore/groups/${groupSlug}/organizers/categories${query}`,
      { headers }
    );
  }

  /**
   * Get a specific category by ID
   */
  async getCategory(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreCategoryOut> {
    const headers: Record<string, string> = {};
    
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    return this.get<ExploreCategoryOut>(
      `/api/explore/groups/${groupSlug}/organizers/categories/${itemId}`,
      { headers }
    );
  }

  /**
   * Get all tags for a group
   */
  async getTags(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreTagsPagination> {
    const query = this.buildQueryString(params);
    const headers: Record<string, string> = {};
    
    if (params?.acceptLanguage) {
      headers['Accept-Language'] = params.acceptLanguage;
    }

    return this.get<ExploreTagsPagination>(
      `/api/explore/groups/${groupSlug}/organizers/tags${query}`,
      { headers }
    );
  }

  /**
   * Get a specific tag by ID
   */
  async getTag(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreTagOut> {
    const headers: Record<string, string> = {};
    
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    return this.get<ExploreTagOut>(
      `/api/explore/groups/${groupSlug}/organizers/tags/${itemId}`,
      { headers }
    );
  }

  /**
   * Get all tools for a group
   */
  async getTools(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreToolsPagination> {
    const query = this.buildQueryString(params);
    const headers: Record<string, string> = {};
    
    if (params?.acceptLanguage) {
      headers['Accept-Language'] = params.acceptLanguage;
    }

    return this.get<ExploreToolsPagination>(
      `/api/explore/groups/${groupSlug}/organizers/tools${query}`,
      { headers }
    );
  }

  /**
   * Get a specific tool by ID
   */
  async getTool(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreRecipeToolOut> {
    const headers: Record<string, string> = {};
    
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    return this.get<ExploreRecipeToolOut>(
      `/api/explore/groups/${groupSlug}/organizers/tools/${itemId}`,
      { headers }
    );
  }

  /**
   * Get all cookbooks for a group
   */
  async getCookbooks(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreCookbooksPagination> {
    const query = this.buildQueryString(params);
    const headers: Record<string, string> = {};
    
    if (params?.acceptLanguage) {
      headers['Accept-Language'] = params.acceptLanguage;
    }

    return this.get<ExploreCookbooksPagination>(
      `/api/explore/groups/${groupSlug}/cookbooks${query}`,
      { headers }
    );
  }

  /**
   * Get a specific cookbook by ID or slug
   */
  async getCookbook(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreRecipeCookBook> {
    const headers: Record<string, string> = {};
    
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    return this.get<ExploreRecipeCookBook>(
      `/api/explore/groups/${groupSlug}/cookbooks/${itemId}`,
      { headers }
    );
  }

  /**
   * Get all recipes for a group with filters
   */
  async getRecipes(groupSlug: string, params?: ExploreRecipesParams): Promise<ExploreRecipesPagination> {
    const query = this.buildQueryString(params);
    const headers: Record<string, string> = {};
    
    if (params?.acceptLanguage) {
      headers['Accept-Language'] = params.acceptLanguage;
    }

    return this.get<ExploreRecipesPagination>(
      `/api/explore/groups/${groupSlug}/recipes${query}`,
      { headers }
    );
  }

  /**
   * Get recipe suggestions based on foods and tools
   */
  async getRecipeSuggestions(groupSlug: string, params?: RecipeSuggestionsParams): Promise<ExploreRecipeSuggestionResponse> {
    const query = this.buildQueryString(params);
    const headers: Record<string, string> = {};
    
    if (params?.acceptLanguage) {
      headers['Accept-Language'] = params.acceptLanguage;
    }

    return this.get<ExploreRecipeSuggestionResponse>(
      `/api/explore/groups/${groupSlug}/recipes/suggestions${query}`,
      { headers }
    );
  }

  /**
   * Get a specific recipe by slug
   */
  async getRecipe(groupSlug: string, recipeSlug: string, acceptLanguage?: string): Promise<RecipeDetails> {
    const headers: Record<string, string> = {};
    
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    return this.get<RecipeDetails>(
      `/api/explore/groups/${groupSlug}/recipes/${recipeSlug}`,
      { headers }
    );
  }
}
