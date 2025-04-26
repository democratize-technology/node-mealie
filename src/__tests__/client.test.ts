import { MealieClient, MealieError } from '../index.js';

describe('MealieClient', () => {
  let client: MealieClient;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    client = new MealieClient({ baseUrl: 'https://test.mealie.io' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      const client = new MealieClient();
      expect(client).toBeInstanceOf(MealieClient);
    });

    it('should remove trailing slash from baseUrl', () => {
      const client = new MealieClient({ baseUrl: 'https://test.mealie.io/' });
      expect(client['baseUrl']).toBe('https://test.mealie.io');
    });

    it('should handle options without baseUrl', () => {
      const client = new MealieClient({ debug: true });
      expect(client['baseUrl']).toBe('https://demo.mealie.io');
    });

    it('should handle options with null baseUrl', () => {
      const client = new MealieClient({ baseUrl: null as unknown as string });
      expect(client['baseUrl']).toBe('https://demo.mealie.io');
    });

    it('should authenticate if credentials provided', async () => {
      const authMock = jest.fn().mockResolvedValue({ access_token: 'test-token' });
      fetchMock.mockImplementation(authMock);

      new MealieClient({
        baseUrl: 'https://test.mealie.io',
        username: 'test',
        password: 'pass',
      });

      // Wait for the constructor to complete
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(authMock).toHaveBeenCalled();
    });

    it('should handle authentication failure gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      fetchMock.mockRejectedValue(new Error('Auth failed'));

      new MealieClient({
        baseUrl: 'https://test.mealie.io',
        username: 'test',
        password: 'pass',
        debug: true,
      });

      // Wait for the constructor to complete
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('authenticate', () => {
    it('should handle MealieError thrown during authentication', async () => {
      const error = new MealieError('Test error', 400, 'Bad Request');
      fetchMock.mockRejectedValue(error);

      await expect(client.authenticate('test', 'pass')).rejects.toThrow(error);
    });

    it('should handle unknown error during authentication', async () => {
      fetchMock.mockRejectedValue('Unknown error');

      await expect(client.authenticate('test', 'pass')).rejects.toThrow(MealieError);
      await expect(client.authenticate('test', 'pass')).rejects.toThrow('Unknown error occurred');
    });
    it('should authenticate successfully', async () => {
      const mockResponse = { access_token: 'test-token', token_type: 'bearer' };
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      await client.authenticate('test', 'pass');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/auth/token',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
          body: 'username=test&password=pass',
        }),
      );
      expect(client['token']).toBe('test-token');
    });

    it('should throw error on authentication failure', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: () => Promise.resolve('Invalid credentials'),
      });

      await expect(client.authenticate('test', 'wrong')).rejects.toThrow(MealieError);
    });
  });

  describe('setToken / clearToken', () => {
    it('should set and clear token', () => {
      client.setToken('test-token');
      expect(client['token']).toBe('test-token');

      client.clearToken();
      expect(client['token']).toBeUndefined();
    });
  });

  describe('authenticate', () => {
    it('should log authentication success when debug is enabled', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const client = new MealieClient({ debug: true });

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ access_token: 'test-token' })),
      });

      await client.authenticate('test', 'pass');

      expect(consoleSpy).toHaveBeenCalledWith('[MealieClient]', 'Authentication successful');
      consoleSpy.mockRestore();
    });
  });

  describe('request', () => {
    it('should make successful GET request', async () => {
      const mockResponse = { data: 'test' };
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await client['get']('/test');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    it('should include auth token in headers', async () => {
      client.setToken('test-token');
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{}'),
      });

      await client['get']('/test');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        }),
      );
    });

    it('should handle empty response', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(''),
      });

      const result = await client['get']('/test');
      expect(result).toEqual({});
    });

    it('should handle non-JSON error response', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: () => Promise.resolve('Server Error'),
      });

      await expect(client['get']('/test')).rejects.toThrow(MealieError);
    });

    it('should handle JSON error response', async () => {
      const errorResponse = { detail: 'Something went wrong' };
      fetchMock.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: () => Promise.resolve(JSON.stringify(errorResponse)),
      });

      try {
        await client['get']('/test');
      } catch (error) {
        expect(error).toBeInstanceOf(MealieError);
        expect((error as MealieError).response).toEqual(errorResponse);
      }
    });

    it('should handle network errors', async () => {
      fetchMock.mockRejectedValue(new Error('Network error'));

      await expect(client['get']('/test')).rejects.toThrow(MealieError);
    });

    it('should handle unknown errors', async () => {
      fetchMock.mockRejectedValue('Unknown error');

      await expect(client['get']('/test')).rejects.toThrow(MealieError);
    });

    it('should log requests when debug is enabled', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const client = new MealieClient({ debug: true });

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{}'),
      });

      await client['get']('/test');

      expect(consoleSpy).toHaveBeenCalledWith('[MealieClient]', 'GET https://demo.mealie.io/test');
      consoleSpy.mockRestore();
    });

    it('should handle request without method specified', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{}'),
      });

      await client['request']('/test');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      );
    });

    it('should handle request with predefined headers', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{}'),
      });

      await client['request']('/test', {
        headers: { 'X-Custom': 'test' },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Custom': 'test',
            'Content-Type': 'application/json',
          }),
        }),
      );
    });
  });

  describe('HTTP methods', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{}'),
      });
    });

    it('should make POST request', async () => {
      const data = { test: 'data' };
      await client['post']('/test', data);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(data),
        }),
      );
    });

    it('should handle post with undefined body', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{}'),
      });

      await client['put']('/test', undefined);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          method: 'PUT',
          body: undefined,
        }),
      );
    });
    it('should handle post with explicit options', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{}'),
      });

      await client['post']('/test', { data: 'test' }, { headers: { 'X-Test': '1' } });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'X-Test': '1',
          }),
          body: JSON.stringify({ data: 'test' }),
        }),
      );
    });

    it('should make PUT request', async () => {
      const data = { test: 'data' };
      await client['put']('/test', data);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      );
    });

    it('should make PATCH request', async () => {
      const data = { test: 'data' };
      await client['patch']('/test', data);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          method: 'PATCH',
        }),
      );
    });

    it('should make DELETE request', async () => {
      await client['delete']('/test');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
    });

    it('should handle optional body parameter', async () => {
      await client['post']('/test');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/test',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
        }),
      );
    });
  });
});
