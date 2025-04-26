/**
 * Tests for the Groups service - Migrations API
 */

import { GroupsService } from '../../../services/groups';
import { MealieClient } from '../../../client';
import {
  ReportSummary,
  ReportCategory,
  SupportedMigrations,
} from '../../../types/groups';

// Mock the client
jest.mock('../../../client');

describe('Groups Service - Migrations API', () => {
  let groupsService: GroupsService;

  beforeEach(() => {
    groupsService = new GroupsService({ baseURL: 'http://localhost' });
    groupsService.post = jest.fn();
  });

  test('startDataMigration should upload migration file', async () => {
    const mockResponse: ReportSummary = {
      id: 'r1',
      name: 'Migration Report',
      groupId: 'g1',
      category: ReportCategory.MIGRATION,
    };

    const mockFile = new Blob(['test content'], { type: 'application/zip' });
    const migrationParams = {
      migration_type: SupportedMigrations.CHOWDOWN,
      archive: mockFile,
    };

    (groupsService.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.startDataMigration(migrationParams);

    expect(result).toEqual(mockResponse);
    expect(groupsService.post).toHaveBeenCalledWith(
      '/api/groups/migrations',
      expect.any(FormData),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  });

  test('should handle FormData creation correctly', async () => {
    const mockResponse: ReportSummary = {
      id: 'r1',
      name: 'Migration Report',
      groupId: 'g1',
      category: ReportCategory.MIGRATION,
    };

    const mockFile = new File(['test content'], 'migration.zip', { type: 'application/zip' });
    const migrationParams = {
      migration_type: SupportedMigrations.MEALIE_ALPHA,
      archive: mockFile,
    };

    let capturedFormData: FormData | null = null;

    (groupsService.post as jest.Mock).mockImplementation((path, data) => {
      capturedFormData = data;
      return Promise.resolve(mockResponse);
    });

    await groupsService.startDataMigration(migrationParams);

    expect(capturedFormData).toBeInstanceOf(FormData);
    expect(capturedFormData?.get('migration_type')).toBe(SupportedMigrations.MEALIE_ALPHA);
    expect(capturedFormData?.get('archive')).toBe(mockFile);
  });
});
