import { MealieClient } from '../client.js';
import type {
  CreateIngredientUnit,
  IngredientUnit,
  IngredientUnitPagination,
  MergeUnit,
  QueryParams,
} from '../types/units.js';
import type { SuccessResponse } from '../types/common.js';

export class UnitsService extends MealieClient {
  /**
   * Get all units with filtering and pagination
   */
  async getAllUnits(params?: QueryParams): Promise<IngredientUnitPagination> {
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
    const path = queryString ? `/api/units?${queryString}` : '/api/units';

    return this.get<IngredientUnitPagination>(path);
  }

  /**
   * Create a new unit
   */
  async createUnit(data: CreateIngredientUnit): Promise<IngredientUnit> {
    return this.post<IngredientUnit>('/api/units', data);
  }

  /**
   * Merge units
   */
  async mergeUnits(data: MergeUnit): Promise<SuccessResponse> {
    return this.put<SuccessResponse>('/api/units/merge', data);
  }

  /**
   * Get a single unit by ID
   */
  async getOne(itemId: string): Promise<IngredientUnit> {
    return this.get<IngredientUnit>(`/api/units/${itemId}`);
  }

  /**
   * Update a unit
   */
  async updateUnit(itemId: string, data: CreateIngredientUnit): Promise<IngredientUnit> {
    return this.put<IngredientUnit>(`/api/units/${itemId}`, data);
  }

  /**
   * Delete a unit
   */
  async deleteUnit(itemId: string): Promise<IngredientUnit> {
    return this.delete<IngredientUnit>(`/api/units/${itemId}`);
  }
}
