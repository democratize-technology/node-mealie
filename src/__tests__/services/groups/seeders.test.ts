/**
 * Tests for the Groups service - Seeders API
 */

import { GroupsService } from '../../../services/groups';
import { MealieClient } from '../../../client';
import {
  SeederConfig,
  SuccessResponse,
} from '../../../types/groups';

// Mock the client
jest.mock('../../../client');

describe('Groups Service - Seeders API', () => {
  let groupsService: GroupsService;

  beforeEach(() => {
    groupsService = new GroupsService({ baseURL: 'http://localhost' });
    groupsService.post = jest.fn();
  });

  test('seedFoods should seed foods data', async () => {
    const mockResponse: SuccessResponse = {
      message: 'Foods seeded successfully',
    };

    const config: SeederConfig = {
      locale: 'en-US',
    };

    (groupsService.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.seedFoods(config);

    expect(result).toEqual(mockResponse);
    expect(groupsService.post).toHaveBeenCalledWith('/api/groups/seeders/foods', config);
  });

  test('seedLabels should seed labels data', async () => {
    const mockResponse: SuccessResponse = {
      message: 'Labels seeded successfully',
    };

    const config: SeederConfig = {
      locale: 'en-US',
    };

    (groupsService.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.seedLabels(config);

    expect(result).toEqual(mockResponse);
    expect(groupsService.post).toHaveBeenCalledWith('/api/groups/seeders/labels', config);
  });

  test('seedUnits should seed units data', async () => {
    const mockResponse: SuccessResponse = {
      message: 'Units seeded successfully',
    };

    const config: SeederConfig = {
      locale: 'en-US',
    };

    (groupsService.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.seedUnits(config);

    expect(result).toEqual(mockResponse);
    expect(groupsService.post).toHaveBeenCalledWith('/api/groups/seeders/units', config);
  });
});
