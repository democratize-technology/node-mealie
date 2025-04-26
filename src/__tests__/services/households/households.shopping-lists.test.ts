import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { ShoppingListCreate, ShoppingListMultiPurposeLabelUpdate, ShoppingListRemoveRecipeParams, ShoppingListAddRecipeParams } from '../../../types';

describe('HouseholdsService - Shopping Lists API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockShoppingList = { id: '123', groupId: '456', userId: '789', householdId: '789', recipeReferences: [], labelSettings: [] };
  const mockPagination = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [mockShoppingList] };

  beforeEach(() => {
    service.get = jest.fn();
    service.post = jest.fn();
    service.put = jest.fn();
    service.delete = jest.fn();
  });

  test('gets shopping lists', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const result = await service.getShoppingLists();
    
    expect(result).toEqual(mockPagination);
    expect(service.get).toHaveBeenCalledWith('/api/households/shopping/lists');
  });

  test('creates a shopping list', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockShoppingList);
    
    const data: ShoppingListCreate = { name: 'Groceries' };
    const result = await service.createShoppingList(data);
    
    expect(result).toEqual(mockShoppingList);
    expect(service.post).toHaveBeenCalledWith('/api/households/shopping/lists', data);
  });

  test('adds recipe ingredients to list', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockShoppingList);
    
    const data = [{ recipeId: 'recipe123' }];
    const result = await service.addRecipeIngredientsToList('123', data);
    
    expect(result).toEqual(mockShoppingList);
    expect(service.post).toHaveBeenCalledWith('/api/households/shopping/lists/123/recipe', data);
  });

  test('updates shopping list label settings', async () => {
    (service.put as jest.Mock).mockResolvedValue(mockShoppingList);
    
    const data: ShoppingListMultiPurposeLabelUpdate[] = [{ shoppingListId: '123', labelId: '456', id: '789', position: 0 }];
    const result = await service.updateShoppingListLabelSettings('123', data);
    
    expect(result).toEqual(mockShoppingList);
    expect(service.put).toHaveBeenCalledWith('/api/households/shopping/lists/123/label-settings', data);
  });

  test('removes recipe ingredients from list', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockShoppingList);
    
    const data: ShoppingListRemoveRecipeParams = { recipeDecrementQuantity: 1 };
    const result = await service.removeRecipeIngredientsFromList('123', 'recipe456', data);
    
    expect(result).toEqual(mockShoppingList);
    expect(service.post).toHaveBeenCalledWith('/api/households/shopping/lists/123/recipe/recipe456/delete', data);
  });

  test('adds single recipe ingredients to list with null params', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockShoppingList);
    
    const result = await service.addSingleRecipeIngredientsToList('123', 'recipe456');
    
    expect(result).toEqual(mockShoppingList);
    expect(service.post).toHaveBeenCalledWith('/api/households/shopping/lists/123/recipe/recipe456', undefined);
  });

  test('adds single recipe ingredients to list with params', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockShoppingList);
    
    const data: ShoppingListAddRecipeParams = { recipeIncrementQuantity: 2 };
    const result = await service.addSingleRecipeIngredientsToList('123', 'recipe456', data);
    
    expect(result).toEqual(mockShoppingList);
    expect(service.post).toHaveBeenCalledWith('/api/households/shopping/lists/123/recipe/recipe456', data);
  });

  test('gets a specific shopping list', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockShoppingList);
    
    const result = await service.getShoppingList('123');
    
    expect(result).toEqual(mockShoppingList);
    expect(service.get).toHaveBeenCalledWith('/api/households/shopping/lists/123');
  });

  test('updates shopping list', async () => {
    (service.put as jest.Mock).mockResolvedValue(mockShoppingList);
    
    const data = { id: '123', groupId: '456', userId: '789' };
    const result = await service.updateShoppingList('123', data);
    
    expect(result).toEqual(mockShoppingList);
    expect(service.put).toHaveBeenCalledWith('/api/households/shopping/lists/123', data);
  });

  test('deletes shopping list', async () => {
    (service.delete as jest.Mock).mockResolvedValue(mockShoppingList);
    
    const result = await service.deleteShoppingList('123');
    
    expect(result).toEqual(mockShoppingList);
    expect(service.delete).toHaveBeenCalledWith('/api/households/shopping/lists/123');
  });
});
