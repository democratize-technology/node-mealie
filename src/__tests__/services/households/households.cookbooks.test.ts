import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { CreateCookBook, UpdateCookBook } from '../../../types';

describe('HouseholdsService - Cookbooks API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockCookbook = { id: '123', name: 'Test Cookbook', groupId: '456', householdId: '789' };
  const mockPagination = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [mockCookbook] };

  beforeEach(() => {
    service.get = jest.fn();
    service.post = jest.fn();
    service.put = jest.fn();
    service.delete = jest.fn();
  });

  test('gets cookbooks', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const result = await service.getCookbooks();
    
    expect(result).toEqual(mockPagination);
    expect(service.get).toHaveBeenCalledWith('/api/households/cookbooks');
  });

  test('gets cookbooks with query params', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const params = { page: 2, perPage: 20, orderBy: 'name', orderDirection: 'asc' as const };
    await service.getCookbooks(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/cookbooks?orderBy=name&orderDirection=asc&page=2&perPage=20');
  });

  test('creates a cookbook', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockCookbook);
    
    const data: CreateCookBook = { name: 'Test Cookbook' };
    const result = await service.createCookbook(data);
    
    expect(result).toEqual(mockCookbook);
    expect(service.post).toHaveBeenCalledWith('/api/households/cookbooks', data);
  });

  test('updates a cookbook', async () => {
    (service.put as jest.Mock).mockResolvedValue(mockCookbook);
    
    const data: CreateCookBook = { name: 'Updated Cookbook' };
    const result = await service.updateCookbook('123', data);
    
    expect(result).toEqual(mockCookbook);
    expect(service.put).toHaveBeenCalledWith('/api/households/cookbooks/123', data);
  });

  test('deletes a cookbook', async () => {
    (service.delete as jest.Mock).mockResolvedValue(mockCookbook);
    
    const result = await service.deleteCookbook('123');
    
    expect(result).toEqual(mockCookbook);
    expect(service.delete).toHaveBeenCalledWith('/api/households/cookbooks/123');
  });

  test('updates many cookbooks', async () => {
    const mockCookbooks = [{ id: '123', name: 'Cookbook 1', groupId: '456', householdId: '789' }];
    (service.put as jest.Mock).mockResolvedValue(mockCookbooks);
    
    const data: UpdateCookBook[] = [{ id: '123', name: 'Updated Cookbook 1', groupId: '456', householdId: '789' }];
    const result = await service.updateManyCookbooks(data);
    
    expect(result).toEqual(mockCookbooks);
    expect(service.put).toHaveBeenCalledWith('/api/households/cookbooks', data);
  });

  test('gets a specific cookbook', async () => {
    const mockDetailedCookbook = { ...mockCookbook, recipes: [] };
    (service.get as jest.Mock).mockResolvedValue(mockDetailedCookbook);
    
    const result = await service.getCookbook('123');
    
    expect(result).toEqual(mockDetailedCookbook);
    expect(service.get).toHaveBeenCalledWith('/api/households/cookbooks/123');
  });
});
