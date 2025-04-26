# Ingredient Parser API

The `IngredientParserService` provides functionality to parse natural language ingredient descriptions into structured data components like quantities, units, foods, and notes. This is particularly useful for recipe import, data normalization, and shopping list generation.

## Overview

The ingredient parser uses Natural Language Processing (NLP) to extract structured data from free-form ingredient strings. It can handle various ingredient formats and supports localization through language headers.

## Features

- Parse single ingredient strings
- Bulk parse multiple ingredients
- Language localization support
- Extract quantities, units, foods, and comments
- High confidence scoring
- Integration with Mealie's existing ingredient database

## Methods

### `parseIngredient(ingredient: string, acceptLanguage?: string): Promise<ParsedIngredient>`

Parses a single ingredient string into structured components.

#### Parameters
- `ingredient` - The ingredient string to parse (e.g., "2 cups all-purpose flour")
- `acceptLanguage` - Optional language header for localization (e.g., "fr-FR", "es-ES")

#### Returns
A `ParsedIngredient` object containing:
- `input` - Original input string
- `confidence` - Confidence score of the parsing
- `quantity` - Parsed numeric quantity
- `quantity2` - Second quantity for ranges (e.g., "1-2 cups")
- `unit` - Unit of measurement
- `food` - Food item or ingredient
- `comment` - Additional notes or preparation instructions
- `ingredient` - Detailed ingredient data if matched with existing database

#### Example
```typescript
const result = await parser.parseIngredient("2 cups all-purpose flour");
console.log(result.quantity); // 2
console.log(result.unit); // "cups"
console.log(result.food); // "all-purpose flour"
```

### `parseIngredients(ingredients: string[], acceptLanguage?: string): Promise<ParsedIngredient[]>`

Parses multiple ingredient strings in a single request.

#### Parameters
- `ingredients` - Array of ingredient strings to parse
- `acceptLanguage` - Optional language header for localization

#### Returns
Array of `ParsedIngredient` objects, one for each input string.

#### Example
```typescript
const results = await parser.parseIngredients([
  "2 cups all-purpose flour",
  "1 tsp vanilla extract",
  "3 large eggs, room temperature"
]);

results.forEach(result => {
  console.log(`${result.quantity} ${result.unit} ${result.food}`);
});
```

## Usage Examples

### Basic Usage

```javascript
import { IngredientParserService } from 'node-mealie';

const parser = new IngredientParserService({
  baseUrl: 'http://localhost:9000',
  apiToken: 'your-api-token'
});

// Parse single ingredient
const result = await parser.parseIngredient("1 cup sugar");
console.log(result);

// Parse multiple ingredients
const ingredients = [
  "2 cups flour",
  "1 tsp baking powder",
  "1/2 tsp salt"
];
const results = await parser.parseIngredients(ingredients);
console.log(results);
```

### With Localization

```javascript
// Parse French ingredients
const frenchResult = await parser.parseIngredient(
  "2 tasses de farine",
  "fr-FR"
);

// Parse Spanish ingredients
const spanishResults = await parser.parseIngredients(
  ["1 taza de azúcar", "2 huevos grandes"],
  "es-ES"
);
```

### Error Handling

```javascript
try {
  const result = await parser.parseIngredient("2 cups flour");
  console.log(result);
} catch (error) {
  if (error.statusCode === 400) {
    console.error("Invalid ingredient format");
  } else if (error.statusCode === 401) {
    console.error("Authentication failed");
  } else {
    console.error("API error:", error.message);
  }
}
```

## Response Format

### ParsedIngredient

```typescript
interface ParsedIngredient {
  input?: string;          // Original input
  confidence?: number;     // Parsing confidence (0-1)
  quantity?: number;       // Numeric quantity
  quantity2?: number;      // Second quantity for ranges
  unit?: string;          // Unit of measurement
  food?: string;          // Food item
  comment?: string;       // Additional notes
  original?: string;      // Original text
  
  // Detailed ingredient data if matched
  ingredient?: {
    id?: string;
    quantity?: number;
    unit?: {
      id?: string;
      name?: string;
      abbreviation?: string;
      // ... other unit properties
    };
    food?: {
      id?: string;
      name?: string;
      // ... other food properties
    };
    note?: string;
    // ... other ingredient properties
  };
}
```

## Best Practices

1. **Batch Processing**: Use `parseIngredients()` for multiple items to reduce API calls
2. **Language Headers**: Always include Accept-Language header for localized content
3. **Error Handling**: Implement proper error handling for network and API errors
4. **Confidence Scores**: Check confidence scores to validate parsing accuracy
5. **Caching**: Consider caching results for frequently parsed ingredients

## Performance Considerations

- The bulk parsing endpoint is more efficient for multiple ingredients
- Language-specific parsing may have slightly longer processing times
- Complex ingredient strings with multiple components take longer to parse

## Compatibility

- Requires Mealie API version 1.0.0+
- Authentication required (API token or user credentials)
- Supports all standard Mealie authentication methods
