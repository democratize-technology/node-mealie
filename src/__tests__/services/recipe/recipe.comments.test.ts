import { createServiceMock } from '../../utils/recipe-test-utils';
import type { RecipeCommentOut } from '../../../types';
import { RecipeService } from '../../../services/recipe';

describe('RecipeService - Recipe Comments', () => {
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

  it('should get recipe comments', async () => {
    const mockComments: RecipeCommentOut[] = [
      {
        id: '1',
        recipeId: 'test-recipe',
        text: 'Great recipe!',
        userId: 'user1',
        user: { id: 'user1', username: 'testuser', admin: false },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ];

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockComments,
      text: async () => JSON.stringify(mockComments),
    });

    const result = await service.getRecipeComments('test-recipe');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe/comments',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockComments);
  });
});
