import { AdminService } from '../../../services/admin';
import { MealieError } from '../../../types';

describe('AdminService - Error Handling', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle 401 Unauthorized', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      text: () => Promise.resolve(JSON.stringify({ detail: 'Invalid credentials' })),
    });

    try {
      await service.getAppInfo();
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(MealieError);
      expect(error.statusCode).toBe(401);
      expect(error.statusText).toBe('Unauthorized');
      expect(error.response).toEqual({ detail: 'Invalid credentials' });
    }
  });

  it('should handle 403 Forbidden', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      text: () => Promise.resolve(JSON.stringify({ detail: 'Admin access required' })),
    });

    try {
      await service.getAllUsers();
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(MealieError);
      expect(error.statusCode).toBe(403);
      expect(error.statusText).toBe('Forbidden');
      expect(error.response).toEqual({ detail: 'Admin access required' });
    }
  });

  it('should handle 404 Not Found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: () => Promise.resolve(JSON.stringify({ detail: 'User not found' })),
    });

    try {
      await service.getUser('non-existent-id');
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(MealieError);
      expect(error.statusCode).toBe(404);
      expect(error.statusText).toBe('Not Found');
      expect(error.response).toEqual({ detail: 'User not found' });
    }
  });

  it('should handle 422 Validation Error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 422,
      statusText: 'Unprocessable Entity',
      text: () => Promise.resolve(JSON.stringify({
        detail: [
          {
            loc: ['body', 'email'],
            msg: 'Invalid email format',
            type: 'value_error.email',
          },
        ],
      })),
    });

    await expect(service.createUser({
      username: 'test',
      fullName: 'Test User',
      email: 'invalid-email',
      password: 'password123',
    })).rejects.toThrow(MealieError);
  });

  it('should handle 500 Internal Server Error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: () => Promise.resolve('Server error occurred'),
    });

    try {
      await service.createBackup();
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(MealieError);
      expect(error.statusCode).toBe(500);
      expect(error.statusText).toBe('Internal Server Error');
      expect(error.response).toBe('Server error occurred');
    }
  });

  it('should handle network errors', async () => {
    const mockError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    try {
      await service.checkEmailConfig();
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(MealieError);
      expect(error.message).toBe('Network error');
    }
  });

  it('should handle invalid JSON response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      text: () => Promise.resolve('Invalid JSON response'),
    });

    try {
      await service.sendTestEmail({ email: 'test@example.com' });
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(MealieError);
      expect(error.response).toBe('Invalid JSON response');
    }
  });
});
