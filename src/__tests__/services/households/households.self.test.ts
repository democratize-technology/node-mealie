import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { SetPermissions, UpdateHouseholdPreferences } from '../../../types';

describe('HouseholdsService - Self Service API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockHousehold = { id: '123', name: 'My Household', groupId: '456', slug: 'my-household', group: 'Test Group' };
  const mockPreferences = { id: '123', privateHousehold: false, recipePublic: true };
  const mockStats = { totalRecipes: 10, totalUsers: 2, totalCategories: 5, totalTags: 8, totalTools: 3 };

  beforeEach(() => {
    service.get = jest.fn();
    service.put = jest.fn();
  });

  test('gets current household', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockHousehold);
    
    const result = await service.getSelf();
    
    expect(result).toEqual(mockHousehold);
    expect(service.get).toHaveBeenCalledWith('/api/households/self');
  });

  test('gets household preferences', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPreferences);
    
    const result = await service.getHouseholdPreferences();
    
    expect(result).toEqual(mockPreferences);
    expect(service.get).toHaveBeenCalledWith('/api/households/preferences');
  });

  test('updates household preferences', async () => {
    (service.put as jest.Mock).mockResolvedValue(mockPreferences);
    
    const data: UpdateHouseholdPreferences = { privateHousehold: true };
    const result = await service.updateHouseholdPreferences(data);
    
    expect(result).toEqual(mockPreferences);
    expect(service.put).toHaveBeenCalledWith('/api/households/preferences', data);
  });

  test('sets member permissions', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    (service.put as jest.Mock).mockResolvedValue(mockUser);
    
    const data: SetPermissions = { userId: '123', canManage: true };
    const result = await service.setMemberPermissions(data);
    
    expect(result).toEqual(mockUser);
    expect(service.put).toHaveBeenCalledWith('/api/households/permissions', data);
  });

  test('gets statistics', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockStats);
    
    const result = await service.getStatistics();
    
    expect(result).toEqual(mockStats);
    expect(service.get).toHaveBeenCalledWith('/api/households/statistics');
  });

  test('gets household recipe', async () => {
    const mockRecipe = { recipeId: '123' };
    (service.get as jest.Mock).mockResolvedValue(mockRecipe);
    
    const result = await service.getHouseholdRecipe('test-recipe');
    
    expect(result).toEqual(mockRecipe);
    expect(service.get).toHaveBeenCalledWith('/api/households/self/recipes/test-recipe');
  });

  test('gets household members with query params', async () => {
    const mockMembers = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [] };
    (service.get as jest.Mock).mockResolvedValue(mockMembers);
    
    const params = { orderDirection: 'desc' as const };
    await service.getHouseholdMembers(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/members?orderDirection=desc');
  });
});
