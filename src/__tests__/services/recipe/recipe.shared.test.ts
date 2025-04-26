import { createServiceMock } from '../../utils/recipe-test-utils';
import type { Recipe } from '../../../types';
import { RecipeService } from '../../../services/recipe';

describe('RecipeService - Recipe Shared', () => {
  let service: RecipeService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    const mocks = createServiceMock();
    service = mocks.service;
    fetchMock = mocks.fetchMock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get shared recipe', async () => {
    const mockRecipe: Recipe = {
      id: '123',
      groupId: 'group1',
      userId: 'user1',
      householdId: 'household1',
      name: 'Shared Recipe',
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipe,
      text: async () => JSON.stringify(mockRecipe),
    });

    const result = await service.getSharedRecipe('shared-token-id');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/shared/shared-token-id',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockRecipe);
  });
});
