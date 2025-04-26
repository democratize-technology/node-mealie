import { ExploreService } from '../../../services/explore';
import type {
  ExploreCategoriesPagination,
  ExploreCategoryOut,
} from '../../../types/explore';

describe('ExploreService - Categories', () => {
  let exploreService: ExploreService;
  const baseUrl = 'https://test.mealie.io';
  const groupSlug = 'test-group';

  beforeEach(() => {
    exploreService = new ExploreService({ baseUrl });
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should get all categories with pagination', async () => {
      const mockResponse: ExploreCategoriesPagination = {
        page: 1,
        per_page: 50,
        total: 10,
        total_pages: 1,
        items: [{ name: 'Test Category', slug: 'test-category' }],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getCategories(groupSlug);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/categories`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get categories with Accept-Language header', async () => {
      const mockResponse: ExploreCategoriesPagination = {
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

      await exploreService.getCategories(groupSlug, {
        acceptLanguage: 'fr-FR',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/categories`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        })
      );
    });
  });

  describe('getCategory', () => {
    it('should get a specific category by ID', async () => {
      const mockResponse: ExploreCategoryOut = {
        id: '1',
        name: 'Test Category',
        slug: 'test-category',
        groupId: 'group-1',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getCategory(groupSlug, '1');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/categories/1`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get a category with Accept-Language header', async () => {
      const mockResponse: ExploreCategoryOut = {
        id: '1',
        name: 'Test Category',
        slug: 'test-category',
        groupId: 'group-1',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getCategory(groupSlug, '1', 'fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/categories/1`,
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
