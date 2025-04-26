# Units Service

The Units Service provides methods for managing ingredient units in the Mealie API.

## Overview

The UnitsService class extends the MealieClient and provides methods for:
- Listing all units with pagination and filtering
- Creating new units
- Merging units
- Retrieving individual units
- Updating units
- Deleting units

## Usage

```typescript
import { UnitsService } from 'node-mealie';

const service = new UnitsService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});
```

## Methods

### getAllUnits(params?: QueryParams): Promise<IngredientUnitPagination>

Retrieves all units with optional filtering and pagination.

**Parameters:**
- `params` (optional): QueryParams object with:
  - `search`: Search term to filter units
  - `orderBy`: Field to order by
  - `orderDirection`: 'asc' or 'desc'
  - `orderByNullPosition`: 'first' or 'last'
  - `page`: Page number
  - `perPage`: Items per page
  - `queryFilter`: Additional query filter
  - `paginationSeed`: Pagination seed value

**Returns:**
- Promise resolving to IngredientUnitPagination object containing:
  - `items`: Array of IngredientUnit objects
  - `page`: Current page number (optional)
  - `perPage`: Items per page (optional)
  - `total`: Total number of items (optional)
  - `totalPages`: Total number of pages (optional)

**Example:**
```typescript
// Get all units
const units = await service.getAllUnits();

// Get units with filtering
const filteredUnits = await service.getAllUnits({
  search: 'cup',
  orderBy: 'name',
  orderDirection: 'asc',
  page: 1,
  perPage: 20
});
```

### createUnit(data: CreateIngredientUnit): Promise<IngredientUnit>

Creates a new ingredient unit.

**Parameters:**
- `data`: CreateIngredientUnit object with:
  - `name`: Name of the unit (required)
  - Additional properties as needed

**Returns:**
- Promise resolving to the created IngredientUnit object

**Example:**
```typescript
const newUnit = await service.createUnit({
  name: 'tablespoon'
});
```

### mergeUnits(data: MergeUnit): Promise<SuccessResponse>

Merges one unit into another.

**Parameters:**
- `data`: MergeUnit object with:
  - `fromUnit`: ID of the unit to merge from
  - `toUnit`: ID of the unit to merge into

**Returns:**
- Promise resolving to SuccessResponse object

**Example:**
```typescript
const result = await service.mergeUnits({
  fromUnit: 'unit-id-1',
  toUnit: 'unit-id-2'
});
```

### getOne(itemId: string): Promise<IngredientUnit>

Retrieves a single unit by its ID.

**Parameters:**
- `itemId`: UUID of the unit

**Returns:**
- Promise resolving to IngredientUnit object

**Example:**
```typescript
const unit = await service.getOne('unit-id');
```

### updateUnit(itemId: string, data: CreateIngredientUnit): Promise<IngredientUnit>

Updates an existing unit.

**Parameters:**
- `itemId`: UUID of the unit to update
- `data`: CreateIngredientUnit object with updated fields

**Returns:**
- Promise resolving to the updated IngredientUnit object

**Example:**
```typescript
const updatedUnit = await service.updateUnit('unit-id', {
  name: 'Updated Unit Name'
});
```

### deleteUnit(itemId: string): Promise<IngredientUnit>

Deletes a unit.

**Parameters:**
- `itemId`: UUID of the unit to delete

**Returns:**
- Promise resolving to the deleted IngredientUnit object

**Example:**
```typescript
const deletedUnit = await service.deleteUnit('unit-id');
```

## Type Definitions

### IngredientUnit
```typescript
interface IngredientUnit {
  id: string;
  name: string;
  [key: string]: any;  // Additional properties
}
```

### CreateIngredientUnit
```typescript
interface CreateIngredientUnit {
  name: string;
  [key: string]: any;  // Additional properties
}
```

### IngredientUnitPagination
```typescript
interface IngredientUnitPagination {
  items: IngredientUnit[];
  page?: number;
  perPage?: number;
  total?: number;
  totalPages?: number;
}
```

### MergeUnit
```typescript
interface MergeUnit {
  fromUnit: string;
  toUnit: string;
}
```

### QueryParams
```typescript
interface QueryParams {
  search?: string;
  orderBy?: string;
  orderDirection?: OrderDirection;
  orderByNullPosition?: OrderByNullPosition;
  queryFilter?: string;
  paginationSeed?: string;
  page?: number;
  perPage?: number;
}
```

## Error Handling

All methods throw errors in the following cases:
- Network connectivity issues
- Authentication errors (401)
- Resource not found (404)
- Validation errors (422)
- Server errors (500)

Errors are instances of the standard Error class with additional properties:
- `message`: Error message
- `statusCode`: HTTP status code (when available)
- `statusText`: HTTP status text (when available)

**Example:**
```typescript
try {
  const unit = await service.getOne('non-existent-id');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Status:', error.statusCode);
}
```

## Authentication

The Units Service requires authentication. Ensure you provide a valid token when initializing the service:

```typescript
const service = new UnitsService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});
```

The service uses OAuth2PasswordBearer security as specified in the API documentation.
