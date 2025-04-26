import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { PlanRulesCreate } from '../../../types';

describe('HouseholdsService - Mealplan Rules API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockRule = { id: '123', groupId: '456', householdId: '789', day: 'monday', entryType: 'dinner' };
  const mockPagination = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [mockRule] };

  beforeEach(() => {
    service.get = jest.fn();
    service.post = jest.fn();
    service.put = jest.fn();
    service.delete = jest.fn();
  });

  test('gets mealplan rules', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const result = await service.getMealplanRules();
    
    expect(result).toEqual(mockPagination);
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans/rules');
  });

  test('creates a mealplan rule', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockRule);
    
    const data: PlanRulesCreate = { day: 'monday', entryType: 'dinner' };
    const result = await service.createMealplanRule(data);
    
    expect(result).toEqual(mockRule);
    expect(service.post).toHaveBeenCalledWith('/api/households/mealplans/rules', data);
  });

  test('gets a specific mealplan rule', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockRule);
    
    const result = await service.getMealplanRule('123');
    
    expect(result).toEqual(mockRule);
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans/rules/123');
  });

  test('updates a mealplan rule', async () => {
    (service.put as jest.Mock).mockResolvedValue(mockRule);
    
    const data: PlanRulesCreate = { day: 'monday', entryType: 'dinner' };
    const result = await service.updateMealplanRule('123', data);
    
    expect(result).toEqual(mockRule);
    expect(service.put).toHaveBeenCalledWith('/api/households/mealplans/rules/123', data);
  });

  test('deletes a mealplan rule', async () => {
    (service.delete as jest.Mock).mockResolvedValue(mockRule);
    
    const result = await service.deleteMealplanRule('123');
    
    expect(result).toEqual(mockRule);
    expect(service.delete).toHaveBeenCalledWith('/api/households/mealplans/rules/123');
  });

  test('handles query params with special characters', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const params = {
      queryFilter: 'test & search/with?special=chars'
    };
    
    await service.getMealplanRules(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans/rules?queryFilter=test%20%26%20search%2Fwith%3Fspecial%3Dchars');
  });
});
