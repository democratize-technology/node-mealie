# node-mealie

A Node.js wrapper for the Mealie API with TypeScript support, Deno compatibility, and ESM module support.

## Features

- 🚀 TypeScript support
- 📦 ESM and CommonJS compatible
- 🦕 Deno compatible
- 🔒 Authentication handling (Username/Password, OAuth/OIDC)
- 🧪 100% test coverage
- 🛠️ Extensible architecture

## Installation

```bash
npm install node-mealie
```

## Usage

### Basic Usage

```typescript
import { AboutService } from 'node-mealie';

const client = new AboutService({
  baseUrl: 'https://demo.mealie.io', // optional, defaults to demo instance
});

// Get app info
const appInfo = await client.getAppInfo();
console.log(appInfo.version);

// Get startup info
const startupInfo = await client.getStartupInfo();
console.log(startupInfo.isDemo);

// Get app theme
const theme = await client.getAppTheme();
console.log(theme);
```

### Groups Management

```typescript
import { MealieClient, GroupsService } from 'node-mealie';

const client = new MealieClient({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});

const groups = new GroupsService(client);

// Get current group
const currentGroup = await groups.getSelf();

// Get all households
const households = await groups.getAllHouseholds({
  page: 1,
  perPage: 10,
  orderBy: 'name',
  orderDirection: 'asc'
});

// Get group members
const members = await groups.getGroupMembers();

// Check storage usage
const storage = await groups.getStorage();
console.log(`Using ${storage.usedStorageStr} of ${storage.totalStorageStr}`);

// Manage labels
const label = await groups.createLabel({ name: 'Vegetarian' });
const labels = await groups.getAllLabels({ search: 'veg' });

// Start data migration
const migrationFile = new File(['...data...'], 'migration.zip');
const report = await groups.startDataMigration({
  migration_type: 'chowdown',
  archive: migrationFile
});
```

### Households Management

```typescript
import { MealieClient, HouseholdsService } from 'node-mealie';

const client = new MealieClient({
  baseUrl: 'https://your-mealie-instance.com',
  username: 'your-username',
  password: 'your-password'
});

const households = new HouseholdsService(client);

// Create a cookbook
const cookbook = await households.createCookbook({
  name: 'Italian Recipes',
  description: 'A collection of Italian dishes',
  public: true
});

// Create a shopping list
const shoppingList = await households.createShoppingList({
  name: 'Weekly Groceries'
});

// Add items to shopping list
const item = await households.createShoppingListItem({
  shoppingListId: shoppingList.id,
  note: 'Milk',
  quantity: 1
});

// Create a meal plan
const mealPlan = await households.createMealplan({
  date: '2025-04-25',
  entryType: 'dinner',
  title: 'Pasta Night'
});

// Get household statistics
const stats = await households.getStatistics();
console.log(`Total recipes: ${stats.totalRecipes}`);
```

### Authentication

```typescript
import { AuthService } from 'node-mealie';

const auth = new AuthService({
  baseUrl: 'https://your-mealie-instance.com'
});

// Standard login
const token = await auth.login('username', 'password');

// OAuth/OIDC login
const { redirectUrl } = await auth.oauthLogin();
// Redirect user to OAuth provider...

// Handle OAuth callback
const callbackToken = await auth.oauthCallback({ code: 'auth-code' });

// Refresh token
const newToken = await auth.refreshToken();

// Logout
await auth.logout();
```

### With Existing Token

```typescript
import { AboutService } from 'node-mealie';

// Use existing token
const client = new AboutService();
client.setToken('your-auth-token');
```

### Deno Usage

```typescript
import { AboutService } from "https://deno.land/x/node_mealie/mod.ts";

const client = new AboutService();
const appInfo = await client.getAppInfo();
console.log(appInfo.version);
```

## API Reference

### AboutService

- `getAppInfo()`: Get general application information
- `getStartupInfo()`: Get startup information
- `getAppTheme()`: Get current theme settings

