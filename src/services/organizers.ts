import { MealieClient } from '../client.js';
import type {
  CategoryBase,
  CategoryIn,
  CategorySummary,
  RecipeCategoryPagination,
  TagIn,
  RecipeTagResponse,
  RecipeTagPagination,
  RecipeToolCreate,
  RecipeTool,
  RecipeToolResponse,
  RecipeToolPagination,
  RecipeQueryParams,
} from '../types/index.js';

export class OrganizerService extends MealieClient {
  // ===================== Categories =====================

  /**
   * Get all categories with pagination
   */
  async getAllCategories(params?: RecipeQueryParams): Promise<RecipeCategoryPagination> {
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
    const path = queryString ? `/api/organizers/categories?${queryString}` : '/api/organizers/categories';

    return this.get<RecipeCategoryPagination>(path);
  }

  /**
   * Create a new category
   */
  async createCategory(category: CategoryIn): Promise<Record<string, never>> {
    return this.post<Record<string, never>>('/api/organizers/categories', category);
  }

  /**
   * Get all empty categories
   */
  async getAllEmptyCategories(): Promise<CategoryBase[]> {
    return this.get<CategoryBase[]>('/api/organizers/categories/empty');
  }

  /**
   * Get a single category by ID
   */
  async getCategoryById(id: string): Promise<CategorySummary> {
    return this.get<CategorySummary>(`/api/organizers/categories/${id}`);
  }

  /**
   * Update a category
   */
  async updateCategory(id: string, category: CategoryIn): Promise<CategorySummary> {
    return this.put<CategorySummary>(`/api/organizers/categories/${id}`, category);
  }

  /**
   * Delete a category
   */
  async deleteCategory(id: string): Promise<Record<string, never>> {
    return this.delete<Record<string, never>>(`/api/organizers/categories/${id}`);
  }

  /**
   * Get a category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Record<string, never>> {
    return this.get<Record<string, never>>(`/api/organizers/categories/slug/${slug}`);
  }

  // ===================== Tags =====================

  /**
   * Get all tags with pagination
   */
  async getAllTags(params?: RecipeQueryParams): Promise<RecipeTagPagination> {
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
    const path = queryString ? `/api/organizers/tags?${queryString}` : '/api/organizers/tags';

    return this.get<RecipeTagPagination>(path);
  }

  /**
   * Create a new tag
   */
  async createTag(tag: TagIn): Promise<Record<string, never>> {
    return this.post<Record<string, never>>('/api/organizers/tags', tag);
  }

  /**
   * Get all empty tags
   */
  async getEmptyTags(): Promise<Record<string, never>> {
    return this.get<Record<string, never>>('/api/organizers/tags/empty');
  }

  /**
   * Get a single tag by ID
   */
  async getTagById(id: string): Promise<RecipeTagResponse> {
    return this.get<RecipeTagResponse>(`/api/organizers/tags/${id}`);
  }

  /**
   * Update a tag
   */
  async updateTag(id: string, tag: TagIn): Promise<RecipeTagResponse> {
    return this.put<RecipeTagResponse>(`/api/organizers/tags/${id}`, tag);
  }

  /**
   * Delete a tag
   */
  async deleteTag(id: string): Promise<Record<string, never>> {
    return this.delete<Record<string, never>>(`/api/organizers/tags/${id}`);
  }

  /**
   * Get a tag by slug
   */
  async getTagBySlug(slug: string): Promise<RecipeTagResponse> {
    return this.get<RecipeTagResponse>(`/api/organizers/tags/slug/${slug}`);
  }

  // ===================== Tools =====================

  /**
   * Get all tools with pagination
   */
  async getAllTools(params?: RecipeQueryParams): Promise<RecipeToolPagination> {
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
    const path = queryString ? `/api/organizers/tools?${queryString}` : '/api/organizers/tools';

    return this.get<RecipeToolPagination>(path);
  }

  /**
   * Create a new tool
   */
  async createTool(tool: RecipeToolCreate): Promise<RecipeTool> {
    return this.post<RecipeTool>('/api/organizers/tools', tool);
  }

  /**
   * Get a single tool by ID
   */
  async getToolById(id: string): Promise<RecipeTool> {
    return this.get<RecipeTool>(`/api/organizers/tools/${id}`);
  }

  /**
   * Update a tool
   */
  async updateTool(id: string, tool: RecipeToolCreate): Promise<RecipeTool> {
    return this.put<RecipeTool>(`/api/organizers/tools/${id}`, tool);
  }

  /**
   * Delete a tool
   */
  async deleteTool(id: string): Promise<RecipeTool> {
    return this.delete<RecipeTool>(`/api/organizers/tools/${id}`);
  }

  /**
   * Get a tool by slug
   */
  async getToolBySlug(slug: string): Promise<RecipeToolResponse> {
    return this.get<RecipeToolResponse>(`/api/organizers/tools/slug/${slug}`);
  }
}
