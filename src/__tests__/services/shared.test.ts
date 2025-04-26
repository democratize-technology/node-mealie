import { SharedService } from '../../services/shared.js';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import type { RecipeShareToken, RecipeShareTokenSummary, RecipeShareTokenCreate } from '../../types/shared.js';

describe('SharedService', () => {
  let service: SharedService;
  let mockFetch: jest.Mock;

  const mockSharedRecipeToken: RecipeShareToken = {
    recipeId: 'recipe-123',
    groupId: 'group-123',
    id: 'token-123',
    createdAt: '2024-01-01T00:00:00Z',
    recipe: {
      id: 'recipe-123',
      name: 'Test Recipe',
      slug: 'test-recipe',
      description: 'A test recipe',
    },
  };

  const mockSharedRecipeTokenSummary: RecipeShareTokenSummary = {
    recipeId: 'recipe-123',
    groupId: 'group-123',
    id: 'token-123',
    createdAt: '2024-01-01T00:00:00Z',
  };

  const mockCreateData: RecipeShareTokenCreate = {
    recipeId: 'recipe-123',
  };

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    service = new SharedService({ baseUrl: 'http://localhost:9000', token: 'test-token' });
  });

  describe('getAllSharedRecipes', () => {
    it('should get all shared recipes without filters', async () => {
      const mockResponse = new Response(JSON.stringify([mockSharedRecipeTokenSummary]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.getAllSharedRecipes();

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/shared/recipes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toEqual([mockSharedRecipeTokenSummary]);
    });

    it('should get all shared recipes with recipe_id filter', async () => {
      const mockResponse = new Response(JSON.stringify([mockSharedRecipeTokenSummary]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.getAllSharedRecipes({ recipeId: 'recipe-123' });

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/shared/recipes?recipe_id=recipe-123', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toEqual([mockSharedRecipeTokenSummary]);
    });

    it('should handle empty response', async () => {
      const mockResponse = new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.getAllSharedRecipes();

      expect(result).toEqual([]);
    });
  });

  describe('createSharedRecipe', () => {
    it('should create a shared recipe token', async () => {
      const mockResponse = new Response(JSON.stringify(mockSharedRecipeToken), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.createSharedRecipe(mockCreateData);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/shared/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify(mockCreateData),
      });
      expect(result).toEqual(mockSharedRecipeToken);
    });

    it('should handle error response', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Bad request' }), {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.createSharedRecipe(mockCreateData)).rejects.toThrow();
    });
  });

  describe('getSharedRecipe', () => {
    it('should get a single shared recipe token', async () => {
      const mockResponse = new Response(JSON.stringify(mockSharedRecipeToken), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.getSharedRecipe('token-123');

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/shared/recipes/token-123', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toEqual(mockSharedRecipeToken);
    });

    it('should handle 404 response', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Not found' }), {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.getSharedRecipe('token-123')).rejects.toThrow();
    });
  });

  describe('deleteSharedRecipe', () => {
    it('should delete a shared recipe token', async () => {
      const mockResponse = new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await service.deleteSharedRecipe('token-123');

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/shared/recipes/token-123', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
    });

    it('should handle 404 response', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Not found' }), {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.deleteSharedRecipe('token-123')).rejects.toThrow();
    });
  });
});
