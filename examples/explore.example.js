/**
 * Explore Service Examples
 * 
 * This file demonstrates the usage of the ExploreService
 * for browsing and discovering recipes, foods, and other resources
 * in a public Mealie group.
 */

const { ExploreService } = require('../dist/index.js');

// Initialize the service
const exploreService = new ExploreService({
  baseUrl: 'https://your-mealie-instance.com',
  // Token is optional for public explore endpoints
});

async function runExamples() {
  try {
    console.log('=== Explore Service Examples ===\n');

    // 1. Browse Foods
    console.log('1. Browse Foods');
    const foods = await exploreService.getFoods('my-public-group', {
      search: 'tomato',
      page: 1,
      perPage: 5,
      orderBy: 'name',
      orderDirection: 'asc'
    });
    console.log(`Found ${foods.total} foods, showing page ${foods.page}/${foods.total_pages}`);
    foods.items.forEach(food => {
      console.log(`- ${food.name} (ID: ${food.id})`);
    });
    console.log('');

    // 2. Get a specific food
    console.log('2. Get a specific food');
    if (foods.items.length > 0) {
      const food = await exploreService.getFood('my-public-group', foods.items[0].id);
      console.log(`Food details: ${food.name}`);
    }
    console.log('');

    // 3. Browse Households
    console.log('3. Browse Households');
    const households = await exploreService.getHouseholds('my-public-group');
    console.log(`Found ${households.total} households`);
    households.items.forEach(household => {
      console.log(`- ${household.name} (${household.slug})`);
    });
    console.log('');

    // 4. Browse Categories
    console.log('4. Browse Categories');
    const categories = await exploreService.getCategories('my-public-group');
    console.log(`Found ${categories.total} categories`);
    categories.items.forEach(category => {
      console.log(`- ${category.name} (${category.slug})`);
    });
    console.log('');

    // 5. Browse Tags
    console.log('5. Browse Tags');
    const tags = await exploreService.getTags('my-public-group');
    console.log(`Found ${tags.total} tags`);
    tags.items.forEach(tag => {
      console.log(`- ${tag.name} (${tag.slug})`);
    });
    console.log('');

    // 6. Browse Tools
    console.log('6. Browse Tools');
    const tools = await exploreService.getTools('my-public-group');
    console.log(`Found ${tools.total} tools`);
    tools.items.forEach(tool => {
      console.log(`- ${tool.name} (${tool.slug})`);
    });
    console.log('');

    // 7. Browse Cookbooks
    console.log('7. Browse Cookbooks');
    const cookbooks = await exploreService.getCookbooks('my-public-group');
    console.log(`Found ${cookbooks.total} cookbooks`);
    cookbooks.items.forEach(cookbook => {
      console.log(`- ${cookbook.name}`);
    });
    console.log('');

    // 8. Search Recipes with Complex Filters
    console.log('8. Search Recipes with Complex Filters');
    const recipes = await exploreService.getRecipes('my-public-group', {
      categories: ['desserts', 'quick-meals'],
      tags: ['vegetarian'],
      search: 'pasta',
      requireAllCategories: false,
      requireAllTags: true,
      page: 1,
      perPage: 10
    });
    console.log(`Found ${recipes.total} recipes matching criteria`);
    recipes.items.forEach(recipe => {
      console.log(`- ${recipe.name} (${recipe.slug})`);
    });
    console.log('');

    // 9. Get Recipe Suggestions
    console.log('9. Get Recipe Suggestions');
    const suggestions = await exploreService.getRecipeSuggestions('my-public-group', {
      foods: ['tomatoes', 'basil', 'garlic', 'pasta'],
      tools: ['pot', 'knife'],
      limit: 5,
      maxMissingFoods: 2,
      maxMissingTools: 1
    });
    console.log(`Found ${suggestions.items.length} recipe suggestions`);
    suggestions.items.forEach(suggestion => {
      console.log(`- ${suggestion.recipe.name}`);
      if (suggestion.missingFoods.length > 0) {
        console.log(`  Missing foods: ${suggestion.missingFoods.map(f => f.name).join(', ')}`);
      }
      if (suggestion.missingTools.length > 0) {
        console.log(`  Missing tools: ${suggestion.missingTools.map(t => t.name).join(', ')}`);
      }
    });
    console.log('');

    // 10. Get Recipe Details
    console.log('10. Get Recipe Details');
    if (recipes.items.length > 0) {
      const recipe = await exploreService.getRecipe('my-public-group', recipes.items[0].slug);
      console.log(`Recipe: ${recipe.name}`);
      console.log(`Slug: ${recipe.slug}`);
      // Additional recipe details would be available here
    }
    console.log('');

    // 11. Internationalization Support
    console.log('11. Internationalization Support');
    const frenchRecipes = await exploreService.getRecipes('my-public-group', {
      acceptLanguage: 'fr-FR',
      page: 1,
      perPage: 5
    });
    console.log(`Found ${frenchRecipes.total} recipes (French locale)`);
    frenchRecipes.items.forEach(recipe => {
      console.log(`- ${recipe.name}`);
    });
    console.log('');

    // 12. Error Handling
    console.log('12. Error Handling');
    try {
      await exploreService.getRecipe('non-existent-group', 'non-existent-recipe');
    } catch (error) {
      console.log(`Caught error: ${error.message}`);
      if (error.statusCode) {
        console.log(`Status code: ${error.statusCode}`);
      }
    }

  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Run the examples
runExamples().then(() => {
  console.log('\n=== Examples completed ===');
}).catch(error => {
  console.error('Fatal error:', error);
});
