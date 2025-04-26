/**
 * Group types for Mealie API
 * Based on the provided OpenAPI schema
 */

export interface UpdateGroupPreferences {
  // Properties based on provided API spec - empty object
}

export interface ReadGroupPreferences {
  groupId: string;
  id: string;
}

// Households types
export interface HouseholdSummary {
  groupId: string;
  name: string;
  id: string;
  slug: string;
}

// User types
export interface UserSummary {
  id: string;
  groupId: string;
  householdId: string;
  username: string;
  fullName: string;
}

// Reports types
export enum ReportCategory {
  BACKUP = 'backup',
  RESTORE = 'restore',
  MIGRATION = 'migration',
  BULK_IMPORT = 'bulk_import',
}

export enum ReportSummaryStatus {
  IN_PROGRESS = 'in-progress',
  SUCCESS = 'success',
  FAILURE = 'failure',
  PARTIAL = 'partial',
}

export interface ReportSummary {
  category: ReportCategory;
  groupId: string;
  name: string;
  id: string;
}

export interface ReportOut {
  category: ReportCategory;
  groupId: string;
  name: string;
  id: string;
}

export interface ReportEntryOut {
  reportId: string;
  message: string;
  id: string;
}

// Multi-purpose labels
export interface MultiPurposeLabelCreate {
  name: string;
}

export interface MultiPurposeLabelUpdate {
  name: string;
  groupId: string;
  id: string;
}

export interface MultiPurposeLabelOut {
  name: string;
  groupId: string;
  id: string;
}

export interface MultiPurposeLabelSummary {
  name: string;
  groupId: string;
  id: string;
}

export interface MultiPurposeLabelPagination {
  items: MultiPurposeLabelSummary[];
}

// Seeder types
export interface SeederConfig {
  locale: string;
}

// Migration types
export enum SupportedMigrations {
  NEXTCLOUD = 'nextcloud',
  CHOWDOWN = 'chowdown',
  COPYMETHAT = 'copymethat',
  PAPRIKA = 'paprika',
  MEALIE_ALPHA = 'mealie_alpha',
  TANDOOR = 'tandoor',
  PLANTOEAT = 'plantoeat',
  MYRECIPEBOX = 'myrecipebox',
  RECIPEKEEPER = 'recipekeeper',
}

export interface MigrationParams {
  migration_type: SupportedMigrations;
  archive: any; // File upload in multipart/form-data
}

// Group types
export interface GroupSummary {
  name: string;
  id: string;
  slug: string;
}

export interface GroupStorage {
  usedStorageBytes: number;
  usedStorageStr: string;
  totalStorageBytes: number;
  totalStorageStr: string;
}
