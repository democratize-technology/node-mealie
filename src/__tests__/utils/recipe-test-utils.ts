import { RecipeService } from '../../services/recipe';

export function createServiceMock() {
  const fetchMock = jest.fn();
  global.fetch = fetchMock;
  const service = new RecipeService({ baseUrl: 'https://test.mealie.io' });
  service.setToken('test-token');
  return { service, fetchMock };
}
