import { UserService } from '../../../services/user.js';
import type { CreateUserRegistration, UserOut } from '../../../types/index.js';
import { createUserService, setupFetchMock, mockResponse } from '../../utils/user.setup.js';

describe('UserService - Registration', () => {
  let service: UserService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
    service = createUserService(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const userData: CreateUserRegistration = {
        email: 'test@example.com',
        username: 'testuser',
        fullName: 'Test User',
        password: 'password123',
        passwordConfirm: 'password123',
      };

      const mockResponseData: UserOut = {
        id: '123',
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

      const result = await service.register(userData);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users/register',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(userData),
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });
});
