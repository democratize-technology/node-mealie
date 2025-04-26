import { MealieClient } from '../client.js';
import type {
  UserOut,
  UserIn,
  CreateUserRegistration,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
  LongLiveTokenIn,
  LongLiveTokenCreateResponse,
  DeleteTokenResponse,
  UserRatingSummary,
  UserRatingUpdate,
  UserRatingOut,
  UserRatings,
  UserPagination,
  PaginationQuery,
  UserBase,
} from '../types/index.js';

export class UserService extends MealieClient {
  /**
   * Register a new user
   */
  async register(data: CreateUserRegistration): Promise<UserOut> {
    return this.post<UserOut>('/api/users/register', data);
  }

  /**
   * Get the currently logged in user
   */
  async getCurrentUser(): Promise<UserOut> {
    return this.get<UserOut>('/api/users/self');
  }

  /**
   * Get all ratings for the currently logged in user
   */
  async getCurrentUserRatings(): Promise<UserRatings<UserRatingSummary>> {
    return this.get<UserRatings<UserRatingSummary>>('/api/users/self/ratings');
  }

  /**
   * Get rating for a specific recipe for the currently logged in user
   */
  async getCurrentUserRatingForRecipe(recipeId: string): Promise<UserRatingSummary> {
    return this.get<UserRatingSummary>(`/api/users/self/ratings/${recipeId}`);
  }

  /**
   * Get all favorites for the currently logged in user
   */
  async getCurrentUserFavorites(): Promise<UserRatings<UserRatingSummary>> {
    return this.get<UserRatings<UserRatingSummary>>('/api/users/self/favorites');
  }

  /**
   * Update the password for the currently logged in user
   */
  async updatePassword(data: ChangePassword): Promise<void> {
    return this.put<void>('/api/users/password', data);
  }

  /**
   * Get a specific user (admin only)
   */
  async getUser(userId: string): Promise<UserOut> {
    return this.get<UserOut>(`/api/users/${userId}`);
  }

  /**
   * Update a user (admin only)
   */
  async updateUser(userId: string, data: UserBase): Promise<void> {
    return this.put<void>(`/api/users/${userId}`, data);
  }

  /**
   * Delete a user (admin only)
   */
  async deleteUser(userId: string): Promise<void> {
    return this.delete<void>(`/api/users/${userId}`);
  }

  /**
   * Get all users with pagination (admin only)
   */
  async getUsers(params?: PaginationQuery): Promise<UserPagination> {
    const queryParams = new URLSearchParams();
    if (params) {
      if (params.page !== undefined) queryParams.append('page', params.page.toString());
      if (params.perPage !== undefined) queryParams.append('perPage', params.perPage.toString());
      if (params.orderBy) queryParams.append('orderBy', params.orderBy);
      if (params.orderDirection) queryParams.append('orderDirection', params.orderDirection);
      if (params.orderByNullPosition) queryParams.append('orderByNullPosition', params.orderByNullPosition);
      if (params.queryFilter) queryParams.append('queryFilter', params.queryFilter);
      if (params.paginationSeed) queryParams.append('paginationSeed', params.paginationSeed);
    }

    const queryString = queryParams.toString();
    const path = queryString ? `/api/users?${queryString}` : '/api/users';
    return this.get<UserPagination>(path);
  }

  /**
   * Create a new user (admin only)
   */
  async createUser(data: UserIn): Promise<UserOut> {
    return this.post<UserOut>('/api/users', data);
  }

  /**
   * Initiate forgot password flow
   */
  async forgotPassword(data: ForgotPassword): Promise<void> {
    return this.post<void>('/api/users/forgot-password', data);
  }

  /**
   * Reset password using token
   */
  async resetPassword(data: ResetPassword): Promise<void> {
    return this.post<void>('/api/users/reset-password', data);
  }

  /**
   * Update a user's profile image
   */
  async updateUserImage(userId: string, profileImage: File | Blob): Promise<void> {
    const formData = new FormData();
    formData.append('profile', profileImage);

    return this.request<void>(`/api/users/${userId}/image`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type for FormData - browser will set it with boundary
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });
  }

  /**
   * Create an API token
   */
  async createApiToken(data: LongLiveTokenIn): Promise<LongLiveTokenCreateResponse> {
    return this.post<LongLiveTokenCreateResponse>('/api/users/api-tokens', data);
  }

  /**
   * Delete an API token
   */
  async deleteApiToken(tokenId: number): Promise<DeleteTokenResponse> {
    return this.delete<DeleteTokenResponse>(`/api/users/api-tokens/${tokenId}`);
  }

  /**
   * Get ratings for a specific user
   */
  async getUserRatings(userId: string): Promise<UserRatings<UserRatingOut>> {
    return this.get<UserRatings<UserRatingOut>>(`/api/users/${userId}/ratings`);
  }

  /**
   * Get favorites for a specific user
   */
  async getUserFavorites(userId: string): Promise<UserRatings<UserRatingOut>> {
    return this.get<UserRatings<UserRatingOut>>(`/api/users/${userId}/favorites`);
  }

  /**
   * Set rating for a recipe
   */
  async setRating(userId: string, recipeSlug: string, data: UserRatingUpdate): Promise<void> {
    return this.post<void>(`/api/users/${userId}/ratings/${recipeSlug}`, data);
  }

  /**
   * Add a recipe to favorites
   */
  async addFavorite(userId: string, recipeSlug: string): Promise<void> {
    return this.post<void>(`/api/users/${userId}/favorites/${recipeSlug}`);
  }

  /**
   * Remove a recipe from favorites
   */
  async removeFavorite(userId: string, recipeSlug: string): Promise<void> {
    return this.delete<void>(`/api/users/${userId}/favorites/${recipeSlug}`);
  }
}