### AuthService

- `login(username: string, password: string)`: Authenticate with credentials
- `oauthLogin()`: Initiate OAuth login flow
- `oauthCallback(params: OAuthCallbackParams)`: Handle OAuth callback
- `refreshToken()`: Refresh authentication token
- `logout()`: Log out the current user
- `setToken(token: string)`: Set authentication token manually
- `clearToken()`: Clear authentication token

### HouseholdsService

The `HouseholdsService` provides comprehensive functionality for managing household-related features:

#### Cookbooks
- `getCookbooks(params?)`: Get all cookbooks
- `createCookbook(data)`: Create a new cookbook
- `updateCookbook(id, data)`: Update a cookbook
- `deleteCookbook(id)`: Delete a cookbook

#### Shopping Lists
- `getShoppingLists(params?)`: Get all shopping lists
- `createShoppingList(data)`: Create a new shopping list
- `createShoppingListItem(data)`: Add item to a list
- `updateShoppingListItem(id, data)`: Update an item
- `addRecipeIngredientsToList(id, data)`: Add recipe ingredients to list

#### Meal Plans
- `getMealplans(params?)`: Get meal plans
- `createMealplan(data)`: Create a meal plan
- `getTodaysMeals()`: Get today's meal plans
- `createRandomMeal(data)`: Create a random meal plan
- `createMealplanRule(data)`: Create meal plan rules

#### Household Management
- `getSelf()`: Get current household information
- `getHouseholdPreferences()`: Get household preferences
- `updateHouseholdPreferences(data)`: Update preferences
- `setMemberPermissions(data)`: Set member permissions
- `getStatistics()`: Get household statistics

#### Invitations
- `getInviteTokens()`: Get all invite tokens
- `createInviteToken(data)`: Create new invite token
- `emailInvitation(data)`: Send email invitation

[Full API documentation](docs/households-usage.md)

### GroupsService

The `GroupsService` provides functionality for managing groups, households, migrations, reports, and more:

#### Group Information
- `getSelf()`: Get current group information
- `getGroupMembers(params?)`: Get members in the group
- `getGroupMember(usernameOrId)`: Get specific member details
- `getGroupPreferences()`: Get group preferences
- `updateGroupPreferences(data)`: Update group preferences
- `getStorage()`: Get storage usage information

#### Households
- `getAllHouseholds(params?)`: Get all households within a group
- `getOneHousehold(householdSlug)`: Get specific household details

#### Migrations
- `startDataMigration(params)`: Import data from other platforms (Nextcloud, Chowdown, etc.)

#### Reports
- `getAllReports(reportType?)`: Get all reports or filter by type
- `getOneReport(itemId)`: Get specific report details
- `deleteOneReport(itemId)`: Delete a report

#### Multi-Purpose Labels
- `createLabel(data)`: Create a new label
- `getAllLabels(params?)`: Get all labels with optional search
- `getOneLabel(itemId)`: Get specific label
- `updateLabel(itemId, data)`: Update a label
- `deleteLabel(itemId)`: Delete a label

#### Seeders
- `seedFoods(config)`: Initialize food data
- `seedLabels(config)`: Initialize label data
- `seedUnits(config)`: Initialize unit data

[Full Groups API documentation](docs/api/groups.md)

### OrganizerService

The `OrganizerService` provides functionality for managing recipe organization features including categories, tags, and tools:

#### Categories
- `getAllCategories(params?)`: Get all categories with optional pagination and filtering
- `createCategory(data)`: Create a new category
- `getAllEmptyCategories()`: Get all categories without recipes
- `getCategoryById(id)`: Get specific category by ID
- `updateCategory(id, data)`: Update a category
- `deleteCategory(id)`: Delete a category
- `getCategoryBySlug(slug)`: Get category by slug

