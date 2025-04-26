import { MealieClient } from '../client.js';
import type {
  Recipe,
  RecipeSummary,
  CreateRecipe,
  RecipeDuplicate,
  RecipeLastMade,
  RecipeAsset,
  RecipeCommentOut,
  RecipeTimelineEventIn,
  RecipeTimelineEventOut,
  RecipeTimelineEventUpdate,
  RecipeTimelineEventPagination,
  FormatResponse,
  RecipeZipTokenResponse,
  ScrapeRecipe,
  ScrapeRecipeTest,
  ScrapeRecipeData,
  CreateRecipeByUrlBulk,
  AssignTags,
  AssignSettings,
  AssignCategories,
  DeleteRecipes,
  ExportRecipes,
  GroupDataExport,
  RecipeSuggestionResponse,
  UpdateImageResponse,
  RecipeQueryParams,
  RecipeSuggestionQueryParams,
  PaginationBase,
  SuccessResponse,
} from '../types/index.js';

export class RecipeService extends MealieClient {
  // ===================== Recipe Exports =====================

  /**
   * Get available recipe formats and templates
   */
  async getRecipeFormatsAndTemplates(): Promise<FormatResponse> {
    return this.get<FormatResponse>('/api/recipes/exports');
  }

  /**
   * Get recipe zip token
   */
  async getRecipeZipToken(slug: string): Promise<RecipeZipTokenResponse> {
    return this.post<RecipeZipTokenResponse>(`/api/recipes/${slug}/exports`);
  }

  /**
   * Get recipe as format
   */
  async getRecipeAsFormat(slug: string, templateName: string): Promise<void> {
    return this.get<void>(`/api/recipes/${slug}/exports?template_name=${encodeURIComponent(templateName)}`);
  }

  /**
   * Get recipe as zip
   */
  async getRecipeAsZip(slug: string, token: string): Promise<void> {
    return this.get<void>(`/api/recipes/${slug}/exports/zip?token=${encodeURIComponent(token)}`);
  }

  // ===================== Recipe CRUD =====================

  /**
   * Test parse recipe URL
   */
  async testParseRecipeUrl(test: ScrapeRecipeTest): Promise<any> {
    return this.post<any>('/api/recipes/test-scrape-url', test);
  }

  /**
   * Create recipe from HTML or JSON
   */
  async createRecipeFromHtmlOrJson(data: ScrapeRecipeData): Promise<any> {
    return this.post<any>('/api/recipes/create/html-or-json', data);
  }

  /**
   * Parse recipe URL and create recipe
   */
  async parseRecipeUrl(scrape: ScrapeRecipe): Promise<string> {
    return this.post<string>('/api/recipes/create/url', scrape);
  }

  /**
   * Parse recipe URL bulk
   */
  async parseRecipeUrlBulk(bulk: CreateRecipeByUrlBulk): Promise<void> {
    return this.post<void>('/api/recipes/create/url/bulk', bulk);
  }

  /**
   * Create recipe from zip file
   */
  async createRecipeFromZip(archive: File | Blob): Promise<any> {
    const formData = new FormData();
    formData.append('archive', archive);

    return this.request<any>('/api/recipes/create/zip', {
      method: 'POST',
      body: formData,
    });
  }

  /**
   * Create recipe from image
   */
  async createRecipeFromImage(images: File | Blob | File[] | Blob[], translateLanguage?: string): Promise<any> {
    const formData = new FormData();

    if (Array.isArray(images)) {
      images.forEach((image) => {
        formData.append(`images`, image);
      });
    } else {
      formData.append('images', images);
    }

    const queryParams = translateLanguage ? `?translateLanguage=${encodeURIComponent(translateLanguage)}` : '';

    return this.request<any>(`/api/recipes/create/image${queryParams}`, {
      method: 'POST',
      body: formData,
    });
  }

