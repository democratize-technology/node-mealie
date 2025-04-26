/**
 * Tests for the Groups service - Reports API
 */

import { GroupsService } from '../../../services/groups';
import { MealieClient } from '../../../client';
import {
  ReportSummary,
  ReportOut,
  ReportCategory,
} from '../../../types/groups';

// Mock the client
jest.mock('../../../client');

describe('Groups Service - Reports API', () => {
  let groupsService: GroupsService;

  beforeEach(() => {
    groupsService = new GroupsService({ baseURL: 'http://localhost' });
    groupsService.get = jest.fn();
    groupsService.delete = jest.fn();
  });

  test('getAllReports should get all reports', async () => {
    const mockResponse: ReportSummary[] = [
      { id: 'r1', name: 'Report 1', groupId: 'g1', category: ReportCategory.BACKUP },
      { id: 'r2', name: 'Report 2', groupId: 'g1', category: ReportCategory.MIGRATION },
    ];

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getAllReports();

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/reports');
  });

  test('getAllReports should filter by report type', async () => {
    const mockResponse: ReportSummary[] = [
      { id: 'r1', name: 'Report 1', groupId: 'g1', category: ReportCategory.BACKUP },
    ];

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getAllReports(ReportCategory.BACKUP);

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/reports?report_type=backup');
  });

  test('getOneReport should get a specific report', async () => {
    const mockResponse: ReportOut = {
      id: 'r1',
      name: 'Report 1',
      groupId: 'g1',
      category: ReportCategory.BACKUP,
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getOneReport('r1');

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/reports/r1');
  });

  test('deleteOneReport should delete a report', async () => {
    (groupsService.delete as jest.Mock).mockResolvedValue(undefined);

    await groupsService.deleteOneReport('r1');

    expect(groupsService.delete).toHaveBeenCalledWith('/api/groups/reports/r1');
  });

  test('should handle empty report list', async () => {
    const mockResponse: ReportSummary[] = [];

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getAllReports();

    expect(result).toEqual(mockResponse);
    expect(result).toHaveLength(0);
  });
});
