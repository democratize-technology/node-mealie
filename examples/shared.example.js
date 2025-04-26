// Shared Recipe Token Example
// This example demonstrates how to use the SharedService to manage recipe share tokens
// For more examples, check out the examples directory

import { MealieClient, SharedService } from 'node-mealie';

// Initialize clients
const client = new MealieClient({
  baseUrl: 'http://localhost:9000', // 'https://api.example.com/mealie' for production
});

const sharedService = new SharedService(client.baseUrl);

async function runDemo() {
  try {
    console.log('🍲 Mealie API - Shared Recipe Demo\n');

    // First, authenticate
    console.log('1. Authenticating...');
    const authToken = await client.auth.login('demo@example.com', 'password');
    console.log('✅ Authenticated successfully\n');

    // Set the auth token for subsequent requests
    sharedService.options.authToken = authToken.access_token;

    // Create a shared recipe token
    console.log('2. Creating a shared recipe token...');
    const recipeId = 'your-recipe-id-here'; // Replace with an actual recipe ID
    const sharedRecipe = await sharedService.createSharedRecipe({ recipeId });
    console.log('✅ Created shared recipe token:', sharedRecipe);
    console.log(`   Share URL: ${client.baseUrl}/shared/recipes/${sharedRecipe.id}\n`);

    // Get all shared recipes
    console.log('3. Getting all shared recipes...');
    const allSharedRecipes = await sharedService.getAllSharedRecipes();
    console.log('✅ Retrieved shared recipes:', allSharedRecipes);
    console.log(`   Total shared recipes: ${allSharedRecipes.length}\n`);

    // Get shared recipes for a specific recipe
    console.log('4. Getting shared tokens for a specific recipe...');
    const recipeSpecificTokens = await sharedService.getAllSharedRecipes({ recipeId });
    console.log('✅ Retrieved tokens for recipe:', recipeSpecificTokens);
    console.log(`   Tokens for this recipe: ${recipeSpecificTokens.length}\n`);

    // Get a specific shared recipe token
    console.log('5. Getting a specific shared recipe token...');
    const specificToken = await sharedService.getSharedRecipe(sharedRecipe.id);
    console.log('✅ Retrieved specific token:', specificToken);
    console.log(`   Recipe name: ${specificToken.recipe.name || 'Not available'}\n`);

    // Delete a shared recipe token
    console.log('6. Deleting a shared recipe token...');
    await sharedService.deleteSharedRecipe(sharedRecipe.id);
    console.log('✅ Deleted shared recipe token successfully\n');

    // Verify deletion
    console.log('7. Verifying deletion...');
    const verifyList = await sharedService.getAllSharedRecipes();
    const found = verifyList.some(token => token.id === sharedRecipe.id);
    console.log(`✅ Token ${found ? 'still exists' : 'successfully deleted'}\n`);

    console.log('🎉 Demo completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

// Example: Creating a shareable link generator
function generateShareableLink(baseUrl, tokenId) {
  return `${baseUrl}/shared/recipes/${tokenId}`;
}

// Example: Checking if a recipe has share tokens
async function hasShareTokens(sharedService, recipeId) {
  const tokens = await sharedService.getAllSharedRecipes({ recipeId });
  return tokens.length > 0;
}

// Example: Revoking all share tokens for a recipe
async function revokeAllShareTokens(sharedService, recipeId) {
  const tokens = await sharedService.getAllSharedRecipes({ recipeId });
  const deletePromises = tokens.map(token => sharedService.deleteSharedRecipe(token.id));
  await Promise.all(deletePromises);
  console.log(`Revoked ${tokens.length} share tokens for recipe ${recipeId}`);
}

// Run the demo if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runDemo();
}

// Export for use in other files
export { runDemo, generateShareableLink, hasShareTokens, revokeAllShareTokens };
