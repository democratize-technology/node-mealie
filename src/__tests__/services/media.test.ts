import { MediaService } from '../../services/media.js';
import type { ImageType } from '../../types/media.js';

describe('MediaService', () => {
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

  describe('getRecipeImage', () => {
    it('should fetch a recipe image', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/webp' });
      const recipeId = '123';
      const fileName: ImageType = 'original.webp';

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      const result = await service.getRecipeImage(recipeId, fileName);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/media/recipes/${recipeId}/images/${fileName}`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toBe(mockBlob);
    });

    it('should handle errors when fetching recipe image', async () => {
      const recipeId = '123';
      const fileName: ImageType = 'original.webp';

      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: () => Promise.resolve('Image not found'),
      });

      await expect(service.getRecipeImage(recipeId, fileName)).rejects.toThrow(
        'Failed to fetch recipe image: HTTP 404: Not Found - Image not found'
      );
    });

    it('should handle non-Error exceptions when fetching recipe image', async () => {
      const recipeId = '123';
      const fileName: ImageType = 'original.webp';

      fetchMock.mockRejectedValue('Something went wrong');

      await expect(service.getRecipeImage(recipeId, fileName)).rejects.toThrow(
        'Failed to fetch recipe image'
      );
    });

    it('should include auth token when available', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/webp' });
      const recipeId = '123';
      const fileName: ImageType = 'original.webp';
      const token = 'test-token';

      service.setToken(token);

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      await service.getRecipeImage(recipeId, fileName);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    });

    it('should not include auth token when not available', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/webp' });
      const recipeId = '123';
      const fileName: ImageType = 'original.webp';

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      await service.getRecipeImage(recipeId, fileName);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {},
        })
      );
    });
  });

  describe('getRecipeTimelineEventImage', () => {
    it('should fetch a recipe timeline event image', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/webp' });
      const recipeId = '123';
      const timelineEventId = '456';
      const fileName: ImageType = 'min-original.webp';

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      const result = await service.getRecipeTimelineEventImage(recipeId, timelineEventId, fileName);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/media/recipes/${recipeId}/images/timeline/${timelineEventId}/${fileName}`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toBe(mockBlob);
    });

    it('should handle errors when fetching timeline event image', async () => {
      const recipeId = '123';
      const timelineEventId = '456';
      const fileName: ImageType = 'tiny-original.webp';

      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: () => Promise.resolve('Server error'),
      });

      await expect(service.getRecipeTimelineEventImage(recipeId, timelineEventId, fileName)).rejects.toThrow(
        'Failed to fetch timeline event image: HTTP 500: Internal Server Error - Server error'
      );
    });

    it('should handle non-Error exceptions when fetching timeline event image', async () => {
      const recipeId = '123';
      const timelineEventId = '456';
      const fileName: ImageType = 'tiny-original.webp';

      fetchMock.mockRejectedValue('Something went wrong');

      await expect(service.getRecipeTimelineEventImage(recipeId, timelineEventId, fileName)).rejects.toThrow(
        'Failed to fetch timeline event image'
      );
    });

    it('should not include auth token when not available', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/webp' });
      const recipeId = '123';
      const timelineEventId = '456';
      const fileName: ImageType = 'min-original.webp';

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      await service.getRecipeTimelineEventImage(recipeId, timelineEventId, fileName);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {},
        })
      );
    });
  });

  describe('getRecipeAsset', () => {
    it('should fetch a recipe asset', async () => {
      const mockBlob = new Blob(['test asset'], { type: 'application/pdf' });
      const recipeId = '123';
      const fileName = 'recipe.pdf';

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      const result = await service.getRecipeAsset(recipeId, fileName);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/media/recipes/${recipeId}/assets/${fileName}`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toBe(mockBlob);
    });

    it('should handle errors when fetching recipe asset', async () => {
      const recipeId = '123';
      const fileName = 'recipe.pdf';

      fetchMock.mockResolvedValue({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        text: () => Promise.resolve('Access denied'),
      });

      await expect(service.getRecipeAsset(recipeId, fileName)).rejects.toThrow(
        'Failed to fetch recipe asset: HTTP 403: Forbidden - Access denied'
      );
    });

    it('should handle non-Error exceptions when fetching recipe asset', async () => {
      const recipeId = '123';
      const fileName = 'recipe.pdf';

      fetchMock.mockRejectedValue('Something went wrong');

      await expect(service.getRecipeAsset(recipeId, fileName)).rejects.toThrow(
        'Failed to fetch recipe asset'
      );
    });

    it('should not include auth token when not available', async () => {
      const mockBlob = new Blob(['test asset'], { type: 'application/pdf' });
      const recipeId = '123';
      const fileName = 'recipe.pdf';

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      await service.getRecipeAsset(recipeId, fileName);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {},
        })
      );
    });
  });

  describe('getUserImage', () => {
    it('should fetch a user image', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/jpeg' });
      const userId = '789';
      const fileName = 'avatar.jpg';

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      const result = await service.getUserImage(userId, fileName);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/media/users/${userId}/${fileName}`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toBe(mockBlob);
    });

    it('should handle errors when fetching user image', async () => {
      const userId = '789';
      const fileName = 'avatar.jpg';

      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: () => Promise.resolve('User image not found'),
      });

      await expect(service.getUserImage(userId, fileName)).rejects.toThrow(
        'Failed to fetch user image: HTTP 404: Not Found - User image not found'
      );
    });

    it('should handle non-Error exceptions when fetching user image', async () => {
      const userId = '789';
      const fileName = 'avatar.jpg';

      fetchMock.mockRejectedValue('Something went wrong');

      await expect(service.getUserImage(userId, fileName)).rejects.toThrow(
        'Failed to fetch user image'
      );
    });

    it('should not include auth token when not available', async () => {
      const mockBlob = new Blob(['test image'], { type: 'image/jpeg' });
      const userId = '789';
      const fileName = 'avatar.jpg';

      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      await service.getUserImage(userId, fileName);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {},
        })
      );
    });
  });

  describe('getValidationText', () => {
    it('should fetch validation text', async () => {
      const mockText = 'Docker validation successful';

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockText),
      });

      const result = await service.getValidationText();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/media/docker/validate.txt',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toBe(mockText);
    });

    it('should handle errors when fetching validation text', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: () => Promise.resolve('Server error'),
      });

      await expect(service.getValidationText()).rejects.toThrow(
        'Failed to fetch validation text: HTTP 500: Internal Server Error - Server error'
      );
    });

    it('should handle non-Error exceptions when fetching validation text', async () => {
      fetchMock.mockRejectedValue('Something went wrong');

      await expect(service.getValidationText()).rejects.toThrow(
        'Failed to fetch validation text'
      );
    });

    it('should include auth token when available', async () => {
      const mockText = 'Docker validation successful';
      const token = 'test-token';

      service.setToken(token);

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockText),
      });

      await service.getValidationText();

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    });
  });

  describe('token coverage', () => {
    it('should include auth token for timeline event image', async () => {
      service = new MediaService({ baseUrl: 'https://test.mealie.io', token: 'test-token' });
      const mockBlob = new Blob(['test image'], { type: 'image/webp' });
      
      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      await service.getRecipeTimelineEventImage('123', '456', 'original.webp');

      const calledConfig = fetchMock.mock.calls[0][1];
      expect(calledConfig.headers['Authorization']).toBe('Bearer test-token');
    });

    it('should include auth token for asset', async () => {
      service = new MediaService({ baseUrl: 'https://test.mealie.io', token: 'test-token' });
      const mockBlob = new Blob(['test asset'], { type: 'application/pdf' });
      
      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      await service.getRecipeAsset('123', 'recipe.pdf');

      const calledConfig = fetchMock.mock.calls[0][1];
      expect(calledConfig.headers['Authorization']).toBe('Bearer test-token');
    });

    it('should include auth token for user image', async () => {
      service = new MediaService({ baseUrl: 'https://test.mealie.io', token: 'test-token' });
      const mockBlob = new Blob(['test image'], { type: 'image/jpeg' });
      
      fetchMock.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      });

      await service.getUserImage('789', 'avatar.jpg');

      const calledConfig = fetchMock.mock.calls[0][1];
      expect(calledConfig.headers['Authorization']).toBe('Bearer test-token');
    });
  });
});
