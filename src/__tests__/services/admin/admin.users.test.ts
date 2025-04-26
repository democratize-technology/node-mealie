import { AdminService } from '../../../services/admin';
import type { 
  AdminUserPagination, 
  AdminUserIn, 
  AdminUserOut, 
  UnlockResults, 
  PasswordResetToken,
  AdminForgotPassword,
  AdminPaginationQuery,
} from '../../../types/admin';

describe('AdminService - Users API', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllUsers', () => {
    const mockUserPagination: AdminUserPagination = {
      items: [
        {
          id: 'user-1',
          email: 'user1@example.com',
          username: 'user1',
          admin: false,
          group: 'group1',
          groupId: 'group-1',
          groupSlug: 'group-slug-1',
          household: 'household1',
          householdId: 'household-1',
          householdSlug: 'household-slug-1',
          cacheKey: 'cache-key-1',
        },
      ],
      page: 1,
      total: 1,
      total_pages: 1,
      perPage: 50,
    };

    it('should get all users without query parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockUserPagination)),
      });

      const result = await service.getAllUsers();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockUserPagination);
    });

    it('should handle query parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockUserPagination)),
      });

      const query: AdminPaginationQuery & { acceptLanguage?: string } = {
        page: 2,
        perPage: 25,
        orderBy: 'email',
        orderDirection: 'asc',
        queryFilter: 'admin:true',
        paginationSeed: 'test-seed',
        acceptLanguage: 'en-US',
      };

      await service.getAllUsers(query);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users?page=2&perPage=25&orderBy=email&orderDirection=asc&queryFilter=admin%3Atrue&paginationSeed=test-seed',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'en-US',
          }),
        }),
      );
    });
  });

  describe('createUser', () => {
    const mockUserInput: AdminUserIn = {
      username: 'newuser',
      fullName: 'New User',
      email: 'newuser@example.com',
      password: 'password123',
    };

    const mockUserOutput: AdminUserOut = {
      id: 'user-2',
      email: 'newuser@example.com',
      username: 'newuser',
      fullName: 'New User',
      admin: false,
      group: 'default',
      groupId: 'default-id',
      groupSlug: 'default',
      household: 'default',
      householdId: 'default-id',
      householdSlug: 'default',
      cacheKey: 'cache-key-2',
    };

    it('should create a user successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockUserOutput)),
      });

      const result = await service.createUser(mockUserInput);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockUserInput),
        }),
      );
      expect(result).toEqual(mockUserOutput);
    });
  });

  describe('unlockUsers', () => {
    const mockUnlockResults: UnlockResults = {
      unlocked: 3,
      errors: 0,
    };

    it('should unlock users without force', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockUnlockResults)),
      });

      const result = await service.unlockUsers();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users/unlock?force=false',
        expect.objectContaining({
          method: 'POST',
        }),
      );
      expect(result).toEqual(mockUnlockResults);
    });

    it('should unlock users with force', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockUnlockResults)),
      });

      const result = await service.unlockUsers(true);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users/unlock?force=true',
        expect.objectContaining({
          method: 'POST',
        }),
      );
      expect(result).toEqual(mockUnlockResults);
    });
  });

  describe('getUser', () => {
    const mockUser: AdminUserOut = {
      id: 'user-1',
      email: 'user1@example.com',
      username: 'user1',
      fullName: 'User One',
      admin: false,
      group: 'group1',
      groupId: 'group-1',
      groupSlug: 'group-slug-1',
      household: 'household1',
      householdId: 'household-1',
      householdSlug: 'household-slug-1',
      cacheKey: 'cache-key-1',
    };

    it('should get a specific user', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockUser)),
      });

      const result = await service.getUser('user-1');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users/user-1',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    const mockUser: UserOut = {
      id: 'user-1',
      email: 'updated@example.com',
      username: 'updateduser',
      fullName: 'Updated User',
      admin: true,
      group: 'group1',
      groupId: 'group-1',
      groupSlug: 'group-slug-1',
      household: 'household1',
      householdId: 'household-1',
      householdSlug: 'household-slug-1',
      cacheKey: 'cache-key-1',
    };

    it('should update a user', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockUser)),
      });

      const result = await service.updateUser('user-1', mockUser);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users/user-1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(mockUser),
        }),
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    const mockUser: UserOut = {
      id: 'user-1',
      email: 'user1@example.com',
      username: 'user1',
      fullName: 'User One',
      admin: false,
      group: 'group1',
      groupId: 'group-1',
      groupSlug: 'group-slug-1',
      household: 'household1',
      householdId: 'household-1',
      householdSlug: 'household-slug-1',
      cacheKey: 'cache-key-1',
    };

    it('should delete a user', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockUser)),
      });

      const result = await service.deleteUser('user-1');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users/user-1',
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('generatePasswordResetToken', () => {
    const mockForgotPassword: AdminForgotPassword = {
      email: 'user@example.com',
    };

    const mockToken: PasswordResetToken = {
      token: 'reset-token-123',
    };

    it('should generate password reset token', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockToken)),
      });

      const result = await service.generatePasswordResetToken(mockForgotPassword);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users/password-reset-token',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockForgotPassword),
        }),
      );
      expect(result).toEqual(mockToken);
    });
  });
});
