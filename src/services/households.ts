/**
 * Households service - implements all households-related API endpoints
 * https://demo.mealie.io/openapi.json
 */

import { MealieClient } from '../client.js';
import type {
  // Cookbooks
  CreateCookBook,
  UpdateCookBook,
  ReadCookBook,
  RecipeCookBook,
  CookBookPagination,

  // Event Notifications
  GroupEventNotifierCreate,
  GroupEventNotifierOut,
  GroupEventNotifierUpdate,
  GroupEventPagination,

  // Recipe Actions
  CreateGroupRecipeAction,
  SaveGroupRecipeAction,
  GroupRecipeActionOut,
  GroupRecipeActionPagination,

  // Self Service
  HouseholdInDB,
  HouseholdRecipeSummary,
  ReadHouseholdPreferences,
  UpdateHouseholdPreferences,
  SetPermissions,
  HouseholdStatistics,

  // Invitations
  CreateInviteToken,
  ReadInviteToken,
  EmailInvitation,
  EmailInitationResponse,

  // Shopping Lists
  ShoppingListCreate,
  ShoppingListUpdate,
  ShoppingListOut,
  ShoppingListItemCreate,
  ShoppingListItemOut,
  ShoppingListItemUpdate,
  ShoppingListItemUpdateBulk,
  ShoppingListMultiPurposeLabelUpdate,
  ShoppingListAddRecipeParams,
  ShoppingListAddRecipeParamsBulk,
  ShoppingListRemoveRecipeParams,
  ShoppingListPagination,
  ShoppingListItemPagination,
  ShoppingListItemsCollectionOut,

  // Webhooks
  CreateWebhook,
  ReadWebhook,
  WebhookPagination,

  // Mealplans
  CreatePlanEntry,
  ReadPlanEntry,
  UpdatePlanEntry,
  CreateRandomEntry,
  PlanRulesCreate,
  PlanRulesOut,
  PlanEntryPagination,
  PlanRulesPagination,

  // Common
  QueryParams,
  SuccessResponse,
  PaginationBase,
} from '../types/index.js';

import type { UserOut } from '../types/user.js';

export class HouseholdsService extends MealieClient {

  private buildQueryParams(params?: QueryParams): string {
    if (!params) return '';

    const queryParts: string[] = [];

    if (params.orderBy) queryParts.push(`orderBy=${encodeURIComponent(params.orderBy)}`);
    if (params.orderByNullPosition) queryParts.push(`orderByNullPosition=${params.orderByNullPosition}`);
    if (params.orderDirection) queryParts.push(`orderDirection=${params.orderDirection}`);
    if (params.queryFilter) queryParts.push(`queryFilter=${encodeURIComponent(params.queryFilter)}`);
    if (params.paginationSeed) queryParts.push(`paginationSeed=${encodeURIComponent(params.paginationSeed)}`);
    if (params.page) queryParts.push(`page=${params.page}`);
    if (params.perPage) queryParts.push(`perPage=${params.perPage}`);

    return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  }

  // Cookbooks API
  async getCookbooks(params?: QueryParams): Promise<CookBookPagination> {
    const path = `/api/households/cookbooks${this.buildQueryParams(params)}`;
    return this.get<CookBookPagination>(path);
  }

  async createCookbook(data: CreateCookBook): Promise<ReadCookBook> {
    const path = '/api/households/cookbooks';
    return this.post<ReadCookBook>(path, data);
  }

  async updateManyCookbooks(data: UpdateCookBook[]): Promise<ReadCookBook[]> {
    const path = '/api/households/cookbooks';
    return this.put<ReadCookBook[]>(path, data);
  }

  async getCookbook(id: string): Promise<RecipeCookBook> {
    const path = `/api/households/cookbooks/${id}`;
    return this.get<RecipeCookBook>(path);
  }

  async updateCookbook(id: string, data: CreateCookBook): Promise<ReadCookBook> {
    const path = `/api/households/cookbooks/${id}`;
    return this.put<ReadCookBook>(path, data);
  }

  async deleteCookbook(id: string): Promise<ReadCookBook> {
    const path = `/api/households/cookbooks/${id}`;
    return this.delete<ReadCookBook>(path);
  }

