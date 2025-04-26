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

export interface UserRatingSummary {
  recipeId: string;
  rating?: number;
  isFavorite?: boolean;
}

export interface UserRatingUpdate {
  rating?: number;
  isFavorite?: boolean;
}

export interface UserRatings<T> {
  ratings: T[];
}

// Pagination Types
export interface UserPagination {
  items: UserOut[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  perPage?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  orderByNullPosition?: 'first' | 'last';
  queryFilter?: string;
  paginationSeed?: string;
}

// Image Types
export interface UserImageUpdate {
  profile: File | Blob;
}
