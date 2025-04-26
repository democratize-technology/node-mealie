import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { CreateGroupRecipeAction, SaveGroupRecipeAction } from '../../../types';

describe('HouseholdsService - Recipe Actions API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockAction = { id: '123', actionType: 'link', title: 'Test Action', url: 'https://example.com', groupId: '456', householdId: '789' };
  const mockPagination = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [mockAction] };

  beforeEach(() => {
    service.get = jest.fn();
    service.post = jest.fn();
    service.put = jest.fn();
    service.delete = jest.fn();
  });

  test('gets recipe actions with query params', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const params = { queryFilter: 'test' };
    await service.getRecipeActions(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/recipe-actions?queryFilter=test');
  });

  test('creates recipe action', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockAction);
    
    const data: CreateGroupRecipeAction = { actionType: 'link', title: 'New Action', url: 'https://example.com', groupId: '456', householdId: '789' };
    const result = await service.createRecipeAction(data);
    
    expect(result).toEqual(mockAction);
    expect(service.post).toHaveBeenCalledWith('/api/households/recipe-actions', data);
  });

  test('gets a specific recipe action', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockAction);
    
    const result = await service.getRecipeAction('123');
    
    expect(result).toEqual(mockAction);
    expect(service.get).toHaveBeenCalledWith('/api/households/recipe-actions/123');
  });

  test('updates a recipe action', async () => {
    (service.put as jest.Mock).mockResolvedValue(mockAction);
    
    const data: SaveGroupRecipeAction = { actionType: 'link', title: 'Updated Action', url: 'https://example.com', groupId: '456', householdId: '789' };
    const result = await service.updateRecipeAction('123', data);
    
    expect(result).toEqual(mockAction);
    expect(service.put).toHaveBeenCalledWith('/api/households/recipe-actions/123', data);
  });

  test('triggers a recipe action', async () => {
    (service.post as jest.Mock).mockResolvedValue({});
    
    await service.triggerRecipeAction('123', 'test-recipe');
    
    expect(service.post).toHaveBeenCalledWith('/api/households/recipe-actions/123/trigger/test-recipe');
  });

  test('deletes recipe action', async () => {
    (service.delete as jest.Mock).mockResolvedValue(mockAction);
    
    const result = await service.deleteRecipeAction('123');
    
    expect(result).toEqual(mockAction);
    expect(service.delete).toHaveBeenCalledWith('/api/households/recipe-actions/123');
  });
});
