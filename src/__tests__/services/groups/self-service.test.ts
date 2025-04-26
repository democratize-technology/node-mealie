/**
 * Tests for the Groups service - Self Service API
 */

import { GroupsService } from '../../../services/groups';
import { MealieClient } from '../../../client';
import {
  GroupSummary,
  GroupStorage,
  UserSummary,
  PaginationBase,
  ReadGroupPreferences,
  UpdateGroupPreferences,
} from '../../../types/groups';

// Mock the client
jest.mock('../../../client');

describe('Groups Service - Self Service API', () => {
  let groupsService: GroupsService;

  beforeEach(() => {
    groupsService = new GroupsService({ baseURL: 'http://localhost' });
    // Mock the HTTP methods directly on the service
    groupsService.get = jest.fn();
    groupsService.put = jest.fn();
  });

  test('getSelf should get current group info', async () => {
    const mockResponse: GroupSummary = {
      id: 'g1',
      name: 'My Group',
      slug: 'my-group',
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getSelf();

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/self');
  });

  test('getGroupMembers should get group members with pagination', async () => {
    const mockResponse: PaginationBase<UserSummary> = {
      items: [
        { id: 'u1', username: 'user1', fullName: 'User One', groupId: 'g1', householdId: 'h1' },
        { id: 'u2', username: 'user2', fullName: 'User Two', groupId: 'g1', householdId: 'h1' },
      ],
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getGroupMembers({
      queryFilter: 'name LIKE "%user%"',
      orderBy: 'username',
    });

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/members?orderBy=username&queryFilter=name%20LIKE%20%22%25user%25%22');
  });

  test('getGroupMember should get member by username or id', async () => {
    const mockResponse: UserSummary = {
      id: 'u1',
      username: 'user1',
      fullName: 'User One',
      groupId: 'g1',
      householdId: 'h1',
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getGroupMember('user1');

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/members/user1');
  });

  test('getGroupPreferences should get preferences', async () => {
    const mockResponse: ReadGroupPreferences = {
      id: 'pref1',
      groupId: 'g1',
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getGroupPreferences();

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/preferences');
  });

  test('updateGroupPreferences should update preferences', async () => {
    const mockResponse: ReadGroupPreferences = {
      id: 'pref1',
      groupId: 'g1',
    };

    const updateData: UpdateGroupPreferences = {};

    (groupsService.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.updateGroupPreferences(updateData);

    expect(result).toEqual(mockResponse);
    expect(groupsService.put).toHaveBeenCalledWith('/api/groups/preferences', updateData);
  });

  test('getStorage should get storage info', async () => {
    const mockResponse: GroupStorage = {
      usedStorageBytes: 1000000,
      usedStorageStr: '1 MB',
      totalStorageBytes: 10000000,
      totalStorageStr: '10 MB',
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getStorage();

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/storage');
  });
});
