/**
 * Types for Households: Shopping Lists endpoints
 * https://demo.mealie.io/openapi.json
 */

import type { Recipe } from '../recipe.js';
import { MultiPurposeLabelSummary } from '../groups.js';

export interface ShoppingListCreate {
  name?: string;
}

export interface ShoppingListUpdate {
  groupId: string;
  userId: string;
  id: string;
  name?: string;
}

export interface ShoppingListSummary {
  groupId: string;
  userId: string;
  id: string;
  householdId: string;
  name?: string;
  recipeReferences: ShoppingListRecipeRefOut[];
  labelSettings: ShoppingListMultiPurposeLabelOut[];
}

export interface ShoppingListOut extends ShoppingListSummary {
  listItems?: ShoppingListItemOut[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ShoppingListItemCreate {
  shoppingListId: string;
  checked?: boolean;
  position?: number;
  isFood?: boolean;
  note?: string;
  quantity?: number;
  unitId?: string;
  unit?: IngredientUnit;
  foodId?: string;
  food?: IngredientFood;
  labelId?: string;
  recipeReferences?: ShoppingListItemRecipeRefCreate[];
}

export interface ShoppingListItemOut {
  shoppingListId: string;
  id: string;
  groupId: string;
  householdId: string;
  checked?: boolean;
  position?: number;
  isFood?: boolean;
  note?: string;
  quantity?: number;
  unitId?: string;
  unit?: IngredientUnit;
  foodId?: string;
  food?: IngredientFood;
  labelId?: string;
  label?: MultiPurposeLabelSummary;
  recipeReferences?: ShoppingListItemRecipeRefOut[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ShoppingListItemUpdate {
  shoppingListId: string;
  id?: string;
  checked?: boolean;
  position?: number;
  isFood?: boolean;
  note?: string;
  quantity?: number;
  unitId?: string;
  unit?: IngredientUnit;
  foodId?: string;
  food?: IngredientFood;
  labelId?: string;
  recipeReferences?: ShoppingListItemRecipeRefUpdate[];
}

export interface ShoppingListItemUpdateBulk extends ShoppingListItemUpdate {
  id: string;
}

export interface ShoppingListRecipeRefOut {
  id: string;
  shoppingListId: string;
  recipeId: string;
  recipeQuantity: number;
  recipe: Recipe;
}

export interface ShoppingListItemRecipeRefCreate {
  recipeId: string;
  recipeScale?: number;
}

export interface ShoppingListItemRecipeRefUpdate {
  recipeId: string;
  id: string;
  shoppingListItemId: string;
  recipeScale?: number;
}

export interface ShoppingListItemRecipeRefOut {
  recipeId: string;
  id: string;
  shoppingListItemId: string;
  recipeScale?: number;
}

export interface ShoppingListMultiPurposeLabelOut {
  shoppingListId: string;
  labelId: string;
  id: string;
  label: MultiPurposeLabelSummary;
  position: number;
}

export interface ShoppingListMultiPurposeLabelUpdate {
  shoppingListId: string;
  labelId: string;
  id: string;
  position: number;
}

export interface ShoppingListAddRecipeParams {
  recipeIncrementQuantity?: number;
  recipeIngredients?: string[];
}

export interface ShoppingListAddRecipeParamsBulk {
  recipeId: string;
  recipeIncrementQuantity?: number;
  recipeIngredients?: string[];
}

export interface ShoppingListRemoveRecipeParams {
  recipeDecrementQuantity?: number;
}

export interface ShoppingListPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: ShoppingListSummary[];
  next?: string;
  previous?: string;
}

export interface ShoppingListItemPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: ShoppingListItemOut[];
  next?: string;
  previous?: string;
}

export interface ShoppingListItemsCollectionOut {
  createdItems?: ShoppingListItemOut[];
  updatedItems?: ShoppingListItemOut[];
}

export interface IngredientUnit {
  id: string;
  name: string;
  pluralName?: string;
  description?: string;
  abbreviation?: string;
  pluralAbbreviation?: string;
  fraction?: boolean;
  aliases?: IngredientUnitAlias[];
}

export interface IngredientUnitAlias {
  name: string;
}

export interface IngredientFood {
  id: string;
  name: string;
  pluralName?: string;
  description?: string;
  labelId?: string;
  aliases?: IngredientFoodAlias[];
}

export interface IngredientFoodAlias {
  name: string;
}