  // Event Notifications API
  async getEventNotifications(params?: QueryParams): Promise<GroupEventPagination> {
    const path = `/api/households/events/notifications${this.buildQueryParams(params)}`;
    return this.get<GroupEventPagination>(path);
  }

  async createEventNotification(data: GroupEventNotifierCreate): Promise<GroupEventNotifierOut> {
    const path = '/api/households/events/notifications';
    return this.post<GroupEventNotifierOut>(path, data);
  }

  async getEventNotification(id: string): Promise<GroupEventNotifierOut> {
    const path = `/api/households/events/notifications/${id}`;
    return this.get<GroupEventNotifierOut>(path);
  }

  async updateEventNotification(id: string, data: GroupEventNotifierUpdate): Promise<GroupEventNotifierOut> {
    const path = `/api/households/events/notifications/${id}`;
    return this.put<GroupEventNotifierOut>(path, data);
  }

  async deleteEventNotification(id: string): Promise<void> {
    const path = `/api/households/events/notifications/${id}`;
    return this.delete<void>(path);
  }

  async testEventNotification(id: string): Promise<void> {
    const path = `/api/households/events/notifications/${id}/test`;
    return this.post<void>(path);
  }

  // Recipe Actions API
  async getRecipeActions(params?: QueryParams): Promise<GroupRecipeActionPagination> {
    const path = `/api/households/recipe-actions${this.buildQueryParams(params)}`;
    return this.get<GroupRecipeActionPagination>(path);
  }

  async createRecipeAction(data: CreateGroupRecipeAction): Promise<GroupRecipeActionOut> {
    const path = '/api/households/recipe-actions';
    return this.post<GroupRecipeActionOut>(path, data);
  }

  async getRecipeAction(id: string): Promise<GroupRecipeActionOut> {
    const path = `/api/households/recipe-actions/${id}`;
    return this.get<GroupRecipeActionOut>(path);
  }

  async updateRecipeAction(id: string, data: SaveGroupRecipeAction): Promise<GroupRecipeActionOut> {
    const path = `/api/households/recipe-actions/${id}`;
    return this.put<GroupRecipeActionOut>(path, data);
  }

  async deleteRecipeAction(id: string): Promise<GroupRecipeActionOut> {
    const path = `/api/households/recipe-actions/${id}`;
    return this.delete<GroupRecipeActionOut>(path);
  }

  async triggerRecipeAction(id: string, recipeSlug: string): Promise<void> {
    const path = `/api/households/recipe-actions/${id}/trigger/${recipeSlug}`;
    return this.post<void>(path);
  }

  // Self Service API
  async getSelf(): Promise<HouseholdInDB> {
    const path = '/api/households/self';
    return this.get<HouseholdInDB>(path);
  }

  async getHouseholdRecipe(recipeSlug: string): Promise<HouseholdRecipeSummary> {
    const path = `/api/households/self/recipes/${recipeSlug}`;
    return this.get<HouseholdRecipeSummary>(path);
  }

  async getHouseholdMembers(params?: QueryParams): Promise<PaginationBase<UserOut>> {
    const path = `/api/households/members${this.buildQueryParams(params)}`;
    return this.get<PaginationBase<UserOut>>(path);
  }

  async getHouseholdPreferences(): Promise<ReadHouseholdPreferences> {
    const path = '/api/households/preferences';
    return this.get<ReadHouseholdPreferences>(path);
  }

  async updateHouseholdPreferences(data: UpdateHouseholdPreferences): Promise<ReadHouseholdPreferences> {
    const path = '/api/households/preferences';
    return this.put<ReadHouseholdPreferences>(path, data);
  }

  async setMemberPermissions(data: SetPermissions): Promise<UserOut> {
    const path = '/api/households/permissions';
    return this.put<UserOut>(path, data);
  }

  async getStatistics(): Promise<HouseholdStatistics> {
    const path = '/api/households/statistics';
    return this.get<HouseholdStatistics>(path);
  }

  // Invitations API
  async getInviteTokens(): Promise<ReadInviteToken[]> {
    const path = '/api/households/invitations';
    return this.get<ReadInviteToken[]>(path);
  }

  async createInviteToken(data: CreateInviteToken): Promise<ReadInviteToken> {
    const path = '/api/households/invitations';
    return this.post<ReadInviteToken>(path, data);
  }

