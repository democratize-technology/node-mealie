import { MediaService } from '../../services/media.js';

describe('MediaService Debug', () => {
  let service: MediaService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    service = new MediaService({ baseUrl: 'https://test.mealie.io' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('auth token debug', () => {
    it('should set token', async () => {
      service.setToken('test-token');
      // @ts-ignore - Access private property for testing
      expect(service.token).toBe('test-token');
    });

    it('should actually hit the auth header line', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/webp' });
      const token = 'test-token';
      service.setToken(token);

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      await service.getRecipeImage('123', 'original.webp');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      );
    });
  });
});
