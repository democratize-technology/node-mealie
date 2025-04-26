import { IngredientParserService } from '../../services/ingredient-parser.js';
import type { ParsedIngredient } from '../../types/index.js';
import { MealieError } from '../../types/index.js';

describe('IngredientParserService', () => {
  let service: IngredientParserService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    service = new IngredientParserService({ baseUrl: 'https://test.mealie.io' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('parseIngredient', () => {
    const mockParsedIngredient: ParsedIngredient = {
      input: '2 cups all-purpose flour',
      confidence: 0.95,
      quantity: 2,
      unit: 'cups',
      food: 'all-purpose flour',
      original: '2 cups all-purpose flour',
    };

    it('should parse a single ingredient', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockParsedIngredient)),
      });

      const result = await service.parseIngredient('2 cups all-purpose flour');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/parser/ingredient',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ ingredient: '2 cups all-purpose flour' }),
        })
      );
      expect(result).toEqual(mockParsedIngredient);
    });

    it('should include Accept-Language header when provided', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockParsedIngredient)),
      });

      await service.parseIngredient('2 tasses de farine', 'fr-FR');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/parser/ingredient',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Accept-Language': 'fr-FR',
          }),
          body: JSON.stringify({ ingredient: '2 tasses de farine' }),
        })
      );
    });

    it('should handle API errors', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: () => Promise.resolve('{"detail":"Invalid ingredient format"}'),
      });

      await expect(service.parseIngredient('invalid')).rejects.toThrow(MealieError);
    });

    it('should handle network errors', async () => {
      fetchMock.mockRejectedValue(new TypeError('Network error'));

      await expect(service.parseIngredient('test')).rejects.toThrow(MealieError);
    });
  });

  describe('parseIngredients', () => {
    const mockParsedIngredients: ParsedIngredient[] = [
      {
        input: '2 cups all-purpose flour',
        confidence: 0.95,
        quantity: 2,
        unit: 'cups',
        food: 'all-purpose flour',
      },
      {
        input: '1 tsp vanilla extract',
        confidence: 0.93,
        quantity: 1,
        unit: 'tsp',
        food: 'vanilla extract',
      },
    ];

    it('should parse multiple ingredients', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockParsedIngredients)),
      });

      const result = await service.parseIngredients([
        '2 cups all-purpose flour',
        '1 tsp vanilla extract',
      ]);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/parser/ingredients',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            ingredients: ['2 cups all-purpose flour', '1 tsp vanilla extract'],
          }),
        })
      );
      expect(result).toEqual(mockParsedIngredients);
    });

    it('should include Accept-Language header when provided', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockParsedIngredients)),
      });

      await service.parseIngredients(['2 tasses de farine'], 'fr-FR');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/parser/ingredients',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Accept-Language': 'fr-FR',
          }),
          body: JSON.stringify({ ingredients: ['2 tasses de farine'] }),
        })
      );
    });

    it('should handle empty ingredient array', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify([])),
      });

      const result = await service.parseIngredients([]);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/parser/ingredients',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ ingredients: [] }),
        })
      );
      expect(result).toEqual([]);
    });

    it('should handle API errors', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: () => Promise.resolve('{"detail":"Invalid ingredients format"}'),
      });

      await expect(service.parseIngredients(['invalid'])).rejects.toThrow(MealieError);
    });

    it('should handle network errors', async () => {
      fetchMock.mockRejectedValue(new TypeError('Network error'));

      await expect(service.parseIngredients(['test'])).rejects.toThrow(MealieError);
    });
  });

  describe('token handling', () => {
    it('should include auth token in requests when set', async () => {
      service.setToken('test-token');
      
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ input: 'test' })),
      });

      await service.parseIngredient('test');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/parser/ingredient',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      );
    });

    it('should not include auth header when token is cleared', async () => {
      service.setToken('test-token');
      service.clearToken();
      
      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ input: 'test' })),
      });

      await service.parseIngredient('test');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/parser/ingredient',
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'Authorization': expect.any(String),
          }),
        })
      );
    });
  });
});
