import { MealieClient } from '../client.js';
import type {
  CreateIngredientFood,
  FoodItem,
  FoodPagination,
  MergeFood,
  QueryParams,
} from '../types/foods.js';
import type { SuccessResponse } from '../types/common.js';

export class FoodsService extends MealieClient {
  /**
   * Get all foods with filtering and pagination
   */
  async getAllFoods(params?: QueryParams): Promise<FoodPagination> {
    const queryParams = new URLSearchParams();

    // Add query parameters if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const path = queryString ? `/api/foods?${queryString}` : '/api/foods';

    return this.get<FoodPagination>(path);
  }

  /**
   * Create a new food
   */
  async createFood(data: CreateIngredientFood): Promise<FoodItem> {
    return this.post<FoodItem>('/api/foods', data);
  }

  /**
   * Merge foods
   */
  async mergeFoods(data: MergeFood): Promise<SuccessResponse> {
    return this.put<SuccessResponse>('/api/foods/merge', data);
  }

  /**
   * Get a single food by ID
   */
  async getOne(itemId: string): Promise<FoodItem> {
    return this.get<FoodItem>(`/api/foods/${itemId}`);
  }

  /**
   * Update a food
   */
  async updateFood(itemId: string, data: CreateIngredientFood): Promise<FoodItem> {
    return this.put<FoodItem>(`/api/foods/${itemId}`, data);
  }

  /**
   * Delete a food
   */
  async deleteFood(itemId: string): Promise<FoodItem> {
    return this.delete<FoodItem>(`/api/foods/${itemId}`);
  }
}
