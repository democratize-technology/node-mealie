import { createServiceMock } from '../../utils/recipe-test-utils';
import type { FormatResponse, RecipeZipTokenResponse } from '../../../types';
import { RecipeService } from '../../../services/recipe';

describe('RecipeService - Recipe Exports', () => {
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

  it('should get recipe formats and templates', async () => {
    const mockResponse: FormatResponse = {
      json: ['default.json'],
      zip: ['recipe.zip'],
      jinja2: ['template.j2'],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.getRecipeFormatsAndTemplates();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/exports',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should get recipe zip token', async () => {
    const mockResponse: RecipeZipTokenResponse = { token: 'test-zip-token' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.getRecipeZipToken('test-recipe');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe/exports',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should get recipe as format', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.getRecipeAsFormat('test-recipe', 'json');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe/exports?template_name=json',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
  });

  it('should get recipe as zip', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.getRecipeAsZip('test-recipe', 'test-token');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe/exports/zip?token=test-token',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
  });
});
