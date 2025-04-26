import { UserService } from '../../../services/user.js';
import type { ChangePassword, ForgotPassword, ResetPassword } from '../../../types/index.js';
import { createUserService, setupFetchMock, mockEmptyResponse } from '../../utils/user.setup.js';

describe('UserService - Password Management', () => {
  let service: UserService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
    service = createUserService(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updatePassword', () => {
    it('should update user password', async () => {
      const passwordData: ChangePassword = {
        currentPassword: 'oldpass',
        newPassword: 'newpass',
      };

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.updatePassword(passwordData);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users/password',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(passwordData),
        })
      );
    });
  });

  describe('forgotPassword', () => {
    it('should initiate forgot password flow', async () => {
      const forgotData: ForgotPassword = {
        email: 'test@example.com',
      };

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.forgotPassword(forgotData);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users/forgot-password',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(forgotData),
        })
      );
    });
  });

  describe('resetPassword', () => {
    it('should reset password', async () => {
      const resetData: ResetPassword = {
        token: 'reset-token',
        email: 'test@example.com',
        password: 'newpass123',
        passwordConfirm: 'newpass123',
      };

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.resetPassword(resetData);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users/reset-password',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(resetData),
        })
      );
    });
  });
});
