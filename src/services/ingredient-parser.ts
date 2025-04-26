import { MealieClient } from '../client.js';
import type { ParsedIngredient, IngredientRequest, IngredientsRequest } from '../types/index.js';

/**
 * Service for parsing ingredient strings into structured data
 * 
 * The ingredient parser uses NLP to extract quantities, units, foods, and notes from natural language ingredient descriptions.
 * This is useful for recipe import, data normalization, and shopping list generation.
 * 
 * @extends MealieClient
 */
export class IngredientParserService extends MealieClient {
  /**
   * Parse a single ingredient string
   * 
   * @param ingredient - The ingredient string to parse (e.g., "2 cups all-purpose flour")
   * @param acceptLanguage - Optional language header for localization
   * @returns Parsed ingredient components
   * 
   * @example
   * ```ts
   * const result = await parser.parseIngredient("2 cups all-purpose flour");
   * console.log(result.quantity); // 2
   * console.log(result.unit); // "cups"
   * console.log(result.food); // "all-purpose flour"
   * ```
   */
  async parseIngredient(ingredient: string, acceptLanguage?: string): Promise<ParsedIngredient> {
    const headers: Record<string, string> = {};
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    const body: IngredientRequest = { ingredient };

    return this.request<ParsedIngredient>('/api/parser/ingredient', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  }

  /**
   * Parse multiple ingredient strings in bulk
   * 
   * @param ingredients - Array of ingredient strings to parse
   * @param acceptLanguage - Optional language header for localization
   * @returns Array of parsed ingredient components
   * 
   * @example
   * ```ts
   * const results = await parser.parseIngredients([
   *   "2 cups all-purpose flour",
   *   "1 tsp vanilla extract",
   *   "3 large eggs, room temperature"
   * ]);
   * results.forEach(result => {
   *   console.log(`${result.quantity} ${result.unit} ${result.food}`);
   * });
   * ```
   */
  async parseIngredients(ingredients: string[], acceptLanguage?: string): Promise<ParsedIngredient[]> {
    const headers: Record<string, string> = {};
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    const body: IngredientsRequest = { ingredients };

    return this.request<ParsedIngredient[]>('/api/parser/ingredients', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  }
}
