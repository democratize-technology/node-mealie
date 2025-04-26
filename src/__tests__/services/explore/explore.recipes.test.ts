import { ExploreService } from '../../../services/explore';
import type {
  ExploreRecipesPagination,
  ExploreRecipeSuggestionResponse,
  RecipeDetails,
} from '../../../types/explore';

describe('ExploreService - Recipes', () => {
  let exploreService: ExploreService;
  const baseUrl = 'https://test.mealie.io';
  const groupSlug = 'test-group';

  beforeEach(() => {
    exploreService = new ExploreService({ baseUrl });
    jest.clearAllMocks();
  });

  describe('getRecipes', () => {
    it('should get all recipes with pagination', async () => {
      const mockResponse: ExploreRecipesPagination = {
        page: 1,
        per_page: 50,
        total: 10,
        total_pages: 1,
        items: [{ id: '1', name: 'Test Recipe', slug: 'test-recipe' }],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getRecipes(groupSlug);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/recipes`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get recipes with complex filters', async () => {
      const mockResponse: ExploreRecipesPagination = {
        page: 1,
        per_page: 50,
        total: 10,
        total_pages: 1,
        items: [],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getRecipes(groupSlug, {
        categories: ['cat1', 'cat2'],
        tags: ['tag1', 'tag2'],
        tools: ['tool1'],
        foods: ['food1'],
        households: ['house1'],
        cookbook: 'cookbook1',
        requireAllCategories: true,
        requireAllTags: true,
        requireAllTools: false,
        requireAllFoods: false,
        search: 'pasta',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${baseUrl}/api/explore/groups/${groupSlug}/recipes?`),
        expect.objectContaining({
          method: 'GET',
        })
      );
      
      // Check URL contains all parameters
      const url = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(url).toContain('categories=cat1');
      expect(url).toContain('categories=cat2');
      expect(url).toContain('tags=tag1');
      expect(url).toContain('tags=tag2');
      expect(url).toContain('tools=tool1');
      expect(url).toContain('foods=food1');
      expect(url).toContain('households=house1');
      expect(url).toContain('cookbook=cookbook1');
      expect(url).toContain('requireAllCategories=true');
      expect(url).toContain('requireAllTags=true');
      expect(url).toContain('requireAllTools=false');
      expect(url).toContain('requireAllFoods=false');
      expect(url).toContain('search=pasta');
    });

    it('should get recipes with Accept-Language header', async () => {
      const mockResponse: ExploreRecipesPagination = {
        page: 1,
        per_page: 50,
        total: 10,
        total_pages: 1,
        items: [],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getRecipes(groupSlug, {
        acceptLanguage: 'fr-FR',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/recipes`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        })
      );
    });
  });

  describe('getRecipeSuggestions', () => {
    it('should get recipe suggestions', async () => {
      const mockResponse: ExploreRecipeSuggestionResponse = {
        items: [
          {
            recipe: { id: '1', name: 'Test Recipe' },
            missingFoods: [{ id: 'f1', name: 'Missing Food' }],
            missingTools: [{ id: 't1', name: 'Missing Tool', slug: 'missing-tool' }],
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getRecipeSuggestions(groupSlug);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/recipes/suggestions`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get recipe suggestions with parameters', async () => {
      const mockResponse: ExploreRecipeSuggestionResponse = {
        items: [],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getRecipeSuggestions(groupSlug, {
        foods: ['food1', 'food2'],
        tools: ['tool1'],
        limit: 5,
        maxMissingFoods: 3,
        maxMissingTools: 2,
        includeFoodsOnHand: false,
        includeToolsOnHand: false,
      });

      const url = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(url).toContain('foods=food1');
      expect(url).toContain('foods=food2');
      expect(url).toContain('tools=tool1');
      expect(url).toContain('limit=5');
      expect(url).toContain('maxMissingFoods=3');
      expect(url).toContain('maxMissingTools=2');
      expect(url).toContain('includeFoodsOnHand=false');
      expect(url).toContain('includeToolsOnHand=false');
    });

    it('should get recipe suggestions with Accept-Language header', async () => {
      const mockResponse: ExploreRecipeSuggestionResponse = {
        items: [],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getRecipeSuggestions(groupSlug, {
        acceptLanguage: 'fr-FR',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/recipes/suggestions`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        })
      );
    });
  });

  describe('getRecipe', () => {
    it('should get a specific recipe by slug', async () => {
      const mockResponse: RecipeDetails = {
        id: '1',
        name: 'Test Recipe',
        slug: 'test-recipe',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getRecipe(groupSlug, 'test-recipe');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/recipes/test-recipe`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get a recipe with Accept-Language header', async () => {
      const mockResponse: RecipeDetails = {
        id: '1',
        name: 'Test Recipe',
        slug: 'test-recipe',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getRecipe(groupSlug, 'test-recipe', 'fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/recipes/test-recipe`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        })
      );
    });
  });
});
