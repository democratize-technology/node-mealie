import { createServiceMock } from '../../utils/recipe-test-utils';
import type { ScrapeRecipe, UpdateImageResponse, RecipeAsset } from '../../../types';
import { RecipeService } from '../../../services/recipe';

describe('RecipeService - Recipe Images and Assets', () => {
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

  it('should scrape image URL', async () => {
    const scrapeData: ScrapeRecipe = { url: 'https://example.com/image.jpg' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.scrapeImageUrl('test-recipe', scrapeData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe/image',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(scrapeData),
      }),
    );
  });

  it('should update recipe image', async () => {
    const mockImage = new Blob(['test'], { type: 'image/jpeg' });
    const mockResponse: UpdateImageResponse = { image: 'updated-image-url' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.updateRecipeImage('test-recipe', mockImage, 'jpg');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe/image',
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: expect.any(FormData),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should upload recipe asset', async () => {
    const mockFile = new Blob(['test'], { type: 'application/pdf' });
    const mockResponse: RecipeAsset = {
      name: 'test-asset',
      icon: 'file-icon',
      fileName: 'test.pdf',
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.uploadRecipeAsset('test-recipe', mockFile, 'test-asset', 'file-icon', 'pdf');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe/assets',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: expect.any(FormData),
      }),
    );
    expect(result).toEqual(mockResponse);
  });
});
