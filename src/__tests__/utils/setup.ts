// Global test setup file to mock fetch
import { jest } from '@jest/globals';

// Mock fetch globally
global.fetch = jest.fn();

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});

// Dummy test to prevent Jest from complaining
test('setup file runs', () => {
  expect(global.fetch).toBeDefined();
});
