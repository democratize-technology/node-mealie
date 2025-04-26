# Explore Service

The Explore Service provides public access methods for exploring recipes, foods, households, and other resources within Mealie groups.

## Overview

The ExploreService class extends the MealieClient and provides methods for:
- Exploring foods within a group
- Browsing households
- Discovering categories, tags, and tools
- Accessing cookbooks
- Finding recipes with filters
- Getting recipe suggestions based on available ingredients and tools

## Usage

```typescript
import { ExploreService } from 'node-mealie';

const service = new ExploreService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token' // Optional - explore endpoints may be public
});
```

## Methods

### Foods

#### getFoods(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreFoodsPagination>

Retrieves all foods for a specific group with optional filtering and pagination.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `params` (optional): ExploreQueryParams object with:
  - `search`: Search term to filter foods
  - `orderBy`: Field to order by
  - `orderDirection`: 'asc' or 'desc'
  - `orderByNullPosition`: 'first' or 'last'
  - `queryFilter`: Additional query filter
  - `paginationSeed`: Pagination seed value
  - `page`: Page number
  - `perPage`: Items per page
  - `acceptLanguage`: Language preference for content

**Returns:**
- Promise resolving to ExploreFoodsPagination object containing:
  - `items`: Array of ExploreFoodItem objects
  - `page`: Current page number
  - `per_page`: Items per page
  - `total`: Total number of items
  - `total_pages`: Total number of pages

**Example:**
```typescript
// Get all foods in a group
const foods = await service.getFoods('home-cooking');

// Get foods with filtering
const filteredFoods = await service.getFoods('home-cooking', {
  search: 'tomato',
  orderBy: 'name',
  orderDirection: 'asc',
  page: 1,
  perPage: 20,
  acceptLanguage: 'fr-FR'
});
```

#### getFood(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreFoodItem>

Retrieves a specific food by ID.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `itemId`: UUID of the food
- `acceptLanguage` (optional): Language preference for content

**Returns:**
- Promise resolving to ExploreFoodItem object

**Example:**
```typescript
const food = await service.getFood('home-cooking', 'food-uuid', 'en-US');
```

### Households

#### getHouseholds(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreHouseholdsPagination>

Retrieves all households for a specific group.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `params` (optional): ExploreQueryParams object

**Returns:**
- Promise resolving to ExploreHouseholdsPagination object

**Example:**
```typescript
const households = await service.getHouseholds('home-cooking');
```

#### getHousehold(groupSlug: string, householdSlug: string, acceptLanguage?: string): Promise<ExploreHouseholdSummary>

Retrieves a specific household by slug.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `householdSlug`: Slug of the household
- `acceptLanguage` (optional): Language preference for content

**Returns:**
- Promise resolving to ExploreHouseholdSummary object

**Example:**
```typescript
const household = await service.getHousehold('home-cooking', 'smith-family');
```

### Categories

#### getCategories(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreCategoriesPagination>

Retrieves all categories for a specific group.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `params` (optional): ExploreQueryParams object

**Returns:**
- Promise resolving to ExploreCategoriesPagination object

**Example:**
```typescript
const categories = await service.getCategories('home-cooking');
```

#### getCategory(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreCategoryOut>

Retrieves a specific category by ID.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `itemId`: UUID of the category
- `acceptLanguage` (optional): Language preference for content

**Returns:**
- Promise resolving to ExploreCategoryOut object

**Example:**
```typescript
const category = await service.getCategory('home-cooking', 'category-uuid');
```

### Tags

#### getTags(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreTagsPagination>

Retrieves all tags for a specific group.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `params` (optional): ExploreQueryParams object

**Returns:**
- Promise resolving to ExploreTagsPagination object

**Example:**
```typescript
const tags = await service.getTags('home-cooking');
```

#### getTag(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreTagOut>

Retrieves a specific tag by ID.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `itemId`: UUID of the tag
- `acceptLanguage` (optional): Language preference for content

**Returns:**
- Promise resolving to ExploreTagOut object

**Example:**
```typescript
const tag = await service.getTag('home-cooking', 'tag-uuid');
```

### Tools

#### getTools(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreToolsPagination>

Retrieves all tools for a specific group.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `params` (optional): ExploreQueryParams object

**Returns:**
- Promise resolving to ExploreToolsPagination object

**Example:**
```typescript
const tools = await service.getTools('home-cooking');
```

#### getTool(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreRecipeToolOut>

Retrieves a specific tool by ID.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `itemId`: UUID of the tool
- `acceptLanguage` (optional): Language preference for content

**Returns:**
- Promise resolving to ExploreRecipeToolOut object

**Example:**
```typescript
const tool = await service.getTool('home-cooking', 'tool-uuid');
```

### Cookbooks

#### getCookbooks(groupSlug: string, params?: ExploreQueryParams): Promise<ExploreCookbooksPagination>

Retrieves all cookbooks for a specific group.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `params` (optional): ExploreQueryParams object

**Returns:**
- Promise resolving to ExploreCookbooksPagination object

**Example:**
```typescript
const cookbooks = await service.getCookbooks('home-cooking');
```

#### getCookbook(groupSlug: string, itemId: string, acceptLanguage?: string): Promise<ExploreRecipeCookBook>

Retrieves a specific cookbook by ID or slug.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `itemId`: UUID or slug of the cookbook
- `acceptLanguage` (optional): Language preference for content

**Returns:**
- Promise resolving to ExploreRecipeCookBook object

**Example:**
```typescript
const cookbook = await service.getCookbook('home-cooking', 'cookbook-uuid');
```

