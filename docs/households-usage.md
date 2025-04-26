# Using the Households API

The `HouseholdsService` provides comprehensive functionality for managing household-related features in Mealie. This guide shows how to use the various endpoints available.

## Initialize the Service

```typescript
import { MealieClient, HouseholdsService } from 'node-mealie';

const client = new MealieClient({
  baseUrl: 'https://your-mealie-instance.com',
  username: 'your-username',
  password: 'your-password'
});

const households = new HouseholdsService(client);
```

## Common Operations

### Cookbooks Management

```typescript
// Get all cookbooks
const cookbooks = await households.getCookbooks();

// Create a new cookbook
const cookbook = await households.createCookbook({
  name: 'Vegetarian Recipes',
  description: 'Collection of vegetarian dishes',
  categories: ['vegetarian'],
  public: true
});

// Update cookbook
const updated = await households.updateCookbook(cookbook.id, {
  name: 'Updated Vegetarian Recipes'
});

// Delete cookbook
await households.deleteCookbook(cookbook.id);
```

### Shopping List Management

```typescript
// Create a shopping list
const list = await households.createShoppingList({
  name: 'Weekly Shopping'
});

// Add items to the list
const item = await households.createShoppingListItem({
  shoppingListId: list.id,
  note: 'Milk',
  quantity: 1
});

// Add recipe ingredients to list
await households.addRecipeIngredientsToList(list.id, [
  { recipeId: 'recipe-uuid', recipeIncrementQuantity: 1 }
]);

// Check off items
await households.updateShoppingListItem(item.id, {
  shoppingListId: list.id,
  checked: true
});
```

### Meal Planning

```typescript
// Create a meal plan entry
const mealPlan = await households.createMealplan({
  date: '2025-04-25',
  entryType: 'dinner',
  title: 'Pasta Night',
  recipeId: 'recipe-uuid'
});

// Get today's meals
const todaysMeals = await households.getTodaysMeals();

// Create a random meal plan
const randomMeal = await households.createRandomMeal({
  date: '2025-04-26',
  entryType: 'lunch'
});

// Set up meal planning rules
const rule = await households.createMealplanRule({
  day: 'monday',
  entryType: 'dinner',
  categories: ['italian']
});
```

### Household Management

```typescript
// Get current household info
const myHousehold = await households.getSelf();

// Update preferences
const preferences = await households.updateHouseholdPreferences({
  privateHousehold: false,
  recipePublic: true,
  recipeShowNutrition: true
});

// Set member permissions
await households.setMemberPermissions({
  userId: 'user-uuid',
  canManage: true,
  canInvite: true
});

// Get statistics
const stats = await households.getStatistics();
```

### Invitations and Members

```typescript
// Create an invite token
const token = await households.createInviteToken({
  uses: 5
});

// Send email invitation
await households.emailInvitation({
  email: 'newuser@example.com',
  token: token.token
});

// Get household members
const members = await households.getHouseholdMembers();
```

### Webhooks and Notifications

```typescript
// Create a webhook
const webhook = await households.createWebhook({
  scheduledTime: '09:00',
  name: 'Daily Meal Plan',
  url: 'https://your-service.com/webhook',
  webhookType: 'mealplan',
  enabled: true
});

// Test webhook
await households.testWebhook(webhook.id);

// Create an event notification
const notification = await households.createEventNotification({
  name: 'Recipe Updates',
  appriseUrl: 'apprise://your-service'
});
```

## Error Handling

```typescript
import { MealieError } from 'node-mealie';

try {
  const cookbook = await households.getCookbook('invalid-id');
} catch (error) {
  if (error instanceof MealieError) {
    console.error(`Error: ${error.message}`);
    console.error(`Status: ${error.statusCode}`);
  }
}
```

## Pagination and Filtering

Many endpoints support pagination and filtering:

```typescript
const results = await households.getShoppingLists({
  page: 2,
  perPage: 20,
  orderBy: 'name',
  orderDirection: 'asc',
  queryFilter: 'weekly'
});

// For mealplans, you can also filter by date
const mealplans = await households.getMealplans({
  start_date: '2025-04-01',
  end_date: '2025-04-30'
});
```

## Type Safety

All methods are fully typed. TypeScript users will get full IntelliSense support:

```typescript
import type { 
  CreateCookBook,
  ShoppingListCreate,
  ReadPlanEntry 
} from 'node-mealie';

const createCookbook = async (data: CreateCookBook) => {
  return await households.createCookbook(data);
};

const getTodaysPlans = async (): Promise<ReadPlanEntry[]> => {
  return await households.getTodaysMeals();
};
```
