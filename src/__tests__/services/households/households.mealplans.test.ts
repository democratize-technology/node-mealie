import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { CreatePlanEntry, CreateRandomEntry, UpdatePlanEntry } from '../../../types';

describe('HouseholdsService - Mealplans API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockMealplan = { id: 123, date: '2025-04-25', groupId: '456', userId: '789', householdId: '789' };
  const mockPagination = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [mockMealplan] };

  beforeEach(() => {
    service.get = jest.fn();
    service.post = jest.fn();
    service.put = jest.fn();
    service.delete = jest.fn();
  });

  test('gets mealplans', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const result = await service.getMealplans();
    
    expect(result).toEqual(mockPagination);
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans');
  });

  test('gets mealplans with date range', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const params = { start_date: '2025-04-01', end_date: '2025-04-30' };
    await service.getMealplans(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans?start_date=2025-04-01&end_date=2025-04-30');
  });

  test('creates a mealplan', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockMealplan);
    
    const data: CreatePlanEntry = { date: '2025-04-25', entryType: 'dinner' };
    const result = await service.createMealplan(data);
    
    expect(result).toEqual(mockMealplan);
    expect(service.post).toHaveBeenCalledWith('/api/households/mealplans', data);
  });

  test('gets todays meals', async () => {
    (service.get as jest.Mock).mockResolvedValue([mockMealplan]);
    
    const result = await service.getTodaysMeals();
    
    expect(result).toEqual([mockMealplan]);
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans/today');
  });

  test('creates random meal', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockMealplan);
    
    const data: CreateRandomEntry = { date: '2025-04-25' };
    const result = await service.createRandomMeal(data);
    
    expect(result).toEqual(mockMealplan);
    expect(service.post).toHaveBeenCalledWith('/api/households/mealplans/random', data);
  });

  test('updates a specific mealplan', async () => {
    (service.put as jest.Mock).mockResolvedValue(mockMealplan);
    
    const data: UpdatePlanEntry = { id: 123, date: '2025-04-25', groupId: '456', userId: '789' };
    const result = await service.updateMealplan(123, data);
    
    expect(result).toEqual(mockMealplan);
    expect(service.put).toHaveBeenCalledWith('/api/households/mealplans/123', data);
  });

  test('deletes a specific mealplan', async () => {
    (service.delete as jest.Mock).mockResolvedValue(mockMealplan);
    
    const result = await service.deleteMealplan(123);
    
    expect(result).toEqual(mockMealplan);
    expect(service.delete).toHaveBeenCalledWith('/api/households/mealplans/123');
  });

  test('gets mealplans with complex query params', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const params = {
      start_date: '2025-04-01',
      end_date: '2025-04-30',
      page: 2,
      perPage: 50,
      orderBy: 'date',
      orderDirection: 'asc' as const
    };
    
    await service.getMealplans(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans?start_date=2025-04-01&end_date=2025-04-30&orderBy=date&orderDirection=asc&page=2&perPage=50');
  });

  test('gets a specific mealplan', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockMealplan);
    
    const result = await service.getMealplan(123);
    
    expect(result).toEqual(mockMealplan);
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans/123');
  });
});
