import { UserService } from '../../../services/user.js';
import type { 
  LongLiveTokenIn, 
  LongLiveTokenCreateResponse, 
  DeleteTokenResponse 
} from '../../../types/index.js';
import { createUserService, setupFetchMock, mockResponse } from '../../utils/user.setup.js';

describe('UserService - Token Management', () => {
  let service: UserService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
    service = createUserService(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createApiToken', () => {
    it('should create API token', async () => {
      const tokenData: LongLiveTokenIn = {
        name: 'Test Token',
      };

      const mockResponseData: LongLiveTokenCreateResponse = {
        name: 'Test Token',
        id: 1,
        token: 'created-token-123',
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.createApiToken(tokenData);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/users/api-tokens',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(tokenData),
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });

  describe('deleteApiToken', () => {
    it('should delete API token', async () => {
      const tokenId = 1;
      const mockResponseData: DeleteTokenResponse = {
        tokenDelete: true,
      };

      fetchMock.mockResolvedValue(mockResponse(mockResponseData));

      const result = await service.deleteApiToken(tokenId);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/users/api-tokens/${tokenId}`,
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toEqual(mockResponseData);
    });
  });
});
