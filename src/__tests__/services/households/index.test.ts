import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';

describe('HouseholdsService', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  test('service instantiation', () => {
    expect(service).toBeInstanceOf(HouseholdsService);
    expect(service.getSelf).toBeDefined();
    expect(service.getCookbooks).toBeDefined();
    expect(service.getShoppingLists).toBeDefined();
    expect(service.getMealplans).toBeDefined();
    expect(service.getWebhooks).toBeDefined();
  });
});