### Recipes

#### getRecipes(groupSlug: string, params?: ExploreRecipesParams): Promise<ExploreRecipesPagination>

Retrieves recipes with complex filtering options.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `params` (optional): ExploreRecipesParams object with:
  - All standard ExploreQueryParams fields, plus:
  - `categories`: Array of category IDs/slugs to filter by
  - `tags`: Array of tag IDs/slugs to filter by
  - `tools`: Array of tool IDs/slugs to filter by
  - `foods`: Array of food IDs/slugs to filter by
  - `households`: Array of household IDs/slugs to filter by
  - `cookbook`: Cookbook ID/slug to filter by
  - `requireAllCategories`: Boolean to require all specified categories
  - `requireAllTags`: Boolean to require all specified tags
  - `requireAllTools`: Boolean to require all specified tools
  - `requireAllFoods`: Boolean to require all specified foods

**Returns:**
- Promise resolving to ExploreRecipesPagination object

**Example:**
```typescript
// Get recipes with multiple filters
const recipes = await service.getRecipes('home-cooking', {
  categories: ['desserts', 'quick-meals'],
  tags: ['vegetarian', 'under-30-min'],
  tools: ['blender'],
  foods: ['tomatoes', 'basil'],
  requireAllTags: true,
  search: 'pasta',
  page: 1,
  perPage: 20
});
```

#### getRecipeSuggestions(groupSlug: string, params?: RecipeSuggestionsParams): Promise<ExploreRecipeSuggestionResponse>

Gets recipe suggestions based on available foods and tools.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `params` (optional): RecipeSuggestionsParams object with:
  - `foods`: Array of available food IDs
  - `tools`: Array of available tool IDs
  - `limit`: Maximum number of suggestions
  - `maxMissingFoods`: Maximum allowed missing foods
  - `maxMissingTools`: Maximum allowed missing tools
  - `includeFoodsOnHand`: Include user's foods on hand
  - `includeToolsOnHand`: Include user's tools on hand
  - Plus standard query parameters

**Returns:**
- Promise resolving to ExploreRecipeSuggestionResponse object containing:
  - `items`: Array of suggestion items, each with:
    - `recipe`: The suggested recipe
    - `missingFoods`: Foods needed for the recipe
    - `missingTools`: Tools needed for the recipe

**Example:**
```typescript
const suggestions = await service.getRecipeSuggestions('home-cooking', {
  foods: ['tomatoes', 'basil', 'garlic'],
  tools: ['pot', 'knife'],
  limit: 5,
  maxMissingFoods: 3,
  maxMissingTools: 1
});
```

#### getRecipe(groupSlug: string, recipeSlug: string, acceptLanguage?: string): Promise<RecipeDetails>

Retrieves a specific recipe by slug.

**Parameters:**
- `groupSlug`: The slug identifier for the group
- `recipeSlug`: Slug of the recipe
- `acceptLanguage` (optional): Language preference for content

**Returns:**
- Promise resolving to RecipeDetails object

**Example:**
```typescript
const recipe = await service.getRecipe('home-cooking', 'pasta-carbonara');
```

## Type Definitions

### Core Types

```typescript
interface ExploreQueryParams {
  search?: string;
  orderBy?: string;
  orderByNullPosition?: OrderByNullPosition;
  orderDirection?: OrderDirection;
  queryFilter?: string;
  paginationSeed?: string;
  page?: number;
  perPage?: number;
  acceptLanguage?: string;
}
```

### Recipe Types

```typescript
interface ExploreRecipesParams extends ExploreQueryParams {
  categories?: string[];
  tags?: string[];
  tools?: string[];
  foods?: string[];
  households?: string[];
  cookbook?: string;
  requireAllCategories?: boolean;
  requireAllTags?: boolean;
  requireAllTools?: boolean;
  requireAllFoods?: boolean;
}

interface RecipeSuggestionsParams {
  foods?: string[];
  tools?: string[];
  limit?: number;
  maxMissingFoods?: number;
  maxMissingTools?: number;
  includeFoodsOnHand?: boolean;
  includeToolsOnHand?: boolean;
  // Plus standard query parameters
}
```

### Response Types

```typescript
interface ExploreFoodItem {
  id: string;
  name: string;
  // Additional properties
}

interface ExploreHouseholdSummary {
  groupId: string;
  name: string;
  id: string;
  slug: string;
}

interface ExploreRecipeCategory {
  name: string;
  slug: string;
  id?: string;
  groupId?: string;
}

interface ExploreRecipeSuggestionResponseItem {
  recipe: ExploreRecipeSummary;
  missingFoods: ExploreFoodItem[];
  missingTools: ExploreRecipeTool[];
}
```

## Error Handling

All methods throw errors in the following cases:
- Network connectivity issues
- Authentication errors (401)
- Resource not found (404)
- Validation errors (422)
- Server errors (500)

**Example:**
```typescript
try {
  const recipe = await service.getRecipe('group-slug', 'non-existent-recipe');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Status:', error.statusCode);
}
```

## Language Support

The Explore Service supports internationalization through the `acceptLanguage` parameter. Pass the appropriate language code to get content in your preferred language:

```typescript
// Get content in French
const recipe = await service.getRecipe('home-cooking', 'recipe-slug', 'fr-FR');

// Get content in Spanish
const foods = await service.getFoods('home-cooking', {
  acceptLanguage: 'es-ES'
});
```

## Authentication

While many explore endpoints may be public, some might require authentication based on your Mealie instance configuration. Always provide an authentication token when needed:

```typescript
const service = new ExploreService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});
```
