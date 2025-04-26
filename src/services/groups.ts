/**
 * Groups service - implements all groups-related API endpoints
 * Based on the provided OpenAPI specification
 */

import { MealieClient } from '../client.js';
import type { QueryParams, SuccessResponse, PaginationBase } from '../types/common.js';
import type {
  // Group types
  GroupSummary,
  GroupStorage,
  ReadGroupPreferences,
  UpdateGroupPreferences,

  // Households
  HouseholdSummary,

  // Users
  UserSummary,

  // Reports
  ReportSummary,
  ReportOut,
  ReportCategory,

  // Labels
  MultiPurposeLabelCreate,
  MultiPurposeLabelUpdate,
  MultiPurposeLabelOut,
  MultiPurposeLabelPagination,

  // Seeders
  SeederConfig,

  // Migrations
  MigrationParams,
} from '../types/groups.js';

export class GroupsService extends MealieClient {

  private buildQueryParams(params?: QueryParams): string {
    if (!params) return '';

    const queryParts: string[] = [];

    if (params.orderBy !== undefined) queryParts.push(`orderBy=${encodeURIComponent(params.orderBy)}`);
    if (params.orderByNullPosition !== undefined) queryParts.push(`orderByNullPosition=${params.orderByNullPosition}`);
    if (params.orderDirection !== undefined) queryParts.push(`orderDirection=${params.orderDirection}`);
    if (params.queryFilter !== undefined) queryParts.push(`queryFilter=${encodeURIComponent(params.queryFilter)}`);
    if (params.paginationSeed !== undefined)
      queryParts.push(`paginationSeed=${encodeURIComponent(params.paginationSeed)}`);
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.perPage !== undefined) queryParts.push(`perPage=${params.perPage}`);

    return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  }

  // Households API
  async getAllHouseholds(params?: QueryParams): Promise<PaginationBase<HouseholdSummary>> {
    const path = `/api/groups/households${this.buildQueryParams(params)}`;
    return this.get<PaginationBase<HouseholdSummary>>(path);
  }

  async getOneHousehold(householdSlug: string): Promise<HouseholdSummary> {
    const path = `/api/groups/households/${householdSlug}`;
    return this.get<HouseholdSummary>(path);
  }

  // Self Service API
  async getSelf(): Promise<GroupSummary> {
    const path = '/api/groups/self';
    return this.get<GroupSummary>(path);
  }

  async getGroupMembers(params?: QueryParams): Promise<PaginationBase<UserSummary>> {
    const path = `/api/groups/members${this.buildQueryParams(params)}`;
    return this.get<PaginationBase<UserSummary>>(path);
  }

  async getGroupMember(usernameOrId: string): Promise<UserSummary> {
    const path = `/api/groups/members/${usernameOrId}`;
    return this.get<UserSummary>(path);
  }

  async getGroupPreferences(): Promise<ReadGroupPreferences> {
    const path = '/api/groups/preferences';
    return this.get<ReadGroupPreferences>(path);
  }

  async updateGroupPreferences(data: UpdateGroupPreferences): Promise<ReadGroupPreferences> {
    const path = '/api/groups/preferences';
    return this.put<ReadGroupPreferences>(path, data);
  }

  async getStorage(): Promise<GroupStorage> {
    const path = '/api/groups/storage';
    return this.get<GroupStorage>(path);
  }

  // Migrations API
  async startDataMigration(migrationParams: MigrationParams): Promise<ReportSummary> {
    const path = '/api/groups/migrations';

    // FormData is required for file upload
    const formData = new FormData();
    formData.append('migration_type', migrationParams.migration_type);
    formData.append('archive', migrationParams.archive);

    const requestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return this.post<ReportSummary>(path, formData, requestConfig);
  }

  // Reports API
  async getAllReports(reportType?: ReportCategory): Promise<ReportSummary[]> {
    const path = `/api/groups/reports${reportType ? `?report_type=${reportType}` : ''}`;
    return this.get<ReportSummary[]>(path);
  }

  async getOneReport(itemId: string): Promise<ReportOut> {
    const path = `/api/groups/reports/${itemId}`;
    return this.get<ReportOut>(path);
  }

  async deleteOneReport(itemId: string): Promise<void> {
    const path = `/api/groups/reports/${itemId}`;
    return this.delete<void>(path);
  }

  // Multi Purpose Labels API
  async getAllLabels(params?: QueryParams & { search?: string }): Promise<MultiPurposeLabelPagination> {
    const queryParts: string[] = [];

    if (params?.search !== undefined) queryParts.push(`search=${encodeURIComponent(params.search)}`);

    // Add standard query params
    const standardParams = this.buildQueryParams(params).replace('?', '');
    if (standardParams) queryParts.push(standardParams);

    const path = `/api/groups/labels${queryParts.length > 0 ? `?${queryParts.join('&')}` : ''}`;
    return this.get<MultiPurposeLabelPagination>(path);
  }

  async createLabel(data: MultiPurposeLabelCreate): Promise<MultiPurposeLabelOut> {
    const path = '/api/groups/labels';
    return this.post<MultiPurposeLabelOut>(path, data);
  }

  async getOneLabel(itemId: string): Promise<MultiPurposeLabelOut> {
    const path = `/api/groups/labels/${itemId}`;
    return this.get<MultiPurposeLabelOut>(path);
  }

  async updateLabel(itemId: string, data: MultiPurposeLabelUpdate): Promise<MultiPurposeLabelOut> {
    const path = `/api/groups/labels/${itemId}`;
    return this.put<MultiPurposeLabelOut>(path, data);
  }

  async deleteLabel(itemId: string): Promise<MultiPurposeLabelOut> {
    const path = `/api/groups/labels/${itemId}`;
    return this.delete<MultiPurposeLabelOut>(path);
  }

  // Seeders API
  async seedFoods(config: SeederConfig): Promise<SuccessResponse> {
    const path = '/api/groups/seeders/foods';
    return this.post<SuccessResponse>(path, config);
  }

  async seedLabels(config: SeederConfig): Promise<SuccessResponse> {
    const path = '/api/groups/seeders/labels';
    return this.post<SuccessResponse>(path, config);
  }

  async seedUnits(config: SeederConfig): Promise<SuccessResponse> {
    const path = '/api/groups/seeders/units';
    return this.post<SuccessResponse>(path, config);
  }
}
