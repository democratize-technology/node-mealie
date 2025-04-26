import { UserService } from '../../../services/user.js';
import type { UserRatingSummary, UserRatings, UserRatingOut } from '../../../types/index.js';
import { createUserService, setupFetchMock, mockResponse, mockEmptyResponse } from '../../utils/user.setup.js';

describe('UserService - Favorites', () => {
  let service: UserService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
    service = createUserService(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentUserFavorites', () => {
    it('should get current user favorites', async () => {
      const mockResponseData: UserRatings<UserRatingSummary> = {
        ratings: [
          {
            recipeId: 'recipe-123',
            isFavorite: true,
          },
        ],
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.getCurrentUserFavorites();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users/self/favorites',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('getUserFavorites', () => {
    it('should get user favorites', async () => {
      const userId = 'user-123';
      const mockResponseData: UserRatings<UserRatingOut> = {
        ratings: [
          {
            recipeId: 'recipe-123',
            userId,
            id: 'rating-123',
            isFavorite: true,
          },
        ],
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.getUserFavorites(userId);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}/favorites`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('addFavorite', () => {
    it('should add recipe to favorites', async () => {
      const userId = 'user-123';
      const recipeSlug = 'test-recipe';

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.addFavorite(userId, recipeSlug);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}/favorites/${recipeSlug}`,
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });
  });

  describe('removeFavorite', () => {
    it('should remove recipe from favorites', async () => {
      const userId = 'user-123';
      const recipeSlug = 'test-recipe';

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.removeFavorite(userId, recipeSlug);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}/favorites/${recipeSlug}`,
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
    });
  });
});
