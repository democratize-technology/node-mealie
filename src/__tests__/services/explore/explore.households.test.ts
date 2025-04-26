import { ExploreService } from '../../../services/explore';
import type {
  ExploreHouseholdsPagination,
  ExploreHouseholdSummary,
} from '../../../types/explore';

describe('ExploreService - Households', () => {
  let exploreService: ExploreService;
  const baseUrl = 'https://test.mealie.io';
  const groupSlug = 'test-group';

  beforeEach(() => {
    exploreService = new ExploreService({ baseUrl });
    jest.clearAllMocks();
  });

  describe('getHouseholds', () => {
    it('should get all households with pagination', async () => {
      const mockResponse: ExploreHouseholdsPagination = {
        page: 1,
        per_page: 50,
        total: 10,
        total_pages: 1,
        items: [{ id: '1', name: 'Test Household', groupId: 'group-1', slug: 'test-household' }],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getHouseholds(groupSlug);

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/households`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get households with Accept-Language header', async () => {
      const mockResponse: ExploreHouseholdsPagination = {
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

      await exploreService.getHouseholds(groupSlug, {
        acceptLanguage: 'fr-FR',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/households`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        })
      );
    });
  });

  describe('getHousehold', () => {
    it('should get a specific household by slug', async () => {
      const mockResponse: ExploreHouseholdSummary = {
        id: '1',
        name: 'Test Household',
        groupId: 'group-1',
        slug: 'test-household',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      const result = await exploreService.getHousehold(groupSlug, 'test-household');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/households/test-household`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get a household with Accept-Language header', async () => {
      const mockResponse: ExploreHouseholdSummary = {
        id: '1',
        name: 'Test Household',
        groupId: 'group-1',
        slug: 'test-household',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockResponse),
      });

      await exploreService.getHousehold(groupSlug, 'test-household', 'fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}/api/explore/groups/${groupSlug}/households/test-household`,
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
