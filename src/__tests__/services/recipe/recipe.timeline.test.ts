import { createServiceMock } from '../../utils/recipe-test-utils';
import type {
  RecipeTimelineEventIn,
  RecipeTimelineEventOut,
  RecipeTimelineEventUpdate,
  UpdateImageResponse,
} from '../../../types';
import { RecipeService } from '../../../services/recipe';

describe('RecipeService - Recipe Timeline', () => {
  let service: RecipeService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    const mocks = createServiceMock();
    service = mocks.service;
    fetchMock = mocks.fetchMock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get all timeline events', async () => {
    const mockResponse = {
      items: [
        {
          id: '1',
          recipeId: 'recipe1',
          userId: 'user1',
          subject: 'Recipe created',
          eventType: 'info' as const,
          groupId: 'group1',
          householdId: 'household1',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.getAllTimelineEvents();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/timeline/events',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should get a timeline event by single param', async () => {
    const mockResponse = {
      items: [
        {
          id: '1',
          recipeId: 'recipe1',
          userId: 'user1',
          subject: 'Recipe created',
          eventType: 'info' as const,
          groupId: 'group1',
          householdId: 'household1',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.getAllTimelineEvents({
      cookbook: 'cookbook',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/timeline/events?cookbook=cookbook',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should get a timeline event by array params', async () => {
    const mockResponse = {
      items: [
        {
          id: '1',
          recipeId: 'recipe1',
          userId: 'user1',
          subject: 'Recipe created',
          eventType: 'info' as const,
          groupId: 'group1',
          householdId: 'household1',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.getAllTimelineEvents({
      households: ['household1'],
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/timeline/events?households=household1',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should create timeline event', async () => {
    const eventData: RecipeTimelineEventIn = {
      recipeId: 'recipe1',
      subject: 'Recipe updated',
      eventType: 'info',
    };

    const mockResponse: RecipeTimelineEventOut = {
      ...eventData,
      id: '1',
      groupId: 'group1',
      householdId: 'household1',
      userId: 'user1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.createTimelineEvent(eventData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/timeline/events',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(eventData),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should get timeline event', async () => {
    const mockEvent: RecipeTimelineEventOut = {
      id: '1',
      recipeId: 'recipe1',
      userId: 'user1',
      subject: 'Recipe created',
      eventType: 'info',
      groupId: 'group1',
      householdId: 'household1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvent,
      text: async () => JSON.stringify(mockEvent),
    });

    const result = await service.getTimelineEvent('1');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/timeline/events/1',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockEvent);
  });

  it('should update timeline event', async () => {
    const updateData: RecipeTimelineEventUpdate = {
      subject: 'Updated subject',
    };

    const mockResponse: RecipeTimelineEventOut = {
      id: '1',
      recipeId: 'recipe1',
      userId: 'user1',
      subject: 'Updated subject',
      eventType: 'info',
      groupId: 'group1',
      householdId: 'household1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.updateTimelineEvent('1', updateData);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/timeline/events/1',
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: JSON.stringify(updateData),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should delete timeline event', async () => {
    const mockResponse: RecipeTimelineEventOut = {
      id: '1',
      recipeId: 'recipe1',
      userId: 'user1',
      subject: 'Recipe created',
      eventType: 'info',
      groupId: 'group1',
      householdId: 'household1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.deleteTimelineEvent('1');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/timeline/events/1',
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should update timeline event image', async () => {
    const mockImage = new Blob(['test'], { type: 'image/jpeg' });
    const mockResponse: UpdateImageResponse = { image: 'updated-image-url' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      text: async () => JSON.stringify(mockResponse),
    });

    const result = await service.updateTimelineEventImage('1', mockImage, 'jpg');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://test.mealie.io/api/recipes/timeline/events/1/image',
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        body: expect.any(FormData),
      }),
    );
    expect(result).toEqual(mockResponse);
  });
});
