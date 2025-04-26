/**
 * Types for Households: Event Notifications endpoints
 * https://demo.mealie.io/openapi.json
 */

export interface GroupEventNotifierCreate {
  name: string;
  appriseUrl?: string;
}

export interface GroupEventNotifierOptions {
  testMessage?: boolean;
  webhookTask?: boolean;
  recipeCreated?: boolean;
  recipeUpdated?: boolean;
  recipeDeleted?: boolean;
  userSignup?: boolean;
  dataMigrations?: boolean;
  dataExport?: boolean;
  dataImport?: boolean;
  mealplanEntryCreated?: boolean;
  shoppingListCreated?: boolean;
  shoppingListUpdated?: boolean;
  shoppingListDeleted?: boolean;
  cookbookCreated?: boolean;
  cookbookUpdated?: boolean;
  cookbookDeleted?: boolean;
  tagCreated?: boolean;
  tagUpdated?: boolean;
  tagDeleted?: boolean;
  categoryCreated?: boolean;
  categoryUpdated?: boolean;
  categoryDeleted?: boolean;
}

export interface GroupEventNotifierOptionsOut extends GroupEventNotifierOptions {
  id: string;
}

export interface GroupEventNotifierOut {
  id: string;
  name: string;
  enabled: boolean;
  groupId: string;
  householdId: string;
  options: GroupEventNotifierOptionsOut;
  appriseUrl?: string;
}

export interface GroupEventNotifierUpdate {
  name: string;
  groupId: string;
  householdId: string;
  id: string;
  enabled?: boolean;
  appriseUrl?: string;
  options?: GroupEventNotifierOptions;
}

export interface GroupEventPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: GroupEventNotifierOut[];
  next?: string;
  previous?: string;
}
