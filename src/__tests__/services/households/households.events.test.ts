import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { GroupEventNotifierCreate, GroupEventNotifierUpdate } from '../../../types';

describe('HouseholdsService - Event Notifications API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockNotification = { id: '123', name: 'Test Notification', enabled: true, groupId: '456', householdId: '789', options: {} };
  
  beforeEach(() => {
    service.get = jest.fn();
    service.post = jest.fn();
    service.put = jest.fn();
    service.delete = jest.fn();
  });

  test('creates an event notification', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockNotification);
    
    const data: GroupEventNotifierCreate = { name: 'Test Notification' };
    const result = await service.createEventNotification(data);
    
    expect(result).toEqual(mockNotification);
    expect(service.post).toHaveBeenCalledWith('/api/households/events/notifications', data);
  });

  test('tests an event notification', async () => {
    (service.post as jest.Mock).mockResolvedValue({});
    
    await service.testEventNotification('123');
    
    expect(service.post).toHaveBeenCalledWith('/api/households/events/notifications/123/test');
  });

  test('gets event notifications with query params', async () => {
    const mockPagination = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [] };
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const params = { page: 2, perPage: 20 };
    await service.getEventNotifications(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/events/notifications?page=2&perPage=20');
  });

  test('gets a specific event notification', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockNotification);
    
    const result = await service.getEventNotification('123');
    
    expect(result).toEqual(mockNotification);
    expect(service.get).toHaveBeenCalledWith('/api/households/events/notifications/123');
  });

  test('updates an event notification', async () => {
    (service.put as jest.Mock).mockResolvedValue(mockNotification);
    
    const data: GroupEventNotifierUpdate = { id: '123', name: 'Updated Notification', groupId: '456', householdId: '789' };
    const result = await service.updateEventNotification('123', data);
    
    expect(result).toEqual(mockNotification);
    expect(service.put).toHaveBeenCalledWith('/api/households/events/notifications/123', data);
  });

  test('deletes an event notification', async () => {
    (service.delete as jest.Mock).mockResolvedValue({});
    
    await service.deleteEventNotification('123');
    
    expect(service.delete).toHaveBeenCalledWith('/api/households/events/notifications/123');
  });
});
