# Shared Recipe API

The SharedService provides methods to manage recipe sharing tokens in Mealie. These tokens allow you to share recipes with others via a special URL.

## Overview

The SharedService supports the following operations:
- Create share tokens for recipes
- Retrieve all share tokens
- Get a specific share token
- Delete share tokens

## Usage

```typescript
import { SharedService } from 'node-mealie';

const sharedService = new SharedService('http://localhost:9000', {
  authToken: 'your-auth-token'
});
```

## API Methods

### Create Shared Recipe Token

Creates a new sharing token for a recipe.

```typescript
const token = await sharedService.createSharedRecipe({
  recipeId: 'recipe-id-123'
});
```

#### Parameters
- `recipeId`: The ID of the recipe to share

#### Returns
- `RecipeShareToken`: The created share token

### Get All Shared Recipes

Retrieves all share tokens, optionally filtered by recipe ID.

```typescript
// Get all share tokens
const allTokens = await sharedService.getAllSharedRecipes();

// Get tokens for a specific recipe
const recipeTokens = await sharedService.getAllSharedRecipes({
  recipeId: 'recipe-id-123'
});
```

#### Parameters
- `params?`: Optional query parameters
  - `recipeId?`: Filter by recipe ID

#### Returns
- `RecipeShareTokenSummary[]`: Array of share token summaries

### Get Shared Recipe

Retrieves a specific share token by ID.

```typescript
const token = await sharedService.getSharedRecipe('token-id-123');
```

#### Parameters
- `itemId`: The ID of the share token

#### Returns
- `RecipeShareToken`: The share token with full recipe data

### Delete Shared Recipe

Deletes a share token, revoking access to the shared recipe.

```typescript
await sharedService.deleteSharedRecipe('token-id-123');
```

#### Parameters
- `itemId`: The ID of the share token to delete

#### Returns
- `void`

## Types

### RecipeShareToken

```typescript
interface RecipeShareToken {
  recipeId: string;
  groupId: string;
  id: string;
  createdAt: string;
  recipe: RecipeOutput;
}
```

### RecipeShareTokenSummary

```typescript
interface RecipeShareTokenSummary {
  recipeId: string;
  groupId: string;
  id: string;
  createdAt: string;
}
```

### RecipeShareTokenCreate

```typescript
interface RecipeShareTokenCreate {
  recipeId: string;
}
```

### RecipeShareTokenQueryParams

```typescript
interface RecipeShareTokenQueryParams {
  recipeId?: string;
}
```

## Examples

### Creating a Shareable Link

```typescript
async function createShareableLink(recipeId: string): Promise<string> {
  const token = await sharedService.createSharedRecipe({ recipeId });
  return `https://your-mealie-instance.com/shared/recipes/${token.id}`;
}
```

### Revoking All Share Tokens for a Recipe

```typescript
async function revokeAllTokens(recipeId: string): Promise<void> {
  const tokens = await sharedService.getAllSharedRecipes({ recipeId });
  
  await Promise.all(
    tokens.map(token => sharedService.deleteSharedRecipe(token.id))
  );
  
  console.log(`Revoked ${tokens.length} tokens for recipe ${recipeId}`);
}
```

### Checking if a Recipe is Shared

```typescript
async function isRecipeShared(recipeId: string): Promise<boolean> {
  const tokens = await sharedService.getAllSharedRecipes({ recipeId });
  return tokens.length > 0;
}
```

### Managing Share Token Expiration

Although the API doesn't natively support expiration, you can implement it yourself:

```typescript
async function cleanupExpiredTokens(maxAgeDays: number = 30): Promise<void> {
  const allTokens = await sharedService.getAllSharedRecipes();
  const now = new Date();
  
  for (const token of allTokens) {
    const createdAt = new Date(token.createdAt);
    const ageInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    
    if (ageInDays > maxAgeDays) {
      await sharedService.deleteSharedRecipe(token.id);
      console.log(`Deleted expired token ${token.id}`);
    }
  }
}
```

## Best Practices

1. **Token Management**: Regularly clean up unused or old share tokens to maintain security.
2. **Access Control**: Consider implementing your own access control logic on top of share tokens.
3. **Error Handling**: Always handle potential errors when working with share tokens.
4. **Token Tracking**: Keep track of created tokens to manage them effectively.

## Common Use Cases

- Creating temporary share links for recipes
- Sharing recipes with non-registered users
- Creating public recipe pages
- Enabling recipe sharing on social media
- Building recipe collection sharing features
