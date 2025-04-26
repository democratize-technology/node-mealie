/**
 * Examples for using the FoodsService
 */

import { FoodsService } from '../src/index.js';
import type { FoodItem, FoodPagination } from '../src/types/index.js';

// Initialize the client
const foods = new FoodsService({
  baseUrl: 'https://demo.mealie.io',
  token: 'your-auth-token'
});

async function runExamples() {
  try {
    // 1. Get all foods
    console.log('\n--- Getting all foods ---');
    const allFoods = await foods.getAllFoods({
      page: 1,
      perPage: 10,
      orderBy: 'name',
      orderDirection: 'asc'
    });
    console.log(`Found ${allFoods.total} foods`);
    console.log('First page items:', allFoods.items.map(f => f.name));

    // 2. Search for specific foods
    console.log('\n--- Searching for tomato ---');
    const tomatoFoods = await foods.getAllFoods({
      search: 'tomato',
      page: 1,
      perPage: 5
    });
    console.log(`Found ${tomatoFoods.total} tomato-related foods`);
    tomatoFoods.items.forEach(food => {
      console.log(`- ${food.name} (ID: ${food.id})`);
    });

    // 3. Create a new food
    console.log('\n--- Creating new food ---');
    const newFood = await foods.createFood({
      name: 'Cherry Tomatoes'
    });
    console.log('Created food:', newFood);

    // 4. Get a single food by ID
    console.log('\n--- Getting single food ---');
    const singleFood = await foods.getOne(newFood.id);
    console.log('Retrieved food:', singleFood);

    // 5. Update a food
    console.log('\n--- Updating food ---');
    const updatedFood = await foods.updateFood(newFood.id, {
      name: 'Roma Tomatoes'
    });
    console.log('Updated food:', updatedFood);

    // 6. Demonstrate food merging (with proper error handling)
    console.log('\n--- Demonstrating food merging ---');
    // First create two foods to merge
    const food1 = await foods.createFood({ name: 'Tomato' });
    const food2 = await foods.createFood({ name: 'Tomatoes' });
    
    try {
      const mergeResult = await foods.mergeFoods({
        fromFood: food1.id,
        toFood: food2.id
      });
      console.log('Merge successful:', mergeResult);
    } catch (error) {
      console.error('Merge failed:', error.message);
    }

    // 7. Delete a food
    console.log('\n--- Deleting food ---');
    const deletedFood = await foods.deleteFood(updatedFood.id);
    console.log('Deleted food:', deletedFood);

    // 8. Batch operations example
    console.log('\n--- Batch operations ---');
    const foodsToCreate = ['Carrots', 'Potatoes', 'Onions', 'Garlic'];
    
    console.log('Creating multiple foods...');
    const createdFoods = await Promise.all(
      foodsToCreate.map(name => foods.createFood({ name }))
    );
    console.log(`Created ${createdFoods.length} foods`);

    // Update one of them
    console.log('Updating Carrots to Baby Carrots...');
    const updatedCarrots = await foods.updateFood(createdFoods[0].id, {
      name: 'Baby Carrots'
    });
    console.log('Updated:', updatedCarrots.name);

    // Clean up by deleting all created foods
    console.log('Cleaning up created foods...');
    await Promise.all(
      createdFoods.map(food => foods.deleteFood(food.id))
    );
    console.log('Cleanup complete');

    // 9. Advanced search and filtering
    console.log('\n--- Advanced search and filtering ---');
    const filteredFoods = await foods.getAllFoods({
      search: 'cheese',
      orderBy: 'name',
      orderDirection: 'desc',
      orderByNullPosition: 'last',
      page: 1,
      perPage: 5
    });
    console.log(`Found ${filteredFoods.total} cheese-related foods`);
    filteredFoods.items.forEach(food => {
      console.log(`- ${food.name}`);
    });

    // 10. Error handling example
    console.log('\n--- Error handling example ---');
    try {
      // Try to get a non-existent food
      await foods.getOne('non-existent-id');
    } catch (error) {
      console.error('Expected error:', error.message);
      if (error.statusCode) {
        console.error('Status code:', error.statusCode);
      }
    }

  } catch (error) {
    console.error('Example failed with error:', error);
  }
}

// Run the examples
runExamples().catch(console.error);
