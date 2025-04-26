import { UserService } from '../../services/user.js';

export const createUserService = (fetchMock: jest.Mock): UserService => {
  global.fetch = fetchMock;
  return new UserService({ baseUrl: 'https://test.mealie.io' });
};

export const setupFetchMock = (): jest.Mock => {
  const fetchMock = jest.fn();
  global.fetch = fetchMock;
  return fetchMock;
};

export const mockResponse = <T>(data: T) => ({
  ok: true,
  text: () => Promise.resolve(JSON.stringify(data)),
});

export const mockEmptyResponse = () => ({
  ok: true,
  text: () => Promise.resolve(''),
});
