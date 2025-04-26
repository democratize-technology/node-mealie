/**
 * Types for Households: Self Service endpoints
 * https://demo.mealie.io/openapi.json
 */

import type { Recipe } from '../recipe.js';

export interface HouseholdInDB {
  groupId: string;
  name: string;
  id: string;
  slug: string;
  group: string;
  preferences?: ReadHouseholdPreferences;
  webhooks?: any[];
}

export interface HouseholdRecipeSummary {
  recipeId: string;
  recipe?: Recipe;
}

export interface ReadHouseholdPreferences {
  id: string;
  privateHousehold?: boolean;
  firstDayOfWeek?: number;
  recipePublic?: boolean;
  recipeShowNutrition?: boolean;
  recipeShowAssets?: boolean;
  recipeLandscapeView?: boolean;
  recipeDisableComments?: boolean;
  recipeDisableAmount?: boolean;
}

export interface UpdateHouseholdPreferences {
  privateHousehold?: boolean;
  firstDayOfWeek?: number;
  recipePublic?: boolean;
  recipeShowNutrition?: boolean;
  recipeShowAssets?: boolean;
  recipeLandscapeView?: boolean;
  recipeDisableComments?: boolean;
  recipeDisableAmount?: boolean;
}

export interface SetPermissions {
  userId: string;
  canManage?: boolean;
  canInvite?: boolean;
  canOrganize?: boolean;
}

export interface HouseholdStatistics {
  totalRecipes: number;
  totalUsers: number;
  totalCategories: number;
  totalTags: number;
  totalTools: number;
}

export interface HouseholdUserSummary {
  id: string;
  fullName: string;
  username?: string;
  email?: string;
}
