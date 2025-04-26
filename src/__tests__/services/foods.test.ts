import { FoodsService } from '../../services/foods.js';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import type {
  CreateIngredientFood,
  FoodItem,
  FoodPagination,
  MergeFood,
  QueryParams,
} from '../../types/foods.js';
import type { SuccessResponse } from '../../types/common.js';

describe('FoodsService', () => {
  let service: FoodsService;
  let mockFetch: jest.Mock;

  const mockFood: FoodItem = {
    id: 'food-123',
    name: 'Test Food',
    description: 'A test food item',
  };

  const mockFoodPagination: FoodPagination = {
    items: [mockFood],
    page: 1,
    perPage: 50,
    total: 1,
    totalPages: 1,
  };

  const mockCreateData: CreateIngredientFood = {
    name: 'Test Food',
  };

  const mockMergeData: MergeFood = {
    fromFood: 'food-123',
    toFood: 'food-456',
  };

  const mockSuccessResponse: SuccessResponse = {
    message: 'Foods merged successfully',
  };

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    service = new FoodsService({ baseUrl: 'http://localhost:9000', token: 'test-token' });
  });

  describe('getAllFoods', () => {
    it('should get all foods without parameters', async () => {
      const mockResponse = new Response(JSON.stringify(mockFoodPagination), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.getAllFoods();

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/foods', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toEqual(mockFoodPagination);
    });

    it('should get all foods with query parameters', async () => {
      const mockResponse = new Response(JSON.stringify(mockFoodPagination), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const queryParams: QueryParams = {
        search: 'test',
        orderBy: 'name',
        orderDirection: 'asc' as const,
        orderByNullPosition: 'last' as const,
        page: 1,
        perPage: 10,
      };

      const result = await service.getAllFoods(queryParams);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:9000/api/foods?search=test&orderBy=name&orderDirection=asc&orderByNullPosition=last&page=1&perPage=10',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
        }
      );
      expect(result).toEqual(mockFoodPagination);
    });

    it('should handle empty results', async () => {
      const emptyResponse: FoodPagination = {
        items: [],
        page: 1,
        perPage: 50,
        total: 0,
        totalPages: 0,
      };

      const mockResponse = new Response(JSON.stringify(emptyResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.getAllFoods();

      expect(result).toEqual(emptyResponse);
    });
  });

  describe('createFood', () => {
    it('should create a new food', async () => {
      const mockResponse = new Response(JSON.stringify(mockFood), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.createFood(mockCreateData);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify(mockCreateData),
      });
      expect(result).toEqual(mockFood);
    });

    it('should handle validation errors', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Validation error' }), {
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.createFood(mockCreateData)).rejects.toThrow();
    });
  });

  describe('mergeFoods', () => {
    it('should merge foods', async () => {
      const mockResponse = new Response(JSON.stringify(mockSuccessResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.mergeFoods(mockMergeData);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/foods/merge', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify(mockMergeData),
      });
      expect(result).toEqual(mockSuccessResponse);
    });

    it('should handle merge conflicts', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Merge conflict' }), {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.mergeFoods(mockMergeData)).rejects.toThrow();
    });
  });

  describe('getOne', () => {
    it('should get a single food by ID', async () => {
      const mockResponse = new Response(JSON.stringify(mockFood), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.getOne('food-123');

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/foods/food-123', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toEqual(mockFood);
    });

    it('should handle 404 not found', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Not found' }), {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.getOne('food-123')).rejects.toThrow();
    });
  });

  describe('updateFood', () => {
    it('should update a food', async () => {
      const mockResponse = new Response(JSON.stringify(mockFood), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.updateFood('food-123', mockCreateData);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/foods/food-123', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify(mockCreateData),
      });
      expect(result).toEqual(mockFood);
    });

    it('should handle validation errors', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Validation error' }), {
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.updateFood('food-123', mockCreateData)).rejects.toThrow();
    });
  });

  describe('deleteFood', () => {
    it('should delete a food', async () => {
      const mockResponse = new Response(JSON.stringify(mockFood), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.deleteFood('food-123');

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/foods/food-123', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toEqual(mockFood);
    });

    it('should handle 404 not found', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Not found' }), {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.deleteFood('food-123')).rejects.toThrow();
    });
  });
});
