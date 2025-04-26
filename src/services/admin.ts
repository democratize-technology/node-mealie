// Admin service
import { MealieClient } from '../client.js';
import type {
  AdminAboutInfo,
  AppStatistics,
  CheckAppConfig,
  AdminUserIn,
  AdminUserOut,
  AdminUserPagination,
  UnlockResults,
  AdminForgotPassword,
  PasswordResetToken,
  HouseholdCreate,
  AdminHouseholdInDB,
  HouseholdPagination,
  UpdateHouseholdAdmin,
  GroupBase,
  GroupInDB,
  GroupAdminUpdate,
  GroupPagination,
  EmailReady,
  EmailTest,
  EmailSuccess,
  AllBackups,
  FileTokenResponse,
  MaintenanceSummary,
  MaintenanceStorageDetails,
  DebugResponse,
  AdminPaginationQuery,
} from '../types/admin.js';
import type { SuccessResponse } from '../types/common.js';
import { buildQueryParams } from '../utils/query-builder.js';

export class AdminService extends MealieClient {
  /**
   * Get application info
   */
  async getAppInfo(acceptLanguage?: string): Promise<AdminAboutInfo> {
    return this.get<AdminAboutInfo>('/api/admin/about', {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get application statistics
   */
  async getAppStatistics(acceptLanguage?: string): Promise<AppStatistics> {
    return this.get<AppStatistics>('/api/admin/about/statistics', {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Check application configuration
   */
  async checkAppConfig(acceptLanguage?: string): Promise<CheckAppConfig> {
    return this.get<CheckAppConfig>('/api/admin/about/check', {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get all users
   */
  async getAllUsers(options?: AdminPaginationQuery & { acceptLanguage?: string }): Promise<AdminUserPagination> {
    const headers: Record<string, string> = options?.acceptLanguage ? { 'Accept-Language': options.acceptLanguage } : {};
    const queryParams = { ...options };
    delete queryParams.acceptLanguage;
    
    const query = buildQueryParams<AdminPaginationQuery>(queryParams);
    return this.get<AdminUserPagination>(`/api/admin/users${query}`, { headers });
  }

  /**
   * Create a new user
   */
  async createUser(data: AdminUserIn, acceptLanguage?: string): Promise<AdminUserOut> {
    return this.post<AdminUserOut>('/api/admin/users', data, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Unlock users
   */
  async unlockUsers(force = false, acceptLanguage?: string): Promise<UnlockResults> {
    return this.post<UnlockResults>(`/api/admin/users/unlock?force=${force}`, undefined, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get a specific user
   */
  async getUser(userId: string, acceptLanguage?: string): Promise<AdminUserOut> {
    return this.get<AdminUserOut>(`/api/admin/users/${userId}`, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Update a user
   */
  async updateUser(userId: string, data: AdminUserOut, acceptLanguage?: string): Promise<AdminUserOut> {
    return this.put<AdminUserOut>(`/api/admin/users/${userId}`, data, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Delete a user
   */
  async deleteUser(userId: string, acceptLanguage?: string): Promise<AdminUserOut> {
    return this.delete<AdminUserOut>(`/api/admin/users/${userId}`, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Generate password reset token
   */
  async generatePasswordResetToken(data: AdminForgotPassword, acceptLanguage?: string): Promise<PasswordResetToken> {
    return this.post<PasswordResetToken>('/api/admin/users/password-reset-token', data, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get all households
   */
  async getAllHouseholds(options?: AdminPaginationQuery & { acceptLanguage?: string }): Promise<HouseholdPagination> {
    const headers: Record<string, string> = options?.acceptLanguage ? { 'Accept-Language': options.acceptLanguage } : {};
    const queryParams = { ...options };
    delete queryParams.acceptLanguage;
    
    const query = buildQueryParams<AdminPaginationQuery>(queryParams);
    return this.get<HouseholdPagination>(`/api/admin/households${query}`, { headers });
  }

  /**
   * Create a new household
   */
  async createHousehold(data: HouseholdCreate, acceptLanguage?: string): Promise<AdminHouseholdInDB> {
    return this.post<AdminHouseholdInDB>('/api/admin/households', data, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get a specific household
   */
  async getHousehold(householdId: string, acceptLanguage?: string): Promise<AdminHouseholdInDB> {
    return this.get<AdminHouseholdInDB>(`/api/admin/households/${householdId}`, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Update a household
   */
  async updateHousehold(householdId: string, data: UpdateHouseholdAdmin, acceptLanguage?: string): Promise<AdminHouseholdInDB> {
    return this.put<AdminHouseholdInDB>(`/api/admin/households/${householdId}`, data, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Delete a household
   */
  async deleteHousehold(householdId: string, acceptLanguage?: string): Promise<AdminHouseholdInDB> {
    return this.delete<AdminHouseholdInDB>(`/api/admin/households/${householdId}`, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get all groups
   */
  async getAllGroups(options?: AdminPaginationQuery & { acceptLanguage?: string }): Promise<GroupPagination> {
    const headers: Record<string, string> = options?.acceptLanguage ? { 'Accept-Language': options.acceptLanguage } : {};
    const queryParams = { ...options };
    delete queryParams.acceptLanguage;
    
    const query = buildQueryParams<AdminPaginationQuery>(queryParams);
    return this.get<GroupPagination>(`/api/admin/groups${query}`, { headers });
  }

  /**
   * Create a new group
   */
  async createGroup(data: GroupBase, acceptLanguage?: string): Promise<GroupInDB> {
    return this.post<GroupInDB>('/api/admin/groups', data, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get a specific group
   */
  async getGroup(groupId: string, acceptLanguage?: string): Promise<GroupInDB> {
    return this.get<GroupInDB>(`/api/admin/groups/${groupId}`, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Update a group
   */
  async updateGroup(groupId: string, data: GroupAdminUpdate, acceptLanguage?: string): Promise<GroupInDB> {
    return this.put<GroupInDB>(`/api/admin/groups/${groupId}`, data, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Delete a group
   */
  async deleteGroup(groupId: string, acceptLanguage?: string): Promise<GroupInDB> {
    return this.delete<GroupInDB>(`/api/admin/groups/${groupId}`, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Check email configuration
   */
  async checkEmailConfig(acceptLanguage?: string): Promise<EmailReady> {
    return this.get<EmailReady>('/api/admin/email', {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Send test email
   */
  async sendTestEmail(data: EmailTest, acceptLanguage?: string): Promise<EmailSuccess> {
    return this.post<EmailSuccess>('/api/admin/email', data, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get all backups
   */
  async getAllBackups(acceptLanguage?: string): Promise<AllBackups> {
    return this.get<AllBackups>('/api/admin/backups', {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Create backup
   */
  async createBackup(acceptLanguage?: string): Promise<SuccessResponse> {
    return this.post<SuccessResponse>('/api/admin/backups', undefined, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get specific backup file token
   */
  async getBackupToken(fileName: string, acceptLanguage?: string): Promise<FileTokenResponse> {
    return this.get<FileTokenResponse>(`/api/admin/backups/${fileName}`, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Delete backup
   */
  async deleteBackup(fileName: string, acceptLanguage?: string): Promise<SuccessResponse> {
    return this.delete<SuccessResponse>(`/api/admin/backups/${fileName}`, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Upload backup file
   */
  async uploadBackup(archive: File, acceptLanguage?: string): Promise<SuccessResponse> {
    const formData = new FormData();
    formData.append('archive', archive);

    return this.request<SuccessResponse>('/api/admin/backups/upload', {
      method: 'POST',
      body: formData,
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Restore from backup
   */
  async restoreBackup(fileName: string, acceptLanguage?: string): Promise<SuccessResponse> {
    return this.post<SuccessResponse>(`/api/admin/backups/${fileName}/restore`, undefined, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get maintenance summary
   */
  async getMaintenanceSummary(acceptLanguage?: string): Promise<MaintenanceSummary> {
    return this.get<MaintenanceSummary>('/api/admin/maintenance', {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Get storage details
   */
  async getStorageDetails(acceptLanguage?: string): Promise<MaintenanceStorageDetails> {
    return this.get<MaintenanceStorageDetails>('/api/admin/maintenance/storage', {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Clean images
   */
  async cleanImages(acceptLanguage?: string): Promise<SuccessResponse> {
    return this.post<SuccessResponse>('/api/admin/maintenance/clean/images', undefined, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Clean temp files
   */
  async cleanTemp(acceptLanguage?: string): Promise<SuccessResponse> {
    return this.post<SuccessResponse>('/api/admin/maintenance/clean/temp', undefined, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Clean recipe folders
   */
  async cleanRecipeFolders(acceptLanguage?: string): Promise<SuccessResponse> {
    return this.post<SuccessResponse>('/api/admin/maintenance/clean/recipe-folders', undefined, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }

  /**
   * Debug OpenAI
   */
  async debugOpenAI(file?: File, acceptLanguage?: string): Promise<DebugResponse> {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      return this.request<DebugResponse>('/api/admin/debug/openai', {
        method: 'POST',
        body: formData,
        headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
      });
    }

    return this.post<DebugResponse>('/api/admin/debug/openai', undefined, {
      headers: acceptLanguage ? { 'Accept-Language': acceptLanguage } : {},
    });
  }
}
