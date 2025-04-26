import { CommentsService } from '../../services/comments.js';
import type {
  RecipeCommentOut,
  RecipeCommentCreate,
  RecipeCommentUpdate,
  RecipeCommentPagination,
  SuccessResponse,
  CommentQueryParams,
} from '../../types/index.js';

describe('CommentsService', () => {
  let service: CommentsService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    service = new CommentsService({ baseUrl: 'https://test.mealie.io' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllComments', () => {
    it('should fetch all comments without parameters', async () => {
      const mockResponse: RecipeCommentPagination = {
        page: 1,
        per_page: 10,
        total: 1,
        total_pages: 1,
        items: [
          {
            id: 'test-id',
            recipeId: 'recipe-id',
            text: 'Test comment',
            userId: 'user-id',
            user: {
              id: 'user-id',
              username: 'test-user',
              fullName: 'Test User',
              admin: false,
            },
            createdAt: '2024-04-26T00:00:00Z',
            updatedAt: '2024-04-26T00:00:00Z',
          },
        ],
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.getAllComments();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/comments',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch comments with query parameters', async () => {
      const params: CommentQueryParams = {
        page: 2,
        perPage: 20,
        orderBy: 'createdAt',
        orderDirection: 'desc',
        queryFilter: 'test',
      };

      const mockResponse: RecipeCommentPagination = {
        page: 2,
        per_page: 20,
        total: 1,
        total_pages: 1,
        items: [],
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.getAllComments(params);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/comments?page=2&perPage=20&orderBy=createdAt&orderDirection=desc&queryFilter=test',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createComment', () => {
    it('should create a new comment', async () => {
      const newComment: RecipeCommentCreate = {
        recipeId: 'recipe-id',
        text: 'This is a new comment',
      };

      const mockResponse: RecipeCommentOut = {
        id: 'new-comment-id',
        recipeId: 'recipe-id',
        text: 'This is a new comment',
        userId: 'user-id',
        user: {
          id: 'user-id',
          username: 'test-user',
          fullName: 'Test User',
          admin: false,
        },
        createdAt: '2024-04-26T00:00:00Z',
        updatedAt: '2024-04-26T00:00:00Z',
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.createComment(newComment);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/comments',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newComment),
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getComment', () => {
    it('should fetch a specific comment by ID', async () => {
      const commentId = 'test-comment-id';
      const mockResponse: RecipeCommentOut = {
        id: commentId,
        recipeId: 'recipe-id',
        text: 'Test comment',
        userId: 'user-id',
        user: {
          id: 'user-id',
          username: 'test-user',
          fullName: 'Test User',
          admin: false,
        },
        createdAt: '2024-04-26T00:00:00Z',
        updatedAt: '2024-04-26T00:00:00Z',
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.getComment(commentId);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/comments/${commentId}`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateComment', () => {
    it('should update an existing comment', async () => {
      const commentId = 'test-comment-id';
      const updateData: RecipeCommentUpdate = {
        id: commentId,
        text: 'Updated comment text',
      };

      const mockResponse: RecipeCommentOut = {
        id: commentId,
        recipeId: 'recipe-id',
        text: 'Updated comment text',
        userId: 'user-id',
        user: {
          id: 'user-id',
          username: 'test-user',
          fullName: 'Test User',
          admin: false,
        },
        createdAt: '2024-04-26T00:00:00Z',
        updatedAt: '2024-04-26T00:00:00Z',
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.updateComment(commentId, updateData);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/comments/${commentId}`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData),
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      const commentId = 'test-comment-id';
      const mockResponse: SuccessResponse = {
        message: 'Comment deleted successfully',
        success: true,
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.deleteComment(commentId);

      expect(fetchMock).toHaveBeenCalledWith(
        `https://test.mealie.io/api/comments/${commentId}`,
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('error handling', () => {
    it('should handle network errors gracefully', async () => {
      fetchMock.mockRejectedValue(new Error('Network error'));

      await expect(service.getAllComments()).rejects.toThrow('Network error');
    });

    it('should handle non-OK responses', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        text: () => Promise.resolve('Not found'),
      });

      await expect(service.getComment('non-existent-id')).rejects.toThrow();
    });
  });

  describe('query parameter edge cases', () => {
    it('should handle empty parameters object', async () => {
      const mockResponse: RecipeCommentPagination = {
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 0,
        items: [],
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.getAllComments({});

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/comments',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle undefined values in parameters', async () => {
      const params: CommentQueryParams = {
        page: 1,
        perPage: undefined,
        orderBy: undefined,
        orderDirection: 'asc',
      };

      const mockResponse: RecipeCommentPagination = {
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 0,
        items: [],
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.getAllComments(params);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/comments?page=1&orderDirection=asc',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle zero values in parameters', async () => {
      const params: CommentQueryParams = {
        page: 0,
        perPage: 0,
      };

      const mockResponse: RecipeCommentPagination = {
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0,
        items: [],
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.getAllComments(params);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/comments?page=0&perPage=0',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