#### Tags
- `getAllTags(params?)`: Get all tags with optional pagination and filtering
- `createTag(data)`: Create a new tag
- `getEmptyTags()`: Get all tags without recipes
- `getTagById(id)`: Get specific tag by ID
- `updateTag(id, data)`: Update a tag
- `deleteTag(id)`: Delete a tag
- `getTagBySlug(slug)`: Get tag by slug

#### Tools
- `getAllTools(params?)`: Get all tools with optional pagination and filtering
- `createTool(data)`: Create a new tool
- `getToolById(id)`: Get specific tool by ID
- `updateTool(id, data)`: Update a tool
- `deleteTool(id)`: Delete a tool
- `getToolBySlug(slug)`: Get tool by slug

```typescript
import { OrganizerService } from 'node-mealie';

const organizers = new OrganizerService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});

// Work with categories
const categories = await organizers.getAllCategories({ search: 'breakfast' });
const newCategory = await organizers.createCategory({ name: 'Desserts' });

// Work with tags
const tags = await organizers.getAllTags({ orderBy: 'name' });
const newTag = await organizers.createTag({ name: 'Vegetarian' });

// Work with tools
const tools = await organizers.getAllTools({ page: 1, perPage: 10 });
const newTool = await organizers.createTool({ name: 'Food Processor' });
```

[Full Organizers API documentation](examples/organizers-example.ts)

### CommentsService

The `CommentsService` provides functionality for managing recipe comments, including CRUD operations and filtering:

#### Comment Operations
- `getAllComments(params?)`: Get all comments with optional filtering and pagination
- `createComment(data)`: Create a new comment for a recipe
- `getComment(commentId)`: Get specific comment by ID
- `updateComment(commentId, data)`: Update an existing comment
- `deleteComment(commentId)`: Delete a comment

```typescript
import { CommentsService } from 'node-mealie';

const comments = new CommentsService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});

// Get all comments with filtering
const allComments = await comments.getAllComments({
  page: 1,
  perPage: 20,
  orderBy: 'createdAt',
  orderDirection: 'desc',
  queryFilter: 'delicious'
});

// Create a new comment
const newComment = await comments.createComment({
  recipeId: 'recipe-uuid',
  text: 'This recipe is amazing!'
});

// Update a comment
const updatedComment = await comments.updateComment(newComment.id, {
  id: newComment.id,
  text: 'Updated: This recipe is even better with extra cheese!'
});

// Delete a comment
await comments.deleteComment(newComment.id);
```

[Full Comments API documentation](docs/api/comments.md)

### IngredientParserService

The `IngredientParserService` provides functionality for parsing natural language ingredient descriptions into structured data components:

#### Parser Operations
- `parseIngredient(ingredient, acceptLanguage?)`: Parse a single ingredient string
- `parseIngredients(ingredients, acceptLanguage?)`: Parse multiple ingredient strings in bulk

```typescript
import { IngredientParserService } from 'node-mealie';

const parser = new IngredientParserService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});

// Parse a single ingredient
const result = await parser.parseIngredient('2 cups all-purpose flour');
console.log(result.quantity); // 2
console.log(result.unit); // "cups"
console.log(result.food); // "all-purpose flour"

// Parse multiple ingredients
const results = await parser.parseIngredients([
  '2 cups all-purpose flour',
  '1 tsp vanilla extract',
  '3 large eggs, room temperature'
]);

// Parse with localization
const frenchResult = await parser.parseIngredient('2 tasses de farine', 'fr-FR');
```

[Full Ingredient Parser API documentation](docs/api/ingredient-parser.md)

### FoodsService

The `FoodsService` provides functionality for managing food items, including CRUD operations, merging, and filtering:

#### Food Operations
- `getAllFoods(params?)`: Get all foods with optional filtering and pagination
- `createFood(data)`: Create a new food item
- `getOne(itemId)`: Get specific food by ID
- `updateFood(itemId, data)`: Update an existing food item
- `deleteFood(itemId)`: Delete a food item
- `mergeFoods(data)`: Merge two food items into one

