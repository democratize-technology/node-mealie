import { createServiceMock } from '../../utils/recipe-test-utils';
import type {
  AssignTags,
  AssignSettings,
  AssignCategories,
  DeleteRecipes,
  ExportRecipes,
  GroupDataExport,
  SuccessResponse,
} from '../../../types';
import { RecipeService } from '../../../services/recipe';

describe('RecipeService - Recipe Bulk Actions', () => {
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

  it('should bulk tag recipes', async () => {
    const tagData: AssignTags = {
      recipes: ['recipe1', 'recipe2'],
      tags: ['tag1', 'tag2'],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.bulkTagRecipes(tagData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/bulk-actions/tag',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(tagData),
      }),
    );
  });

  it('should bulk update recipe settings', async () => {
    const settingsData: AssignSettings = {
      recipes: ['recipe1', 'recipe2'],
      settings: { public: true, showNutrition: false },
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.bulkSettingsRecipes(settingsData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/bulk-actions/settings',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(settingsData),
      }),
    );
  });

  it('should bulk categorize recipes', async () => {
    const categoryData: AssignCategories = {
      recipes: ['recipe1', 'recipe2'],
      categories: ['category1', 'category2'],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.bulkCategorizeRecipes(categoryData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/bulk-actions/categorize',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(categoryData),
      }),
    );
  });

  it('should bulk delete recipes', async () => {
    const deleteData: DeleteRecipes = {
      recipes: ['recipe1', 'recipe2'],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.bulkDeleteRecipes(deleteData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/bulk-actions/delete',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(deleteData),
      }),
    );
  });

  it('should bulk export recipes', async () => {
    const exportData: ExportRecipes = {
      recipes: ['recipe1', 'recipe2'],
      exportFormat: { json: true },
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.bulkExportRecipes(exportData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/bulk-actions/export',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(exportData),
      }),
    );
  });

  it('should get exported data', async () => {
    const mockExports: GroupDataExport[] = [
      {
        id: '123',
        groupId: 'group1',
        name: 'Recipe Export',
        filename: 'export.zip',
        path: '/exports/export.zip',
        size: '1024',
        expires: '2024-01-01T00:00:00Z',
      },
    ];

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockExports,
      text: async () => JSON.stringify(mockExports),
    });

    const result = await service.getExportedData();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/bulk-actions/export',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockExports);
  });

  it('should get exported data token', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.getExportedDataToken('/exports/test.zip');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/bulk-actions/export/download?path=%2Fexports%2Ftest.zip',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
  });

  it('should purge export data', async () => {
    const mockResponse: SuccessResponse = { message: 'Purged successfully' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.purgeExportData();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/bulk-actions/export/purge',
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });
});