  /**
   * Get all recipes
   */
  async getAllRecipes(params?: RecipeQueryParams): Promise<PaginationBase<RecipeSummary>> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item) => queryParams.append(key, item.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const queryString = queryParams.toString();
    const path = queryString ? `/api/recipes?${queryString}` : '/api/recipes';

    return this.get<PaginationBase<RecipeSummary>>(path);
  }

  /**
   * Create a new recipe
   */
  async createRecipe(recipe: CreateRecipe): Promise<string> {
    return this.post<string>('/api/recipes', recipe);
  }

  /**
   * Update multiple recipes
   */
  async updateManyRecipes(recipes: Recipe[]): Promise<void> {
    return this.put<void>('/api/recipes', recipes);
  }

  /**
   * Patch multiple recipes
   */
  async patchManyRecipes(recipes: Recipe[]): Promise<void> {
    return this.patch<void>('/api/recipes', recipes);
  }

  /**
   * Get recipe suggestions
   */
  async suggestRecipes(params?: RecipeSuggestionQueryParams): Promise<RecipeSuggestionResponse> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item) => queryParams.append(key, item.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const queryString = queryParams.toString();
    const path = queryString ? `/api/recipes/suggestions?${queryString}` : '/api/recipes/suggestions';

    return this.get<RecipeSuggestionResponse>(path);
  }

  /**
   * Get a single recipe
   */
  async getRecipe(slug: string): Promise<Recipe> {
    return this.get<Recipe>(`/api/recipes/${slug}`);
  }

  /**
   * Update a single recipe
   */
  async updateRecipe(slug: string, recipe: Recipe): Promise<void> {
    return this.put<void>(`/api/recipes/${slug}`, recipe);
  }

  /**
   * Patch a single recipe
   */
  async patchRecipe(slug: string, recipe: Partial<Recipe>): Promise<void> {
    return this.patch<void>(`/api/recipes/${slug}`, recipe);
  }

  /**
   * Delete a single recipe
   */
  async deleteRecipe(slug: string): Promise<void> {
    return this.delete<void>(`/api/recipes/${slug}`);
  }

  /**
   * Duplicate a recipe
   */
  async duplicateRecipe(slug: string, duplicate?: RecipeDuplicate): Promise<Recipe> {
    return this.post<Recipe>(`/api/recipes/${slug}/duplicate`, duplicate);
  }

  /**
   * Update last made date for a recipe
   */
  async updateLastMade(slug: string, lastMade: RecipeLastMade): Promise<void> {
    return this.patch<void>(`/api/recipes/${slug}/last-made`, lastMade);
  }

  // ===================== Recipe Images and Assets =====================

  /**
   * Scrape image URL for a recipe
   */
  async scrapeImageUrl(slug: string, scrape: ScrapeRecipe): Promise<void> {
    return this.post<void>(`/api/recipes/${slug}/image`, scrape);
  }

  /**
   * Update recipe image
   */
  async updateRecipeImage(slug: string, image: File | Blob, extension: string): Promise<UpdateImageResponse> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('extension', extension);

    return this.request<UpdateImageResponse>(`/api/recipes/${slug}/image`, {
      method: 'PUT',
      body: formData,
    });
  }

  /**
   * Upload recipe asset
   */
  async uploadRecipeAsset(
    slug: string,
    file: File | Blob,
    name: string,
    icon: string,
    extension: string,
  ): Promise<RecipeAsset> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('icon', icon);
    formData.append('extension', extension);

    return this.request<RecipeAsset>(`/api/recipes/${slug}/assets`, {
      method: 'POST',
      body: formData,
    });
  }

  // ===================== Recipe Comments =====================

  /**
   * Get recipe comments
   */
  async getRecipeComments(slug: string): Promise<RecipeCommentOut[]> {
    return this.get<RecipeCommentOut[]>(`/api/recipes/${slug}/comments`);
  }

  // ===================== Recipe Bulk Actions =====================

  /**
   * Bulk tag recipes
   */
  async bulkTagRecipes(data: AssignTags): Promise<void> {
    return this.post<void>('/api/recipes/bulk-actions/tag', data);
  }

  /**
   * Bulk update recipe settings
   */
  async bulkSettingsRecipes(data: AssignSettings): Promise<void> {
    return this.post<void>('/api/recipes/bulk-actions/settings', data);
  }

  /**
   * Bulk categorize recipes
   */
  async bulkCategorizeRecipes(data: AssignCategories): Promise<void> {
    return this.post<void>('/api/recipes/bulk-actions/categorize', data);
  }

  /**
   * Bulk delete recipes
   */
  async bulkDeleteRecipes(data: DeleteRecipes): Promise<void> {
    return this.post<void>('/api/recipes/bulk-actions/delete', data);
  }

  /**
   * Bulk export recipes
   */
  async bulkExportRecipes(data: ExportRecipes): Promise<void> {
    return this.post<void>('/api/recipes/bulk-actions/export', data);
  }

  /**
   * Get exported data
   */
  async getExportedData(): Promise<GroupDataExport[]> {
    return this.get<GroupDataExport[]>('/api/recipes/bulk-actions/export');
  }

  /**
   * Get exported data token
   */
  async getExportedDataToken(path: string): Promise<void> {
    return this.get<void>(`/api/recipes/bulk-actions/export/download?path=${encodeURIComponent(path)}`);
  }

  /**
   * Purge export data
   */
  async purgeExportData(): Promise<SuccessResponse> {
    return this.delete<SuccessResponse>('/api/recipes/bulk-actions/export/purge');
  }

  // ===================== Recipe Shared =====================

  /**
   * Get shared recipe
   */
  async getSharedRecipe(tokenId: string): Promise<Recipe> {
    return this.get<Recipe>(`/api/recipes/shared/${tokenId}`);
  }

  // ===================== Recipe Timeline =====================

  /**
   * Get all timeline events
   */
  async getAllTimelineEvents(params?: RecipeQueryParams): Promise<RecipeTimelineEventPagination> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item) => queryParams.append(key, item.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const queryString = queryParams.toString();
    const path = queryString ? `/api/recipes/timeline/events?${queryString}` : '/api/recipes/timeline/events';

    return this.get<RecipeTimelineEventPagination>(path);
  }

  /**
   * Create timeline event
   */
  async createTimelineEvent(event: RecipeTimelineEventIn): Promise<RecipeTimelineEventOut> {
    return this.post<RecipeTimelineEventOut>('/api/recipes/timeline/events', event);
  }

  /**
   * Get timeline event
   */
  async getTimelineEvent(eventId: string): Promise<RecipeTimelineEventOut> {
    return this.get<RecipeTimelineEventOut>(`/api/recipes/timeline/events/${eventId}`);
  }

  /**
   * Update timeline event
   */
  async updateTimelineEvent(eventId: string, event: RecipeTimelineEventUpdate): Promise<RecipeTimelineEventOut> {
    return this.put<RecipeTimelineEventOut>(`/api/recipes/timeline/events/${eventId}`, event);
  }

  /**
   * Delete timeline event
   */
  async deleteTimelineEvent(eventId: string): Promise<RecipeTimelineEventOut> {
    return this.delete<RecipeTimelineEventOut>(`/api/recipes/timeline/events/${eventId}`);
  }

  /**
   * Update timeline event image
   */
  async updateTimelineEventImage(eventId: string, image: File | Blob, extension: string): Promise<UpdateImageResponse> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('extension', extension);

    return this.request<UpdateImageResponse>(`/api/recipes/timeline/events/${eventId}/image`, {
      method: 'PUT',
      body: formData,
    });
  }
}
