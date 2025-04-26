import { ExploreService } from '../../../services/explore';
import type {
  ExploreFoodItem,
  ExploreFoodsPagination,
} from '../../../types/explore';

describe('ExploreService - Foods', () => {
  let exploreService: ExploreService;
  const baseUrl = 'https://test.mealie.io';
  const groupSlug = 'test-group';

  beforeEach(() => {
    exploreService = new ExploreService({ baseUrl });
    jest.clearAllMocks();
  });

  describe('getFoods', () => {
    it('should get all foods with pagination', async () => {
      const mockResponse: ExploreFoodsPagination = {
        page: 1,
        per_page: 50,
        total: 100,
        total_pages: 2,
        items: [{ id: '1', name: 'Test Food' }],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getFoods(groupSlug);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/foods`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get foods with query parameters', async () => {
      const mockResponse: ExploreFoodsPagination = {
        page: 1,
        per_page: 50,
        total: 100,
        total_pages: 2,
        items: [],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getFoods(groupSlug, {
        search: 'tomato',
        page: 2,
        perPage: 10,
        orderBy: 'name',
        orderDirection: 'asc',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/foods?search=tomato&page=2&perPage=10&orderBy=name&orderDirection=asc`,
        expect.objectContaining({
          method: 'GET',
        })
      );
    });

    it('should get foods with Accept-Language header', async () => {
      const mockResponse: ExploreFoodsPagination = {
        page: 1,
        per_page: 50,
        total: 100,
        total_pages: 2,
        items: [],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getFoods(groupSlug, {
        acceptLanguage: 'fr-FR',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/foods`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        })
      );
    });
  });

  describe('getFood', () => {
    it('should get a specific food by ID', async () => {
      const mockResponse: ExploreFoodItem = {
        id: '1',
        name: 'Test Food',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getFood(groupSlug, '1');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/foods/1`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get a food with Accept-Language header', async () => {
      const mockResponse: ExploreFoodItem = {
        id: '1',
        name: 'Test Food',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getFood(groupSlug, '1', 'fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/foods/1`,
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
