import { UtilsService } from '../../services/utils';

describe('UtilsService', () => {
  let utils: UtilsService;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    utils = new UtilsService({ baseUrl: 'https://test.mealie.io' });
  });

  it('should download file without token', async () => {
    const mockBlob = new Blob(['test data'], { type: 'application/octet-stream' });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
    });

    const result = await utils.downloadFile();

    expect(mockFetch).toHaveBeenCalledWith(
      'https://test.mealie.io/api/utils/download',
      {
        method: 'GET',
        headers: {},
      }
    );
    expect(result).toBe(mockBlob);
  });

  it('should download file with token parameter', async () => {
    const mockBlob = new Blob(['test data'], { type: 'application/octet-stream' });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
    });

    const result = await utils.downloadFile({ token: 'test-token' });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://test.mealie.io/api/utils/download?token=test-token',
      {
        method: 'GET',
        headers: {},
      }
    );
    expect(result).toBe(mockBlob);
  });

  it('should download file with authorization header', async () => {
    const mockBlob = new Blob(['test data'], { type: 'application/octet-stream' });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
    });

    utils.setToken('auth-token');
    const result = await utils.downloadFile();

    expect(mockFetch).toHaveBeenCalledWith(
      'https://test.mealie.io/api/utils/download',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer auth-token'
        },
      }
    );
    expect(result).toBe(mockBlob);
  });

  it('should handle download errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: () => Promise.resolve('File not found'),
    });

    await expect(utils.downloadFile()).rejects.toThrow('Failed to download file: HTTP 404: Not Found - File not found');
  });

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(utils.downloadFile()).rejects.toThrow('Failed to download file: Network error');
  });

  it('should handle non-error objects in catch block', async () => {
    mockFetch.mockRejectedValueOnce('Unknown error');

    await expect(utils.downloadFile()).rejects.toThrow('Failed to download file');
  });
});
