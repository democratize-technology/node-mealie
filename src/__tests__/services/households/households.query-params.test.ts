import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';

describe('HouseholdsService - Query Parameters', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockPagination = { page: 1, per_page: 10, total: 1, total_pages: 1, items: [] };

  beforeEach(() => {
    service.get = jest.fn();
    (service.get as jest.Mock).mockResolvedValue(mockPagination);
  });

  test('builds query params with all options', async () => {
    const params = {
      orderBy: 'name',
      orderByNullPosition: 'first' as const,
      orderDirection: 'desc' as const,
      queryFilter: 'test search',
      paginationSeed: 'abc123',
      page: 3,
      perPage: 100
    };
    
    await service.getCookbooks(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/cookbooks?orderBy=name&orderByNullPosition=first&orderDirection=desc&queryFilter=test%20search&paginationSeed=abc123&page=3&perPage=100');
  });

  test('handles empty params object correctly', async () => {
    await service.getCookbooks({});
    
    expect(service.get).toHaveBeenCalledWith('/api/households/cookbooks');
  });

  test('handles query params with special characters', async () => {
    const params = {
      queryFilter: 'test & search/with?special=chars'
    };
    
    await service.getMealplanRules(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans/rules?queryFilter=test%20%26%20search%2Fwith%3Fspecial%3Dchars');
  });

  test('handles mealplan date range params', async () => {
    const params = {
      start_date: '2025-04-01',
      end_date: '2025-04-30'
    };
    
    await service.getMealplans(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/mealplans?start_date=2025-04-01&end_date=2025-04-30');
  });

  test('handles pagination and ordering together', async () => {
    const params = {
      page: 2,
      perPage: 20,
      orderBy: 'date',
      orderDirection: 'asc' as const
    };
    
    await service.getEventNotifications(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/events/notifications?orderBy=date&orderDirection=asc&page=2&perPage=20');
  });

  test('handles household members query params', async () => {
    const params = {
      orderDirection: 'desc' as const
    };
    
    await service.getHouseholdMembers(params);
    
    expect(service.get).toHaveBeenCalledWith('/api/households/members?orderDirection=desc');
  });
});
