/**
 * Types for Households: Recipe Actions endpoints
 * https://demo.mealie.io/openapi.json
 */

export type GroupRecipeActionType = 'link' | 'post';

export interface CreateGroupRecipeAction {
  actionType: GroupRecipeActionType;
  title: string;
  url: string;
}

export interface SaveGroupRecipeAction {
  actionType: GroupRecipeActionType;
  title: string;
  url: string;
  groupId: string;
  householdId: string;
}

export interface GroupRecipeActionOut {
  actionType: GroupRecipeActionType;
  title: string;
  url: string;
  groupId: string;
  householdId: string;
  id: string;
}

export interface GroupRecipeActionPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: GroupRecipeActionOut[];
  next?: string;
  previous?: string;
}
