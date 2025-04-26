import { AdminService } from '../../../services/admin';
import type { 
  GroupPagination,
  GroupBase,
  GroupInDB,
  GroupAdminUpdate,
  AdminPaginationQuery,
} from '../../../types/admin';

describe('AdminService - Groups API', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllGroups', () => {
    const mockGroupPagination: GroupPagination = {
      items: [
        {
          id: 'group-1',
          name: 'Group 1',
          slug: 'group-1',
        },
        {
          id: 'group-2',
          name: 'Group 2',
          slug: 'group-2',
        },
      ],
      page: 1,
      total: 2,
      total_pages: 1,
      perPage: 50,
    };

    it('should get all groups without query parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockGroupPagination)),
      });

      const result = await service.getAllGroups();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/groups',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockGroupPagination);
    });

    it('should handle query parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockGroupPagination)),
      });

      const query: AdminPaginationQuery & { acceptLanguage?: string } = {
        page: 2,
        perPage: 10,
        orderBy: 'name',
        orderDirection: 'desc',
        queryFilter: 'active:true',
        acceptLanguage: 'de-DE',
      };

      await service.getAllGroups(query);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/groups?page=2&perPage=10&orderBy=name&orderDirection=desc&queryFilter=active%3Atrue',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'de-DE',
          }),
        }),
      );
    });
  });

  describe('createGroup', () => {
    const mockGroupBase: GroupBase = {
      name: 'New Group',
    };

    const mockGroupInDB: GroupInDB = {
      id: 'group-3',
      name: 'New Group',
      slug: 'new-group',
    };

    it('should create a group successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockGroupInDB)),
      });

      const result = await service.createGroup(mockGroupBase);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/groups',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockGroupBase),
        }),
      );
      expect(result).toEqual(mockGroupInDB);
    });
  });

  describe('getGroup', () => {
    const mockGroup: GroupInDB = {
      id: 'group-1',
      name: 'Group 1',
      slug: 'group-1',
    };

    it('should get a specific group', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockGroup)),
      });

      const result = await service.getGroup('group-1');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/groups/group-1',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockGroup);
    });
  });

  describe('updateGroup', () => {
    const mockUpdateData: GroupAdminUpdate = {
      id: 'group-1',
      name: 'Updated Group',
    };

    const mockGroup: GroupInDB = {
      id: 'group-1',
      name: 'Updated Group',
      slug: 'updated-group',
    };

    it('should update a group', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockGroup)),
      });

      const result = await service.updateGroup('group-1', mockUpdateData);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/groups/group-1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(mockUpdateData),
        }),
      );
      expect(result).toEqual(mockGroup);
    });
  });

  describe('deleteGroup', () => {
    const mockGroup: GroupInDB = {
      id: 'group-1',
      name: 'Group 1',
      slug: 'group-1',
    };

    it('should delete a group', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockGroup)),
      });

      const result = await service.deleteGroup('group-1');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/groups/group-1',
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
      expect(result).toEqual(mockGroup);
    });
  });
});
