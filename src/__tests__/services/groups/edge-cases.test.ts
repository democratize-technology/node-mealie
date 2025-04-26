/**
 * Tests for the Groups service - Edge Cases
 */

import { GroupsService } from '../../../services/groups';
import { MealieClient } from '../../../client';
import {
  HouseholdSummary,
  UserSummary,
  PaginationBase,
} from '../../../types/groups';

// Mock the client
jest.mock('../../../client');

describe('Groups Service - Edge Cases', () => {
  let groupsService: GroupsService;

  beforeEach(() => {
    groupsService = new GroupsService({ baseURL: 'http://localhost' });
    groupsService.get = jest.fn();
  });

  test('should handle empty household list', async () => {
    const mockResponse: PaginationBase<HouseholdSummary> = { items: [] };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getAllHouseholds();

    expect(result).toEqual(mockResponse);
    expect(result.items).toHaveLength(0);
  });

  test('should handle UUID-formatted username for getGroupMember', async () => {
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    const mockResponse: UserSummary = {
      id: uuid,
      username: 'user1',
      fullName: 'User One',
      groupId: 'g1',
      householdId: 'h1',
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getGroupMember(uuid);

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith(`/api/groups/members/${uuid}`);
  });
});
