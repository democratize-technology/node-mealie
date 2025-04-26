import { ExploreService } from '../../../services/explore';
import type {
  ExploreTagsPagination,
  ExploreTagOut,
} from '../../../types/explore';

describe('ExploreService - Tags', () => {
  let exploreService: ExploreService;
  const baseUrl = 'https://test.mealie.io';
  const groupSlug = 'test-group';

  beforeEach(() => {
    exploreService = new ExploreService({ baseUrl });
    jest.clearAllMocks();
  });

  describe('getTags', () => {
    it('should get all tags with pagination', async () => {
      const mockResponse: ExploreTagsPagination = {
        page: 1,
        per_page: 50,
        total: 10,
        total_pages: 1,
        items: [{ name: 'Test Tag', slug: 'test-tag' }],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getTags(groupSlug);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/tags`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get tags with Accept-Language header', async () => {
      const mockResponse: ExploreTagsPagination = {
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

      await exploreService.getTags(groupSlug, {
        acceptLanguage: 'fr-FR',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/tags`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        })
      );
    });
  });

  describe('getTag', () => {
    it('should get a specific tag by ID', async () => {
      const mockResponse: ExploreTagOut = {
        id: '1',
        name: 'Test Tag',
        slug: 'test-tag',
        groupId: 'group-1',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getTag(groupSlug, '1');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/tags/1`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get a tag with Accept-Language header', async () => {
      const mockResponse: ExploreTagOut = {
        id: '1',
        name: 'Test Tag',
        slug: 'test-tag',
        groupId: 'group-1',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getTag(groupSlug, '1', 'fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/organizers/tags/1`,
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
