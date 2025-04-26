import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { CreateWebhook } from '../../../types';

describe('HouseholdsService - Webhooks API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockWebhook = { id: '123', scheduledTime: '12:00', groupId: '456', householdId: '789' };
  const mockPagination = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [mockWebhook] };

  beforeEach(() => {
    service.get = jest.fn();
    service.post = jest.fn();
    service.put = jest.fn();
    service.delete = jest.fn();
  });

  test('gets webhooks', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
    
    const result = await service.getWebhooks();
    
    expect(result).toEqual(mockPagination);
    expect(service.get).toHaveBeenCalledWith('/api/households/webhooks');
  });

  test('creates a webhook', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockWebhook);
    
    const data: CreateWebhook = { scheduledTime: '12:00' };
    const result = await service.createWebhook(data);
    
    expect(result).toEqual(mockWebhook);
    expect(service.post).toHaveBeenCalledWith('/api/households/webhooks', data);
  });

  test('tests a webhook', async () => {
    (service.post as jest.Mock).mockResolvedValue({});
    
    await service.testWebhook('123');
    
    expect(service.post).toHaveBeenCalledWith('/api/households/webhooks/123/test');
  });

  test('reruns webhooks', async () => {
    (service.post as jest.Mock).mockResolvedValue({});
    
    await service.rerunWebhooks();
    
    expect(service.post).toHaveBeenCalledWith('/api/households/webhooks/rerun');
  });

  test('gets a specific webhook', async () => {
    (service.get as jest.Mock).mockResolvedValue(mockWebhook);
    
    const result = await service.getWebhook('123');
    
    expect(result).toEqual(mockWebhook);
    expect(service.get).toHaveBeenCalledWith('/api/households/webhooks/123');
  });

  test('updates webhook', async () => {
    (service.put as jest.Mock).mockResolvedValue(mockWebhook);
    
    const data = { scheduledTime: '12:00' };
    const result = await service.updateWebhook('123', data);
    
    expect(result).toEqual(mockWebhook);
    expect(service.put).toHaveBeenCalledWith('/api/households/webhooks/123', data);
  });

  test('deletes webhook', async () => {
    (service.delete as jest.Mock).mockResolvedValue(mockWebhook);
    
    const result = await service.deleteWebhook('123');
    
    expect(result).toEqual(mockWebhook);
    expect(service.delete).toHaveBeenCalledWith('/api/households/webhooks/123');
  });
});
