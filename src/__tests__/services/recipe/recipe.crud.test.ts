import { createServiceMock } from '../../utils/recipe-test-utils';
import type {
  CreateRecipe,
  Recipe,
  RecipeSummary,
  RecipeSuggestionResponse,
  RecipeSuggestionQueryParams,
  RecipeDuplicate,
  RecipeLastMade,
  ScrapeRecipe,
  PaginationBase,
} from '../../../types';
import { RecipeService } from '../../../services/recipe';

describe('RecipeService - Recipe CRUD', () => {
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

  it('should create a new recipe', async () => {
    const recipeData: CreateRecipe = { name: 'New Recipe' };
    const mockResponse = 'new-recipe-slug';

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.createRecipe(recipeData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(recipeData),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should update multiple recipes', async () => {
    const recipes = [
      { id: '1', name: 'Updated Recipe 1' },
      { id: '2', name: 'Updated Recipe 2' },
    ] as Recipe[];

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.updateManyRecipes(recipes);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes',
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(recipes),
      }),
    );
  });

  it('should patch multiple recipes', async () => {
    const recipes = [
      { id: '1', name: 'Patched Recipe 1' },
      { id: '2', name: 'Patched Recipe 2' },
    ] as Recipe[];

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.patchManyRecipes(recipes);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes',
      expect.objectContaining({
        method: 'PATCH',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(recipes),
      }),
    );
  });

  it('should get recipe suggestions', async () => {
    const params: RecipeSuggestionQueryParams = {
      foods: ['food1', 'food2'],
      tools: ['tool1'],
      maxMissingFoods: 3,
    };

    const mockResponse: RecipeSuggestionResponse = {
      items: [
        {
          recipe: { id: '1', name: 'Suggested Recipe', slug: 'suggested-recipe' } as RecipeSummary,
          missingFoods: ['food3'],
          missingTools: [],
        },
      ],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.suggestRecipes(params);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/suggestions?foods=food1&foods=food2&tools=tool1&maxMissingFoods=3',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should get all recipe suggestions', async () => {
    const mockResponse: RecipeSuggestionResponse = {
      items: [
        {
          recipe: { id: '1', name: 'Suggested Recipe', slug: 'suggested-recipe' } as RecipeSummary,
          missingFoods: ['food3'],
          missingTools: [],
        },
      ],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.suggestRecipes();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/suggestions',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should update a single recipe', async () => {
    const recipe: Recipe = {
      id: '123',
      groupId: 'group1',
      userId: 'user1',
      householdId: 'household1',
      name: 'Updated Recipe',
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.updateRecipe('test-recipe', recipe);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe',
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(recipe),
      }),
    );
  });

  it('should patch a single recipe', async () => {
    const partialRecipe = { name: 'Patched Recipe' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.patchRecipe('test-recipe', partialRecipe);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe',
      expect.objectContaining({
        method: 'PATCH',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(partialRecipe),
      }),
    );
  });

  it('should duplicate a recipe', async () => {
    const duplicateData: RecipeDuplicate = { name: 'Duplicated Recipe' };
    const mockRecipe: Recipe = {
      id: '456',
      groupId: 'group1',
      userId: 'user1',
      householdId: 'household1',
      name: 'Duplicated Recipe',
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipe,
      text: async () => JSON.stringify(mockRecipe),
    });

    const result = await service.duplicateRecipe('test-recipe', duplicateData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe/duplicate',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(duplicateData),
      }),
    );
    expect(result).toEqual(mockRecipe);
  });

  it('should update last made date', async () => {
    const lastMadeData: RecipeLastMade = { timestamp: '2024-01-01T00:00:00Z' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.updateLastMade('test-recipe', lastMadeData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe/last-made',
      expect.objectContaining({
        method: 'PATCH',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(lastMadeData),
      }),
    );
  });

  it('should create recipe from image array', async () => {
    const mockImages = [new Blob(['test1'], { type: 'image/jpeg' }), new Blob(['test2'], { type: 'image/jpeg' })];
    const mockResponse = { id: '123', name: 'Recipe from Images' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.createRecipeFromImage(mockImages);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/create/image',
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

  it('should create recipe from image with translation', async () => {
    const mockImage = new Blob(['test'], { type: 'image/jpeg' });
    const mockResponse = { id: '123', name: 'Recipe from Image' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.createRecipeFromImage(mockImage, 'fr');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/create/image?translateLanguage=fr',
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

  it('should test parse recipe URL', async () => {
    const testData = { url: 'https://example.com/recipe' };
    const mockResponse = { isValid: true };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.testParseRecipeUrl(testData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-scrape-url',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(testData),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should create recipe from HTML or JSON', async () => {
    const data = { data: '<html>Recipe content</html>' };
    const mockResponse = { id: '123', name: 'Test Recipe' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.createRecipeFromHtmlOrJson(data);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/create/html-or-json',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(data),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should parse recipe URL', async () => {
    const scrapeData: ScrapeRecipe = { url: 'https://example.com/recipe' };
    const mockResponse = 'recipe-slug';

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.parseRecipeUrl(scrapeData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/create/url',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(scrapeData),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should parse recipe URL bulk', async () => {
    const bulkData = {
      imports: [{ url: 'https://example.com/recipe1' }, { url: 'https://example.com/recipe2' }],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.parseRecipeUrlBulk(bulkData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/create/url/bulk',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(bulkData),
      }),
    );
  });

  it('should create recipe from zip', async () => {
    const mockFile = new Blob(['test'], { type: 'application/zip' });
    const mockResponse = { id: '123', name: 'Imported Recipe' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.createRecipeFromZip(mockFile);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/create/zip',
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

  it('should create recipe from image', async () => {
    const mockImage = new Blob(['test'], { type: 'image/jpeg' });
    const mockResponse = { id: '123', name: 'Recipe from Image' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.createRecipeFromImage(mockImage);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/create/image',
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

  it('should get all recipes', async () => {
    const mockResponse: PaginationBase<RecipeSummary> = {
      items: [
        { id: '1', name: 'Recipe 1', slug: 'recipe-1' },
        { id: '2', name: 'Recipe 2', slug: 'recipe-2' },
      ] as RecipeSummary[],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.getAllRecipes();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should get recipes using params', async () => {
    const mockResponse: PaginationBase<RecipeSummary> = {
      items: [
        { id: '1', name: 'Recipe 1', slug: 'recipe-1' },
        { id: '2', name: 'Recipe 2', slug: 'recipe-2' },
      ] as RecipeSummary[],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.getAllRecipes({
      households: ['household1'],
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes?households=household1',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should get recipes using params with arrays', async () => {
    const mockResponse: PaginationBase<RecipeSummary> = {
      items: [
        { id: '1', name: 'Recipe 1', slug: 'recipe-1' },
        { id: '2', name: 'Recipe 2', slug: 'recipe-2' },
      ] as RecipeSummary[],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.getAllRecipes({
      cookbook: 'cookbook',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes?cookbook=cookbook',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should get a single recipe', async () => {
    const mockRecipe: Recipe = {
      id: '123',
      groupId: 'group1',
      userId: 'user1',
      householdId: 'household1',
      name: 'Test Recipe',
      slug: 'test-recipe',
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipe,
      text: async () => JSON.stringify(mockRecipe),
    });

    const result = await service.getRecipe('test-recipe');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockRecipe);
  });

  it('should delete a single recipe', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });

    await service.deleteRecipe('test-recipe');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/test-recipe',
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
  });
});
