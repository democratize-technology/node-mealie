/**
 * Types for Households: Mealplans endpoints
 * https://demo.mealie.io/openapi.json
 */

import type { Recipe } from '../recipe.js';

export type PlanEntryType = 'breakfast' | 'lunch' | 'dinner' | 'side';
export type PlanRulesDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' | 'unset';
export type PlanRulesType = 'breakfast' | 'lunch' | 'dinner' | 'side' | 'unset';

export interface CreatePlanEntry {
  date: string;
  entryType?: PlanEntryType;
  title?: string;
  text?: string;
  recipeId?: string;
}

export interface ReadPlanEntry {
  date: string;
  id: number;
  groupId: string;
  userId: string;
  householdId: string;
  entryType?: PlanEntryType;
  title?: string;
  text?: string;
  recipeId?: string;
  recipe?: Recipe;
}

export interface UpdatePlanEntry {
  date: string;
  id: number;
  groupId: string;
  userId: string;
  entryType?: PlanEntryType;
  title?: string;
  text?: string;
  recipeId?: string;
}

export interface CreateRandomEntry {
  date: string;
  entryType?: PlanEntryType;
}

export interface PlanRulesCreate {
  groupId?: string;
  householdId?: string;
  day?: PlanRulesDay;
  entryType?: PlanRulesType;
  categories?: string[];
  tags?: string[];
}

export interface PlanRulesOut {
  groupId: string;
  householdId: string;
  id: string;
  day?: PlanRulesDay;
  entryType?: PlanRulesType;
  categories?: string[];
  tags?: string[];
}

export interface PlanEntryPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: ReadPlanEntry[];
  next?: string;
  previous?: string;
}

export interface PlanRulesPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: PlanRulesOut[];
  next?: string;
  previous?: string;
}
