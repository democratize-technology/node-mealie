import { createServiceMock } from '../../utils/recipe-test-utils';
import { RecipeService } from '../../../services/recipe';

describe('RecipeService - Error handling', () => {
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

  it('should handle API errors', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: async () => 'Recipe not found',
    });

    await expect(service.getRecipe('non-existent')).rejects.toThrow('HTTP 404: Not Found');
  });

  it('should handle network errors', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    await expect(service.getRecipe('test-recipe')).rejects.toThrow('Network error');
  });
});
