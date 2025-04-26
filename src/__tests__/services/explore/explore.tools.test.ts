import { ExploreService } from '../../../services/explore';
import type {
  ExploreToolsPagination,
  ExploreRecipeToolOut,
} from '../../../types/explore';

describe('ExploreService - Tools', () => {
  let exploreService: ExploreService;
  const baseUrl = 'https://test.mealie.io';
  const groupSlug = 'test-group';

  beforeEach(() => {
    exploreService = new ExploreService({ baseUrl });
    jest.clearAllMocks();
  });

  describe('getTools', () => {
    it('should get all tools with pagination', async () => {
      const mockResponse: ExploreToolsPagination = {
        page: 1,
        per_page: 50,
        total: 10,
        total_pages: 1,
        items: [{ id: '1', name: 'Test Tool', slug: 'test-tool' }],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getTools(groupSlug);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/tools`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get tools with Accept-Language header', async () => {
      const mockResponse: ExploreToolsPagination = {
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

      await exploreService.getTools(groupSlug, {
        acceptLanguage: 'fr-FR',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/tools`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        })
      );
    });
  });

  describe('getTool', () => {
    it('should get a specific tool by ID', async () => {
      const mockResponse: ExploreRecipeToolOut = {
        id: '1',
        name: 'Test Tool',
        slug: 'test-tool',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getTool(groupSlug, '1');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/tools/1`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get a tool with Accept-Language header', async () => {
      const mockResponse: ExploreRecipeToolOut = {
        id: '1',
        name: 'Test Tool',
        slug: 'test-tool',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getTool(groupSlug, '1', 'fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/tools/1`,
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
