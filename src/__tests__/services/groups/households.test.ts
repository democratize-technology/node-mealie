/**
 * Tests for the Groups service - Households API
 */

import { GroupsService } from '../../../services/groups';
import { MealieClient } from '../../../client';
import { HouseholdSummary, PaginationBase } from '../../../types';

// Mock the client
jest.mock('../../../client');

describe('Groups Service - Households API', () => {
  let groupsService: GroupsService;

  beforeEach(() => {
    groupsService = new GroupsService({ baseURL: 'http://localhost' });
    // Mock the get method directly on the service
    groupsService.get = jest.fn();
  });

  test('getAllHouseholds should get all households with pagination', async () => {
    const mockResponse: PaginationBase<HouseholdSummary> = {
      items: [
        { id: '1', name: 'Household 1', groupId: 'g1', slug: 'household-1' },
        { id: '2', name: 'Household 2', groupId: 'g1', slug: 'household-2' },
      ],
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getAllHouseholds({
      page: 1,
      perPage: 10,
      orderBy: 'name',
      orderDirection: 'asc',
    });

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith(
      '/api/groups/households?orderBy=name&orderDirection=asc&page=1&perPage=10',
    );
  });

  test('getOneHousehold should get household by slug', async () => {
    const mockResponse: HouseholdSummary = {
      id: '1',
      name: 'Household 1',
      groupId: 'g1',
      slug: 'household-1',
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getOneHousehold('household-1');

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/households/household-1');
  });
});
