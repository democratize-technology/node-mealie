import { MealieClient } from '../client.js';
import type {
  RecipeShareToken,
  RecipeShareTokenSummary,
  RecipeShareTokenCreate,
  RecipeShareTokenQueryParams,
} from '../types/shared.js';

export class SharedService extends MealieClient {
  /**
   * Get all shared recipes
   */
  async getAllSharedRecipes(params?: RecipeShareTokenQueryParams): Promise<RecipeShareTokenSummary[]> {
    const queryParams = new URLSearchParams();

    if (params?.recipeId) {
      queryParams.append('recipe_id', params.recipeId);
    }

    const queryString = queryParams.toString();
    const path = queryString ? `/api/shared/recipes?${queryString}` : '/api/shared/recipes';

    return this.get<RecipeShareTokenSummary[]>(path);
  }

  /**
   * Create a shared recipe token
   */
  async createSharedRecipe(data: RecipeShareTokenCreate): Promise<RecipeShareToken> {
    return this.post<RecipeShareToken>('/api/shared/recipes', data);
  }

  /**
   * Get a single shared recipe token
   */
  async getSharedRecipe(itemId: string): Promise<RecipeShareToken> {
    return this.get<RecipeShareToken>(`/api/shared/recipes/${itemId}`);
  }

  /**
   * Delete a shared recipe token
   */
  async deleteSharedRecipe(itemId: string): Promise<void> {
    return this.delete<void>(`/api/shared/recipes/${itemId}`);
  }
}
