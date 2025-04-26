import { UnitsService } from '../../services/units.js';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import type {
  CreateIngredientUnit,
  IngredientUnit,
  IngredientUnitPagination,
  MergeUnit,
  QueryParams,
} from '../../types/units.js';
import type { SuccessResponse } from '../../types/common.js';

describe('UnitsService', () => {
  let service: UnitsService;
  let mockFetch: jest.Mock;

  const mockUnit: IngredientUnit = {
    id: 'unit-123',
    name: 'Test Unit',
    description: 'A test unit item',
  };

  const mockUnitPagination: IngredientUnitPagination = {
    items: [mockUnit],
    page: 1,
    perPage: 50,
    total: 1,
    totalPages: 1,
  };

  const mockCreateData: CreateIngredientUnit = {
    name: 'Test Unit',
  };

  const mockMergeData: MergeUnit = {
    fromUnit: 'unit-123',
    toUnit: 'unit-456',
  };

  const mockSuccessResponse: SuccessResponse = {
    message: 'Units merged successfully',
  };

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    service = new UnitsService({ baseUrl: 'http://localhost:9000', token: 'test-token' });
  });

  describe('getAllUnits', () => {
    it('should get all units without parameters', async () => {
      const mockResponse = new Response(JSON.stringify(mockUnitPagination), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.getAllUnits();

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/units', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toEqual(mockUnitPagination);
    });

    it('should get all units with query parameters', async () => {
      const mockResponse = new Response(JSON.stringify(mockUnitPagination), {
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

      const result = await service.getAllUnits(queryParams);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:9000/api/units?search=test&orderBy=name&orderDirection=asc&orderByNullPosition=last&page=1&perPage=10',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
        }
      );
      expect(result).toEqual(mockUnitPagination);
    });

    it('should handle empty results', async () => {
      const emptyResponse: IngredientUnitPagination = {
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

      const result = await service.getAllUnits();

      expect(result).toEqual(emptyResponse);
    });
  });

  describe('createUnit', () => {
    it('should create a new unit', async () => {
      const mockResponse = new Response(JSON.stringify(mockUnit), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.createUnit(mockCreateData);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/units', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify(mockCreateData),
      });
      expect(result).toEqual(mockUnit);
    });

    it('should handle validation errors', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Validation error' }), {
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.createUnit(mockCreateData)).rejects.toThrow();
    });
  });

  describe('mergeUnits', () => {
    it('should merge units', async () => {
      const mockResponse = new Response(JSON.stringify(mockSuccessResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.mergeUnits(mockMergeData);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/units/merge', {
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

      await expect(service.mergeUnits(mockMergeData)).rejects.toThrow();
    });
  });

  describe('getOne', () => {
    it('should get a single unit by ID', async () => {
      const mockResponse = new Response(JSON.stringify(mockUnit), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.getOne('unit-123');

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/units/unit-123', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toEqual(mockUnit);
    });

    it('should handle 404 not found', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Not found' }), {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.getOne('unit-123')).rejects.toThrow();
    });
  });

  describe('updateUnit', () => {
    it('should update a unit', async () => {
      const mockResponse = new Response(JSON.stringify(mockUnit), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.updateUnit('unit-123', mockCreateData);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/units/unit-123', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify(mockCreateData),
      });
      expect(result).toEqual(mockUnit);
    });

    it('should handle validation errors', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Validation error' }), {
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.updateUnit('unit-123', mockCreateData)).rejects.toThrow();
    });
  });

  describe('deleteUnit', () => {
    it('should delete a unit', async () => {
      const mockResponse = new Response(JSON.stringify(mockUnit), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await service.deleteUnit('unit-123');

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:9000/api/units/unit-123', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toEqual(mockUnit);
    });

    it('should handle 404 not found', async () => {
      const mockResponse = new Response(JSON.stringify({ detail: 'Not found' }), {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' },
      });
      Object.defineProperty(mockResponse, 'ok', { value: false });
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(service.deleteUnit('unit-123')).rejects.toThrow();
    });
  });
});