  async emailInvitation(data: EmailInvitation): Promise<EmailInitationResponse> {
    const path = '/api/households/invitations/email';
    return this.post<EmailInitationResponse>(path, data);
  }

  // Shopping Lists API
  async getShoppingLists(params?: QueryParams): Promise<ShoppingListPagination> {
    const path = `/api/households/shopping/lists${this.buildQueryParams(params)}`;
    return this.get<ShoppingListPagination>(path);
  }

  async createShoppingList(data: ShoppingListCreate): Promise<ShoppingListOut> {
    const path = '/api/households/shopping/lists';
    return this.post<ShoppingListOut>(path, data);
  }

  async getShoppingList(id: string): Promise<ShoppingListOut> {
    const path = `/api/households/shopping/lists/${id}`;
    return this.get<ShoppingListOut>(path);
  }

  async updateShoppingList(id: string, data: ShoppingListUpdate): Promise<ShoppingListOut> {
    const path = `/api/households/shopping/lists/${id}`;
    return this.put<ShoppingListOut>(path, data);
  }

  async deleteShoppingList(id: string): Promise<ShoppingListOut> {
    const path = `/api/households/shopping/lists/${id}`;
    return this.delete<ShoppingListOut>(path);
  }

  async updateShoppingListLabelSettings(
    id: string,
    data: ShoppingListMultiPurposeLabelUpdate[],
  ): Promise<ShoppingListOut> {
    const path = `/api/households/shopping/lists/${id}/label-settings`;
    return this.put<ShoppingListOut>(path, data);
  }

  async addRecipeIngredientsToList(id: string, data: ShoppingListAddRecipeParamsBulk[]): Promise<ShoppingListOut> {
    const path = `/api/households/shopping/lists/${id}/recipe`;
    return this.post<ShoppingListOut>(path, data);
  }

  async addSingleRecipeIngredientsToList(
    id: string,
    recipeId: string,
    data?: ShoppingListAddRecipeParams,
  ): Promise<ShoppingListOut> {
    const path = `/api/households/shopping/lists/${id}/recipe/${recipeId}`;
    return this.post<ShoppingListOut>(path, data);
  }

  async removeRecipeIngredientsFromList(
    id: string,
    recipeId: string,
    data?: ShoppingListRemoveRecipeParams,
  ): Promise<ShoppingListOut> {
    const path = `/api/households/shopping/lists/${id}/recipe/${recipeId}/delete`;
    return this.post<ShoppingListOut>(path, data);
  }

  // Shopping List Items API
  async getShoppingListItems(params?: QueryParams): Promise<ShoppingListItemPagination> {
    const path = `/api/households/shopping/items${this.buildQueryParams(params)}`;
    return this.get<ShoppingListItemPagination>(path);
  }

  async createShoppingListItem(data: ShoppingListItemCreate): Promise<ShoppingListItemsCollectionOut> {
    const path = '/api/households/shopping/items';
    return this.post<ShoppingListItemsCollectionOut>(path, data);
  }

  async updateManyShoppingListItems(data: ShoppingListItemUpdateBulk[]): Promise<ShoppingListItemsCollectionOut> {
    const path = '/api/households/shopping/items';
    return this.put<ShoppingListItemsCollectionOut>(path, data);
  }

  async deleteManyShoppingListItems(ids: string[]): Promise<SuccessResponse> {
    const path = `/api/households/shopping/items?${ids.map((id) => `ids=${id}`).join('&')}`;
    return this.delete<SuccessResponse>(path);
  }

  async createManyShoppingListItems(data: ShoppingListItemCreate[]): Promise<ShoppingListItemsCollectionOut> {
    const path = '/api/households/shopping/items/create-bulk';
    return this.post<ShoppingListItemsCollectionOut>(path, data);
  }

  async getShoppingListItem(id: string): Promise<ShoppingListItemOut> {
    const path = `/api/households/shopping/items/${id}`;
    return this.get<ShoppingListItemOut>(path);
  }

  async updateShoppingListItem(id: string, data: ShoppingListItemUpdate): Promise<ShoppingListItemsCollectionOut> {
    const path = `/api/households/shopping/items/${id}`;
    return this.put<ShoppingListItemsCollectionOut>(path, data);
  }

