import { UserService } from '../../../services/user.js';
import type { 
  UserOut, 
  UserIn, 
  UserBase, 
  UserPagination, 
  PaginationQuery 
} from '../../../types/index.js';
import { createUserService, setupFetchMock, mockResponse, mockEmptyResponse } from '../../utils/user.setup.js';

describe('UserService - Admin User Management', () => {
  let service: UserService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
    service = createUserService(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should get a specific user', async () => {
      const userId = 'user-123';
      const mockResponseData: UserOut = {
        id: userId,
        email: 'test@example.com',
        username: 'testuser',
        fullName: 'Test User',
        group: 'default',
        household: 'default',
        groupId: 'group-123',
        groupSlug: 'default',
        householdId: 'house-123',
        householdSlug: 'default',
        cacheKey: 'cache-key-123',
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.getUser(userId);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = 'user-123';
      const userData: UserBase = {
        email: 'updated@example.com',
      };

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.updateUser(userId, userData);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(userData),
        })
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 'user-123';

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.deleteUser(userId);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}`,
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('getUsers', () => {
    it('should get all users with pagination', async () => {
      const params: PaginationQuery = {
        page: 2,
        perPage: 10,
        orderBy: 'email',
        orderDirection: 'asc',
      };

      const mockResponseData: UserPagination = {
        items: [
          {
            id: '123',
            email: 'test@example.com',
            username: 'testuser',
            group: 'default',
            household: 'default',
            groupId: 'group-123',
            groupSlug: 'default',
            householdId: 'house-123',
            householdSlug: 'default',
            cacheKey: 'cache-key-123',
          },
        ],
        total: 1,
        page: 2,
        perPage: 10,
        totalPages: 1,
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.getUsers(params);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users?page=2&perPage=10&orderBy=email&orderDirection=asc',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should get all users with all pagination parameters', async () => {
      const params: PaginationQuery = {
        page: 1,
        perPage: 50,
        orderBy: 'username',
        orderDirection: 'desc',
        orderByNullPosition: 'last',
        queryFilter: 'test',
        paginationSeed: 'abc123',
      };

      const mockResponseData: UserPagination = {
        items: [],
        total: 0,
        page: 1,
        perPage: 50,
        totalPages: 0,
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.getUsers(params);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users?page=1&perPage=50&orderBy=username&orderDirection=desc&orderByNullPosition=last&queryFilter=test&paginationSeed=abc123',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should get all users without pagination parameters', async () => {
      const mockResponseData: UserPagination = {
        items: [],
        total: 0,
        page: 1,
        perPage: 50,
        totalPages: 0,
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.getUsers();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData: UserIn = {
        username: 'newuser',
        fullName: 'New User',
        email: 'new@example.com',
        password: 'password123',
        admin: false,
      };

      const mockResponseData: UserOut = {
        id: '123',
        email: 'new@example.com',
        username: 'newuser',
        fullName: 'New User',
        group: 'default',
        household: 'default',
        groupId: 'group-123',
        groupSlug: 'default',
        householdId: 'house-123',
        householdSlug: 'default',
        cacheKey: 'cache-key-123',
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.createUser(userData);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(userData),
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });
});