```typescript
import { FoodsService } from 'node-mealie';

const foods = new FoodsService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});

// Get all foods with filtering
const allFoods = await foods.getAllFoods({
  search: 'tomato',
  orderBy: 'name',
  orderDirection: 'asc',
  page: 1,
  perPage: 50
});

// Create a new food
const newFood = await foods.createFood({ name: 'Cherry Tomatoes' });

// Update a food
const updatedFood = await foods.updateFood(newFood.id, {
  name: 'Roma Tomatoes'
});

// Merge foods
await foods.mergeFoods({
  fromFood: 'food-123',
  toFood: 'food-456'
});

// Delete a food
await foods.deleteFood(newFood.id);
```

[Full Foods API documentation](docs/api/foods.md)

### AdminService

The `AdminService` provides functionality for system administration tasks, requiring administrator privileges:

#### Application Management
- `getAppInfo(acceptLanguage?)`: Get detailed application information
- `getAppStatistics(acceptLanguage?)`: Get usage statistics
- `checkAppConfig(acceptLanguage?)`: Check configuration status

#### User Management
- `getAllUsers(options?)`: Get paginated list of users
- `createUser(data, acceptLanguage?)`: Create new user account
- `getUser(userId, acceptLanguage?)`: Get specific user details
- `updateUser(userId, data, acceptLanguage?)`: Update user
- `deleteUser(userId, acceptLanguage?)`: Delete user
- `unlockUsers(force?, acceptLanguage?)`: Unlock user accounts
- `generatePasswordResetToken(data, acceptLanguage?)`: Generate password reset

#### Household Management
- `getAllHouseholds(options?)`: Get paginated list of households
- `createHousehold(data, acceptLanguage?)`: Create new household
- `getHousehold(householdId, acceptLanguage?)`: Get specific household
- `updateHousehold(householdId, data, acceptLanguage?)`: Update household
- `deleteHousehold(householdId, acceptLanguage?)`: Delete household

#### Group Management
- `getAllGroups(options?)`: Get paginated list of groups
- `createGroup(data, acceptLanguage?)`: Create new group
- `getGroup(groupId, acceptLanguage?)`: Get specific group
- `updateGroup(groupId, data, acceptLanguage?)`: Update group
- `deleteGroup(groupId, acceptLanguage?)`: Delete group

#### Backup Management
- `getAllBackups(acceptLanguage?)`: List all backups
- `createBackup(acceptLanguage?)`: Create system backup
- `getBackupToken(fileName, acceptLanguage?)`: Get backup download token
- `deleteBackup(fileName, acceptLanguage?)`: Delete backup
- `uploadBackup(file, acceptLanguage?)`: Upload backup file
- `restoreBackup(fileName, acceptLanguage?)`: Restore from backup

#### System Maintenance
- `getMaintenanceSummary(acceptLanguage?)`: Get maintenance summary
- `getStorageDetails(acceptLanguage?)`: Get storage details
- `cleanImages(acceptLanguage?)`: Clean unused images
- `cleanTemp(acceptLanguage?)`: Clean temporary files
- `cleanRecipeFolders(acceptLanguage?)`: Clean recipe folders

#### Email & Debug
- `checkEmailConfig(acceptLanguage?)`: Check email configuration
- `sendTestEmail(data, acceptLanguage?)`: Send test email
- `debugOpenAI(file?, acceptLanguage?)`: Debug OpenAI integration

```typescript
import { AdminService } from 'node-mealie';

const admin = new AdminService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-admin-token'
});

// Get application statistics
const stats = await admin.getAppStatistics();
console.log(`Total recipes: ${stats.totalRecipes}`);

// User management
const users = await admin.getAllUsers({ page: 1, perPage: 10 });
const newUser = await admin.createUser({
  username: 'newuser',
  fullName: 'New User',
  email: 'user@example.com',
  password: 'password123'
});

// Create backup
const backup = await admin.createBackup();
console.log('Backup created:', backup.message);
```

