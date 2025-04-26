// admin types
import type { PaginationQuery } from './user.js';

export interface AdminAboutInfo {
  production: boolean;
  version: string;
  demoStatus: boolean;
  allowSignup: boolean;
  enableOidc: boolean;
  oidcRedirect: string;
  oidcProviderName: string;
  enableOpenai: boolean;
  enableOpenaiImageServices: boolean;
  versionLatest: string;
  apiPort: number;
  apiDocs: string;
  dbType: string;
  defaultGroup: string;
  defaultHousehold: string;
  buildId: string;
  recipeScraperVersion: string;
}

export interface AppStatistics {
  totalRecipes: number;
  totalUsers: number;
  totalHouseholds: number;
  totalGroups: number;
  uncategorizedRecipes: number;
  untaggedRecipes: number;
}

export interface CheckAppConfig {
  emailReady: boolean;
  ldapReady: boolean;
  oidcReady: boolean;
  enableOpenai: boolean;
  baseUrlSet: boolean;
  isUpToDate: boolean;
}

export interface AdminUserIn {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

export interface AdminUserOut {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  admin?: boolean;
  group?: string;
  household?: string;
  groupId?: string;
  groupSlug?: string;
  householdId?: string;
  householdSlug?: string;
  cacheKey?: string;
}

export interface AdminUserPagination {
  items: AdminUserOut[];
  page?: number;
  total?: number;
  total_pages?: number;
  perPage?: number;
  next?: string;
  previous?: string;
}

export interface UnlockResults {
  unlocked?: number;
  errors?: number;
}

export interface AdminForgotPassword {
  email: string;
}

export interface PasswordResetToken {
  token: string;
}

export interface HouseholdCreate {
  name: string;
}

export interface AdminHouseholdInDB {
  groupId: string;
  name: string;
  id: string;
  slug: string;
  group?: any;
}

export interface HouseholdPagination {
  items: AdminHouseholdInDB[];
  page?: number;
  total?: number;
  total_pages?: number;
  perPage?: number;
  next?: string;
  previous?: string;
}

export interface UpdateHouseholdAdmin {
  groupId: string;
  name: string;
  id: string;
}

export interface GroupBase {
  name: string;
}

export interface GroupInDB {
  name: string;
  id: string;
  slug: string;
}

export interface GroupAdminUpdate {
  id: string;
  name: string;
}

export interface GroupPagination {
  items: GroupInDB[];
  page?: number;
  total?: number;
  total_pages?: number;
  perPage?: number;
  next?: string;
  previous?: string;
}

export interface EmailReady {
  ready: boolean;
}

export interface EmailTest {
  email: string;
}

export interface EmailSuccess {
  success: boolean;
}

export interface BackupFile {
  name: string;
  date: string;
  size: number;
}

export interface AllBackups {
  imports: BackupFile[];
  templates: string[];
}

export interface FileTokenResponse {
  fileToken: string;
}

export interface MaintenanceSummary {
  dataDirSize: string;
  cleanableImages: number;
  cleanableDirs: string[];
}

export interface MaintenanceStorageDetails {
  tempDirSize: string;
  backupsDirSize: string;
  groupsDirSize: string;
  recipesDirSize: string;
  userDirSize: string;
}

export interface DebugResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface AdminPaginationQuery extends PaginationQuery {
  queryFilter?: string;
  paginationSeed?: string;
}
