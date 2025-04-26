import { UserService } from '../../../services/user.js';
import type { UserOut } from '../../../types/index.js';
import { createUserService, setupFetchMock, mockResponse } from '../../utils/user.setup.js';

describe('UserService - Self', () => {
  let service: UserService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
    service = createUserService(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentUser', () => {
    it('should get the current user', async () => {
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

      const result = await service.getCurrentUser();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users/self',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });
});
