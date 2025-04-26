import { UserService } from '../../../services/user.js';
import { createUserService, setupFetchMock, mockEmptyResponse } from '../../utils/user.setup.js';

describe('UserService - Image Management', () => {
  let service: UserService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
    service = createUserService(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUserImage', () => {
    it('should update user image', async () => {
      const userId = 'user-123';
      const imageFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.updateUserImage(userId, imageFile);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}/image`,
        expect.objectContaining({
          method: 'POST',
          // FormData is tricky to test, so we just check it was called
        })
      );
    });

    it('should update user image with authentication', async () => {
      const userId = 'user-123';
      const imageFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      service.setToken('test-token');

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.updateUserImage(userId, imageFile);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}/image`,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      );
    });
  });
});
