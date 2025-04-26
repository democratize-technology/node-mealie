import { ExploreService } from '../../../services/explore';

describe('ExploreService - Error Handling', () => {
  let exploreService: ExploreService;
  const baseUrl = 'https://test.mealie.io';
  const groupSlug = 'test-group';

  beforeEach(() => {
    exploreService = new ExploreService({ baseUrl });
    jest.clearAllMocks();
  });

  it('should handle network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(exploreService.getFoods(groupSlug)).rejects.toThrow('Network error');
  });

  it('should handle non-OK responses', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: async () => JSON.stringify({ detail: 'Resource not found' }),
    });

    await expect(exploreService.getFoods(groupSlug)).rejects.toThrow('HTTP 404: Not Found');
  });

  it('should handle empty response bodies', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: async () => '',
    });

    const result = await exploreService.getFoods(groupSlug);
    expect(result).toEqual({});
  });

  it('should handle invalid JSON responses', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error',
      text: async () => 'Invalid JSON response',
    });

    await expect(exploreService.getFoods(groupSlug)).rejects.toThrow('HTTP 500: Server Error');
  });

  it('should handle authentication errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      text: async () => JSON.stringify({ detail: 'Authentication required' }),
    });

    await expect(exploreService.getFoods(groupSlug)).rejects.toThrow('HTTP 401: Unauthorized');
  });
});
