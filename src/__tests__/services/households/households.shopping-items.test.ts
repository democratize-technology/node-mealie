import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { ShoppingListItemCreate, ShoppingListItemUpdate } from '../../../types';

describe('HouseholdsService - Shopping List Items API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockItem = { id: '123', shoppingListId: '456', groupId: '789', householdId: '789' };
  const mockCollectionOut = { createdItems: [mockItem], updatedItems: [] };

  beforeEach(() => {
    service.get = jest.fn();
    service.post = jest.fn();
    service.put = jest.fn();
    service.delete = jest.fn();
  });

  test('creates shopping list item', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockCollectionOut);
    
    const data: ShoppingListItemCreate = { shoppingListId: '456', note: 'Buy milk' };
    const result = await service.createShoppingListItem(data);
    
    expect(result).toEqual(mockCollectionOut);
    expect(service.post).toHaveBeenCalledWith('/api/households/shopping/items', data);
  });

  test('deletes many shopping list items', async () => {
    const mockResponse = { message: 'Success' };
    (service.delete as jest.Mock).mockResolvedValue(mockResponse);
    
    const ids = ['123', '456'];
    const result = await service.deleteManyShoppingListItems(ids);
    
    expect(result).toEqual(mockResponse);
    expect(service.delete).toHaveBeenCalledWith('/api/households/shopping/items?ids=123&ids=456');
  });

  test('creates many shopping list items', async () => {
    const mockBulkResponse = { createdItems: [], updatedItems: [] };
    (service.post as jest.Mock).mockResolvedValue(mockBulkResponse);
    
    const data = [{ shoppingListId: '123', note: 'Item 1' }];
    const result = await service.createManyShoppingListItems(data);
    
    expect(result).toEqual(mockBulkResponse);
    expect(service.post).toHaveBeenCalledWith('/api/households/shopping/items/create-bulk', data);
  });

  test('gets shopping list items with query params', async () => {
    const mockPagination = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [] };
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const params = { page: 2, perPage: 20 };
    await service.getShoppingListItems(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/shopping/items?page=2&perPage=20');
  });

  test('updates shopping list item', async () => {
    const mockSingleUpdate = { createdItems: [], updatedItems: [] };
    (service.put as jest.Mock).mockResolvedValue(mockSingleUpdate);
    
    const data: ShoppingListItemUpdate = { shoppingListId: '123', note: 'Updated item' };
    const result = await service.updateShoppingListItem('456', data);
    
    expect(result).toEqual(mockSingleUpdate);
    expect(service.put).toHaveBeenCalledWith('/api/households/shopping/items/456', data);
  });

  test('updates many shopping list items', async () => {
    const mockCollectionOut = { createdItems: [], updatedItems: [] };
    (service.put as jest.Mock).mockResolvedValue(mockCollectionOut);
    
    const data = [{ id: '123', shoppingListId: '456', note: 'Updated item' }];
    const result = await service.updateManyShoppingListItems(data);
    
    expect(result).toEqual(mockCollectionOut);
    expect(service.put).toHaveBeenCalledWith('/api/households/shopping/items', data);
  });

  test('deletes shopping list item', async () => {
    const mockResponse = { message: 'Success' };
    (service.delete as jest.Mock).mockResolvedValue(mockResponse);
    
    const result = await service.deleteShoppingListItem('123');
    
    expect(result).toEqual(mockResponse);
    expect(service.delete).toHaveBeenCalledWith('/api/households/shopping/items/123');
  });

  test('gets shopping list item', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockItem);
    
    const result = await service.getShoppingListItem('123');
    
    expect(result).toEqual(mockItem);
    expect(service.get).toHaveBeenCalledWith('/api/households/shopping/items/123');
  });
});
