# Foods API

The `FoodsService` provides methods to interact with the Mealie foods API, allowing you to manage food items in your Mealie instance.

## Overview

The Foods API enables you to:
- List all foods with filtering and pagination
- Create new food items
- Retrieve individual food items
- Update existing food items
- Delete food items
- Merge multiple food items

## Usage

```typescript
import { FoodsService } from 'node-mealie';

// Initialize the service
const client = new FoodsService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});
```

## Methods

### getAllFoods

Retrieves a paginated list of foods with optional filtering and sorting.

```typescript
const foods = await client.getAllFoods({
  search: 'tomato',
  orderBy: 'name',
  orderDirection: 'asc',
  page: 1,
  perPage: 50
});
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | `string` | Search term for filtering foods by name |
| `orderBy` | `string` | Field to order by |
| `orderDirection` | `'asc' \| 'desc'` | Sort direction |
| `orderByNullPosition` | `'first' \| 'last'` | Position of null values in sorting |
| `page` | `number` | Page number for pagination |
| `perPage` | `number` | Number of items per page |

#### Returns

`FoodPagination` object containing:
- `items`: Array of `FoodItem` objects
- `page`: Current page number
- `perPage`: Items per page
- `total`: Total number of items
- `totalPages`: Total number of pages

### createFood

Creates a new food item.

```typescript
const newFood = await client.createFood({
  name: 'Cherry Tomatoes'
});
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `CreateIngredientFood` | Food data with required `name` field |

#### Returns

`FoodItem` object with the created food's details.

### getOne

Retrieves a single food item by ID.

```typescript
const food = await client.getOne('food-123');
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `itemId` | `string` | UUID of the food item |

#### Returns

`FoodItem` object with the food's details.

### updateFood

Updates an existing food item.

```typescript
const updatedFood = await client.updateFood('food-123', {
  name: 'Roma Tomatoes'
});
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `itemId` | `string` | UUID of the food item |
| `data` | `CreateIngredientFood` | Updated food data |

#### Returns

`FoodItem` object with the updated food's details.

### deleteFood

Deletes a food item.

```typescript
const deletedFood = await client.deleteFood('food-123');
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `itemId` | `string` | UUID of the food item |

#### Returns

`FoodItem` object with the deleted food's details.

### mergeFoods

Merges multiple food items into one.

```typescript
const result = await client.mergeFoods({
  fromFood: 'food-123',
  toFood: 'food-456'
});
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `MergeFood` | Object containing `fromFood` and `toFood` UUIDs |

#### Returns

`SuccessResponse` object with a success message.

## Type Definitions

### FoodItem

```typescript
interface FoodItem {
  id: string;
  name: string;
  [key: string]: any;
}
```

### CreateIngredientFood

```typescript
interface CreateIngredientFood {
  name: string;
  [key: string]: any;
}
```

### MergeFood

```typescript
interface MergeFood {
  fromFood: string;
  toFood: string;
}
```

### FoodPagination

```typescript
interface FoodPagination {
  items: FoodItem[];
  page?: number;
  perPage?: number;
  total?: number;
  totalPages?: number;
}
```

## Error Handling

All methods can throw errors in the following scenarios:
- Network issues
- Authentication failures (401)
- Resource not found (404)
- Validation errors (422)
- Server errors (500)

```typescript
try {
  const food = await client.getOne('non-existent-id');
} catch (error) {
  if (error instanceof MealieError) {
    console.error(`Error ${error.statusCode}: ${error.message}`);
  }
}
```

## Examples

### Search and Filter Foods

```typescript
// Search for foods containing "tomato"
const tomatoFoods = await client.getAllFoods({
  search: 'tomato',
  orderBy: 'name',
  orderDirection: 'asc',
  page: 1,
  perPage: 10
});

console.log(`Found ${tomatoFoods.total} tomato-related foods`);
tomatoFoods.items.forEach(food => {
  console.log(`- ${food.name}`);
});
```

### Batch Food Management

```typescript
// Create multiple foods
const foods = ['Carrots', 'Potatoes', 'Onions'];
const createdFoods = await Promise.all(
  foods.map(name => client.createFood({ name }))
);

// Update a food
const updatedFood = await client.updateFood(createdFoods[0].id, {
  name: 'Baby Carrots'
});

// Merge duplicate foods
await client.mergeFoods({
  fromFood: createdFoods[1].id,
  toFood: createdFoods[2].id
});
```