[Full Admin API documentation](docs/api/admin.md)

### UtilsService

The `UtilsService` provides utility functions for file downloads and other utility operations within Mealie:

#### File Downloads
- `downloadFile(params?)`: Download a file from the server, optionally with a specific token

```typescript
import { UtilsService } from 'node-mealie';

const utils = new UtilsService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});

// Download a file
const fileBlob = await utils.downloadFile();

// Download with a specific token
const fileBlob = await utils.downloadFile({ token: 'special-token' });

// Save in browser
const url = URL.createObjectURL(fileBlob);
const link = document.createElement('a');
link.href = url;
link.download = 'downloaded-file';
link.click();
URL.revokeObjectURL(url);

// Save in Node.js
import { writeFile } from 'fs/promises';
const buffer = await fileBlob.arrayBuffer();
await writeFile('downloaded-file', Buffer.from(buffer));
```

[Full Utils API documentation](docs/services/utils.md)

### ExploreService

The `ExploreService` provides functionality for browsing and discovering public content within Mealie groups. This service is designed for unauthenticated access to public content or can be used with authentication for private groups:

#### Foods & Ingredients
- `getFoods(groupSlug, params?)`: Browse available foods in a group
- `getFood(groupSlug, itemId, acceptLanguage?)`: Get specific food details

#### Households
- `getHouseholds(groupSlug, params?)`: Browse households in a group
- `getHousehold(groupSlug, householdSlug, acceptLanguage?)`: Get household details

#### Organization
- `getCategories(groupSlug, params?)`: Browse recipe categories
- `getCategory(groupSlug, itemId, acceptLanguage?)`: Get category details
- `getTags(groupSlug, params?)`: Browse recipe tags
- `getTag(groupSlug, itemId, acceptLanguage?)`: Get tag details
- `getTools(groupSlug, params?)`: Browse cooking tools
- `getTool(groupSlug, itemId, acceptLanguage?)`: Get tool details

#### Cookbooks & Recipes
- `getCookbooks(groupSlug, params?)`: Browse cookbooks
- `getCookbook(groupSlug, itemId, acceptLanguage?)`: Get cookbook details
- `getRecipes(groupSlug, params?)`: Search recipes with complex filters
- `getRecipe(groupSlug, recipeSlug, acceptLanguage?)`: Get recipe details
- `getRecipeSuggestions(groupSlug, params?)`: Get recipe suggestions based on available ingredients

```typescript
import { ExploreService } from 'node-mealie';

const explore = new ExploreService({
  baseUrl: 'https://your-mealie-instance.com'
  // Authentication optional for public content
});

// Browse recipes with filters
const recipes = await explore.getRecipes('public-recipes', {
  categories: ['desserts', 'quick-meals'],
  tags: ['vegetarian'],
  search: 'pasta',
  page: 1,
  perPage: 20
});

// Get recipe suggestions based on what you have
const suggestions = await explore.getRecipeSuggestions('public-recipes', {
  foods: ['tomatoes', 'basil', 'garlic', 'pasta'],
  tools: ['pot', 'knife'],
  limit: 5,
  maxMissingFoods: 2
});

// Browse content in different languages
const frenchCategories = await explore.getCategories('cuisine-francaise', {
  acceptLanguage: 'fr-FR'
});
```

[Full Explore API documentation](docs/services/explore.md)

## Configuration Options

```typescript
interface MealieClientOptions {
  baseUrl?: string;      // Base URL for the Mealie API
  token?: string;        // Authentication token
  username?: string;     // Username for authentication
  password?: string;     // Password for authentication
  debug?: boolean;       // Enable debug logging
}
```

## Error Handling

The library throws `MealieError` for all API errors:

```typescript
try {
  await client.getAppInfo();
} catch (error) {
  if (error instanceof MealieError) {
    console.error('Status:', error.statusCode);
    console.error('Message:', error.message);
    console.error('Response:', error.response);
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint
```

## License

MIT
