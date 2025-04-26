import { AdminService } from '../../../services/admin';
import type { 
  HouseholdPagination,
  HouseholdCreate,
  AdminHouseholdInDB,
  UpdateHouseholdAdmin,
  AdminPaginationQuery,
} from '../../../types/admin';

describe('AdminService - Households API', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllHouseholds', () => {
    const mockHouseholdPagination: HouseholdPagination = {
      items: [
        {
          id: 'house-1',
          name: 'Household 1',
          slug: 'household-1',
          groupId: 'group-1',
          group: {},
        },
        {
          id: 'house-2',
          name: 'Household 2',
          slug: 'household-2',
          groupId: 'group-1',
          group: {},
        },
      ],
      page: 1,
      total: 2,
      total_pages: 1,
      perPage: 50,
    };

    it('should get all households without query parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockHouseholdPagination)),
      });

      const result = await service.getAllHouseholds();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/households',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockHouseholdPagination);
    });

    it('should handle query parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockHouseholdPagination)),
      });

      const query: AdminPaginationQuery & { acceptLanguage?: string } = {
        page: 1,
        perPage: 20,
        orderBy: 'name',
        orderDirection: 'asc',
        queryFilter: 'active:true',
        acceptLanguage: 'fr-FR',
      };

      await service.getAllHouseholds(query);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/households?page=1&perPage=20&orderBy=name&orderDirection=asc&queryFilter=active%3Atrue',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        }),
      );
    });
  });

  describe('createHousehold', () => {
    const mockHouseholdCreate: HouseholdCreate = {
      name: 'New Household',
    };

    const mockHouseholdInDB: AdminHouseholdInDB = {
      id: 'house-3',
      name: 'New Household',
      slug: 'new-household',
      groupId: 'group-1',
      group: {},
    };

    it('should create a household successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockHouseholdInDB)),
      });

      const result = await service.createHousehold(mockHouseholdCreate);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/households',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockHouseholdCreate),
        }),
      );
      expect(result).toEqual(mockHouseholdInDB);
    });

    it('should handle accept-language header', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockHouseholdInDB)),
      });

      await service.createHousehold(mockHouseholdCreate, 'es-ES');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/households',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'es-ES',
          }),
        }),
      );
    });
  });

  describe('getHousehold', () => {
    const mockHousehold: AdminHouseholdInDB = {
      id: 'house-1',
      name: 'Household 1',
      slug: 'household-1',
      groupId: 'group-1',
      group: {},
    };

    it('should get a specific household', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockHousehold)),
      });

      const result = await service.getHousehold('house-1');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/households/house-1',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockHousehold);
    });
  });

  describe('updateHousehold', () => {
    const mockUpdateData: UpdateHouseholdAdmin = {
      id: 'house-1',
      name: 'Updated Household',
      groupId: 'group-2',
    };

    const mockHousehold: HouseholdInDB = {
      id: 'house-1',
      name: 'Updated Household',
      slug: 'updated-household',
      groupId: 'group-2',
      group: {},
    };

    it('should update a household', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockHousehold)),
      });

      const result = await service.updateHousehold('house-1', mockUpdateData);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/households/house-1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(mockUpdateData),
        }),
      );
      expect(result).toEqual(mockHousehold);
    });
  });

  describe('deleteHousehold', () => {
    const mockHousehold: HouseholdInDB = {
      id: 'house-1',
      name: 'Household 1',
      slug: 'household-1',
      groupId: 'group-1',
      group: {},
    };

    it('should delete a household', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockHousehold)),
      });

      const result = await service.deleteHousehold('house-1');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/households/house-1',
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
      expect(result).toEqual(mockHousehold);
    });
  });
});
