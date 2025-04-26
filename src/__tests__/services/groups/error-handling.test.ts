/**
 * Tests for the Groups service - Error Handling
 */

import { GroupsService } from '../../../services/groups';
import { MealieClient } from '../../../client';

// Mock the client
jest.mock('../../../client');

describe('Groups Service - Error Handling', () => {
  let groupsService: GroupsService;

  beforeEach(() => {
    groupsService = new GroupsService({ baseURL: 'http://localhost' });
    groupsService.get = jest.fn();
  });

  test('should handle API errors properly', async () => {
    const errorResponse = {
      response: {
        status: 404,
        data: {
          detail: 'Resource not found',
        },
      },
    };

    (groupsService.get as jest.Mock).mockRejectedValue(errorResponse);

    await expect(groupsService.getOneHousehold('invalid-slug')).rejects.toEqual(errorResponse);
  });

  test('should handle network errors', async () => {
    const networkError = new Error('Network error');

    (groupsService.get as jest.Mock).mockRejectedValue(networkError);

    await expect(groupsService.getSelf()).rejects.toThrow('Network error');
  });
});