  async deleteShoppingListItem(id: string): Promise<SuccessResponse> {
    const path = `/api/households/shopping/items/${id}`;
    return this.delete<SuccessResponse>(path);
  }

  // Webhooks API
  async getWebhooks(params?: QueryParams): Promise<WebhookPagination> {
    const path = `/api/households/webhooks${this.buildQueryParams(params)}`;
    return this.get<WebhookPagination>(path);
  }

  async createWebhook(data: CreateWebhook): Promise<ReadWebhook> {
    const path = '/api/households/webhooks';
    return this.post<ReadWebhook>(path, data);
  }

  async rerunWebhooks(): Promise<void> {
    const path = '/api/households/webhooks/rerun';
    return this.post<void>(path);
  }

  async getWebhook(id: string): Promise<ReadWebhook> {
    const path = `/api/households/webhooks/${id}`;
    return this.get<ReadWebhook>(path);
  }

  async updateWebhook(id: string, data: CreateWebhook): Promise<ReadWebhook> {
    const path = `/api/households/webhooks/${id}`;
    return this.put<ReadWebhook>(path, data);
  }

  async deleteWebhook(id: string): Promise<ReadWebhook> {
    const path = `/api/households/webhooks/${id}`;
    return this.delete<ReadWebhook>(path);
  }

  async testWebhook(id: string): Promise<void> {
    const path = `/api/households/webhooks/${id}/test`;
    return this.post<void>(path);
  }

  // Mealplans API
  async getMealplans(params?: QueryParams & { start_date?: string; end_date?: string }): Promise<PlanEntryPagination> {
    const queryParts: string[] = [];

    if (params?.start_date) queryParts.push(`start_date=${params.start_date}`);
    if (params?.end_date) queryParts.push(`end_date=${params.end_date}`);

    // Add standard query params
    const standardParams = this.buildQueryParams(params).replace('?', '');
    if (standardParams) queryParts.push(standardParams);

    const path = `/api/households/mealplans${queryParts.length > 0 ? `?${queryParts.join('&')}` : ''}`;
    return this.get<PlanEntryPagination>(path);
  }

  async createMealplan(data: CreatePlanEntry): Promise<ReadPlanEntry> {
    const path = '/api/households/mealplans';
    return this.post<ReadPlanEntry>(path, data);
  }

  async getTodaysMeals(): Promise<ReadPlanEntry[]> {
    const path = '/api/households/mealplans/today';
    return this.get<ReadPlanEntry[]>(path);
  }

  async createRandomMeal(data: CreateRandomEntry): Promise<ReadPlanEntry> {
    const path = '/api/households/mealplans/random';
    return this.post<ReadPlanEntry>(path, data);
  }

  async getMealplan(id: number): Promise<ReadPlanEntry> {
    const path = `/api/households/mealplans/${id}`;
    return this.get<ReadPlanEntry>(path);
  }

  async updateMealplan(id: number, data: UpdatePlanEntry): Promise<ReadPlanEntry> {
    const path = `/api/households/mealplans/${id}`;
    return this.put<ReadPlanEntry>(path, data);
  }

  async deleteMealplan(id: number): Promise<ReadPlanEntry> {
    const path = `/api/households/mealplans/${id}`;
    return this.delete<ReadPlanEntry>(path);
  }

  // Mealplan Rules API
  async getMealplanRules(params?: QueryParams): Promise<PlanRulesPagination> {
    const path = `/api/households/mealplans/rules${this.buildQueryParams(params)}`;
    return this.get<PlanRulesPagination>(path);
  }

  async createMealplanRule(data: PlanRulesCreate): Promise<PlanRulesOut> {
    const path = '/api/households/mealplans/rules';
    return this.post<PlanRulesOut>(path, data);
  }

  async getMealplanRule(id: string): Promise<PlanRulesOut> {
    const path = `/api/households/mealplans/rules/${id}`;
    return this.get<PlanRulesOut>(path);
  }

  async updateMealplanRule(id: string, data: PlanRulesCreate): Promise<PlanRulesOut> {
    const path = `/api/households/mealplans/rules/${id}`;
    return this.put<PlanRulesOut>(path, data);
  }

  async deleteMealplanRule(id: string): Promise<PlanRulesOut> {
    const path = `/api/households/mealplans/rules/${id}`;
    return this.delete<PlanRulesOut>(path);
  }
}
