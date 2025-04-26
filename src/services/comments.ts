import { MealieClient } from '../client.js';
import type {
  RecipeCommentOut,
  RecipeCommentCreate,
  RecipeCommentUpdate,
  RecipeCommentPagination,
  SuccessResponse,
  CommentQueryParams,
} from '../types/index.js';

export class CommentsService extends MealieClient {
  /**
   * Get all comments with optional filtering and pagination
   * @param params Optional query parameters for filtering, ordering, and pagination
   * @returns Paginated list of comments
   */
  async getAllComments(params?: CommentQueryParams): Promise<RecipeCommentPagination> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const path = queryString ? `/api/comments?${queryString}` : '/api/comments';

    return this.get<RecipeCommentPagination>(path);
  }

  /**
   * Create a new comment for a recipe
   * @param comment The comment to create
   * @returns The created comment
   */
  async createComment(comment: RecipeCommentCreate): Promise<RecipeCommentOut> {
    return this.post<RecipeCommentOut>('/api/comments', comment);
  }

  /**
   * Get a specific comment by ID
   * @param commentId The ID of the comment to retrieve
   * @returns The requested comment
   */
  async getComment(commentId: string): Promise<RecipeCommentOut> {
    return this.get<RecipeCommentOut>(`/api/comments/${commentId}`);
  }

  /**
   * Update an existing comment
   * @param commentId The ID of the comment to update
   * @param comment The updated comment data
   * @returns The updated comment
   */
  async updateComment(commentId: string, comment: RecipeCommentUpdate): Promise<RecipeCommentOut> {
    return this.put<RecipeCommentOut>(`/api/comments/${commentId}`, comment);
  }

  /**
   * Delete a comment
   * @param commentId The ID of the comment to delete
   * @returns Success response
   */
  async deleteComment(commentId: string): Promise<SuccessResponse> {
    return this.delete<SuccessResponse>(`/api/comments/${commentId}`);
  }
}
