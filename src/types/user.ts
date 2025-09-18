// User Registration Types
export interface CreateUserRegistration {
  email: string;
  username: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
}

// User Types
export interface UserBase {
  email: string;
}

export interface UserOut {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  admin?: boolean;
  group: string;
  household: string;
  groupId: string;
  groupSlug: string;
  householdId: string;
  householdSlug: string;
  cacheKey: string;
  tokens?: LongLiveTokenOut[];
}

export interface UserIn {
  username: string;
  fullName: string;
  email: string;
  password: string;
  admin?: boolean;
  group?: string;
  household?: string;
  advanced?: boolean;
  canInvite?: boolean;
  canManage?: boolean;
  canOrganize?: boolean;
}

// Password Types
export interface ChangePassword {
  currentPassword?: string;  // Optional for admin operations
  newPassword: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  token: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// Token Types
export interface LongLiveTokenIn {
  name: string;
}

export interface LongLiveTokenOut {
  name: string;
  id: number;
}

export interface LongLiveTokenCreateResponse extends LongLiveTokenOut {
  token: string;
}

export interface DeleteTokenResponse {
  tokenDelete: boolean;
}

// Rating Types
export interface UserRatingOut {
  recipeId: string;
  userId: string;
  id: string;
  rating?: number;
  isFavorite?: boolean;
}

export type UserRatingSummary = Omit<UserRatingOut, 'id' | 'userId'>;

export interface UserRatingUpdate {
  rating?: number;
  isFavorite?: boolean;
}

export type UserRatings = UserRatingOut[];

// Pagination Types
import { PaginationBase, QueryParams } from './common';

export type UserPagination = PaginationBase<UserOut>;

export type PaginationQuery = QueryParams;

// Image Types
export interface UserImageUpdate {
  profile: File | Blob;
}
