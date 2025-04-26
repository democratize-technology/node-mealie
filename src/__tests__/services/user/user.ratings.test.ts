import { UserService } from '../../../services/user.js';
import type { 
  UserRatingSummary, 
  UserRatings, 
  UserRatingOut, 
  UserRatingUpdate 
} from '../../../types/index.js';
import { createUserService, setupFetchMock, mockResponse, mockEmptyResponse } from '../../utils/user.setup.js';

describe('UserService - Ratings', () => {
  let service: UserService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
    service = createUserService(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentUserRatings', () => {
    it('should get current user ratings', async () => {
      const mockResponseData: UserRatings<UserRatingSummary> = {
        ratings: [
          {
            recipeId: 'recipe-123',
            rating: 5,
            isFavorite: true,
          },
        ],
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.getCurrentUserRatings();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users/self/ratings',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('getCurrentUserRatingForRecipe', () => {
    it('should get current user rating for a specific recipe', async () => {
      const recipeId = 'recipe-123';
      const mockResponseData: UserRatingSummary = {
        recipeId,
        rating: 5,
        isFavorite: true,
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.getCurrentUserRatingForRecipe(recipeId);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/self/ratings/${recipeId}`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('getUserRatings', () => {
    it('should get user ratings', async () => {
      const userId = 'user-123';
      const mockResponseData: UserRatings<UserRatingOut> = {
        ratings: [
          {
            recipeId: 'recipe-123',
            userId,
            id: 'rating-123',
            rating: 4,
            isFavorite: false,
          },
        ],
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.getUserRatings(userId);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}/ratings`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('setRating', () => {
    it('should set rating for a recipe', async () => {
      const userId = 'user-123';
      const recipeSlug = 'test-recipe';
      const ratingData: UserRatingUpdate = {
        rating: 5,
        isFavorite: true,
      };

      fetchMock.mockResolvedValue(mockEmptyResponse());

      await service.setRating(userId, recipeSlug, ratingData);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/${userId}/ratings/${recipeSlug}`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(ratingData),
        })
      );
    });
  });
});
