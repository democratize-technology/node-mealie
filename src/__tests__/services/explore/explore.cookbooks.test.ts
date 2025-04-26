import { ExploreService } from '../../../services/explore';
import type {
  ExploreCookbooksPagination,
  ExploreRecipeCookBook,
} from '../../../types/explore';

describe('ExploreService - Cookbooks', () => {
  let exploreService: ExploreService;
  const baseUrl = 'https://test.mealie.io';
  const groupSlug = 'test-group';

  beforeEach(() => {
    exploreService = new ExploreService({ baseUrl });
    jest.clearAllMocks();
  });

  describe('getCookbooks', () => {
    it('should get all cookbooks with pagination', async () => {
      const mockResponse: ExploreCookbooksPagination = {
        page: 1,
        per_page: 50,
        total: 10,
        total_pages: 1,
        items: [{ id: '1', name: 'Test Cookbook', groupId: 'group-1', householdId: 'house-1' }],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getCookbooks(groupSlug);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/cookbooks`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get cookbooks with Accept-Language header', async () => {
      const mockResponse: ExploreCookbooksPagination = {
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

      await exploreService.getCookbooks(groupSlug, {
        acceptLanguage: 'fr-FR',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/cookbooks`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        })
      );
    });
  });

  describe('getCookbook', () => {
    it('should get a specific cookbook by ID', async () => {
      const mockResponse: ExploreRecipeCookBook = {
        id: '1',
        name: 'Test Cookbook',
        groupId: 'group-1',
        householdId: 'house-1',
        recipes: [],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getCookbook(groupSlug, '1');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/cookbooks/1`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get a cookbook with Accept-Language header', async () => {
      const mockResponse: ExploreRecipeCookBook = {
        id: '1',
        name: 'Test Cookbook',
        groupId: 'group-1',
        householdId: 'house-1',
        recipes: [],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getCookbook(groupSlug, '1', 'fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/cookbooks/1`,
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
