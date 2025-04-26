import { AuthService } from '../../services/auth.js';
import type { AuthToken, OAuthInitResponse, TokenRefreshResponse, LogoutResponse, OAuthCallbackParams } from '../../types/index.js';
import { MealieError } from '../../types/index.js';

describe('AuthService', () => {
  let service: AuthService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    service = new AuthService({ baseUrl: 'https://test.mealie.io' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should authenticate with username and password', async () => {
      const mockResponse: AuthToken = {
        access_token: 'test-token',
        token_type: 'bearer',
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.login('testuser', 'testpass');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/auth/token',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'username=testuser&password=testpass',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle authentication errors', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: () => Promise.resolve('{"detail":"Incorrect username or password"}'),
      });

      await expect(service.login('wronguser', 'wrongpass')).rejects.toThrow(MealieError);
    });

    it('should handle non-JSON error responses', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: () => Promise.resolve('Server error occurred'),
      });

      await expect(service.login('user', 'pass')).rejects.toThrow(MealieError);
    });

    it('should handle non-Error exceptions', async () => {
      fetchMock.mockRejectedValue('Network error');

      await expect(service.login('user', 'pass')).rejects.toThrow(MealieError);
    });

    it('should handle Error exceptions', async () => {
      fetchMock.mockRejectedValue(new Error('Network failure'));

      await expect(service.login('user', 'pass')).rejects.toThrow(MealieError);
    });
  });

  describe('oauthLogin', () => {
    it('should initiate OAuth login flow', async () => {
      const mockResponse: OAuthInitResponse = {
        redirectUrl: 'https://oauth.provider.com/authorize?client_id=test',
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.oauthLogin();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/auth/oauth',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle string redirect response', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('"https://oauth.provider.com/authorize?client_id=test"'),
      });

      const result = await service.oauthLogin();

      expect(result).toEqual({ redirectUrl: 'https://oauth.provider.com/authorize?client_id=test' });
    });
  });

  describe('oauthCallback', () => {
    it('should handle OAuth callback with code', async () => {
      const mockResponse: AuthToken = {
        access_token: 'oauth-token',
        token_type: 'bearer',
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const params: OAuthCallbackParams = {
        code: 'auth-code',
        state: 'random-state',
      };

      const result = await service.oauthCallback(params);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/auth/oauth/callback?code=auth-code&state=random-state',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle OAuth callback with error', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: () => Promise.resolve('{"detail":"OAuth error"}'),
      });

      const params: OAuthCallbackParams = {
        error: 'access_denied',
        error_description: 'User denied access',
      };

      await expect(service.oauthCallback(params)).rejects.toThrow(MealieError);
    });
  });

  describe('refreshToken', () => {
    it('should refresh the token', async () => {
      const mockResponse: TokenRefreshResponse = {
        access_token: 'new-token',
        token_type: 'bearer',
        refresh_token: 'new-refresh-token',
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      // Set a token first
      service.setToken('old-token');

      const result = await service.refreshToken();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/auth/refresh',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: 'Bearer old-token',
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle refresh token errors', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: () => Promise.resolve('{"detail":"Token expired"}'),
      });

      await expect(service.refreshToken()).rejects.toThrow(MealieError);
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      const mockResponse: LogoutResponse = {
        success: true,
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      // Set a token first
      service.setToken('test-token');

      const result = await service.logout();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/auth/logout',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should clear token after logout', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{"success": true}'),
      });

      service.setToken('test-token');
      await service.logout();

      // Try to make a request that requires auth to verify token was cleared
      fetchMock.mockClear();
      await service.refreshToken();
      
      // Check that no Authorization header was sent
      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/auth/refresh',
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.any(String),
          }),
        })
      );
    });
  });
});
