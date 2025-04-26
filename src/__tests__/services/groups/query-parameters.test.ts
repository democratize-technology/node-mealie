/**
 * Tests for the Groups service - Query Parameters Building
 */

import { GroupsService } from '../../../services/groups';
import { MealieClient } from '../../../client';

// Mock the client
jest.mock('../../../client');

describe('Groups Service - Query Parameters Building', () => {
  let groupsService: GroupsService;

  beforeEach(() => {
    groupsService = new GroupsService({ baseURL: 'http://localhost' });
    groupsService.get = jest.fn();
  });

  test('should build query parameters correctly with all options', () => {
    const params = {
      orderBy: 'name',
      orderByNullPosition: 'last',
      orderDirection: 'desc',
      queryFilter: 'name LIKE "%test%"',
      paginationSeed: 'abc123',
      page: 2,
      perPage: 20,
    };

    const expectedQuery =
      '?orderBy=name&orderByNullPosition=last&orderDirection=desc&queryFilter=name%20LIKE%20%22%25test%25%22&paginationSeed=abc123&page=2&perPage=20';

    // Access private method for testing using any
    const result = (groupsService as any).buildQueryParams(params);

    expect(result).toBe(expectedQuery);
  });

  test('should handle empty parameters', () => {
    const result = (groupsService as any).buildQueryParams();
    expect(result).toBe('');
  });

  test('should encode special characters in query parameters', () => {
    const params = {
      queryFilter: 'name = "Test & Co"',
      orderBy: 'name asc, date desc',
    };

    const expectedQuery = '?orderBy=name%20asc%2C%20date%20desc&queryFilter=name%20%3D%20%22Test%20%26%20Co%22';

    const result = (groupsService as any).buildQueryParams(params);

    expect(result).toBe(expectedQuery);
  });

  test('should handle partial parameters', () => {
    const params = {
      page: 1,
      perPage: 50,
    };

    const expectedQuery = '?page=1&perPage=50';

    const result = (groupsService as any).buildQueryParams(params);

    expect(result).toBe(expectedQuery);
  });

  test('should handle zero values in pagination', async () => {
    (groupsService.get as jest.Mock).mockResolvedValue({ items: [] });

    await groupsService.getAllHouseholds({ page: 0, perPage: 0 });

    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/households?page=0&perPage=0');
  });

  test('should handle very large page numbers', async () => {
    (groupsService.get as jest.Mock).mockResolvedValue({ items: [] });

    await groupsService.getAllHouseholds({ page: 999999, perPage: 100 });

    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/households?page=999999&perPage=100');
  });
});
