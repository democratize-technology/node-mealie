import { UnitsService } from '../src/services/units.js';
import type { CreateIngredientUnit, MergeUnit, QueryParams } from '../src/types/units.js';

/**
 * Example usage of the Units Service
 * This example demonstrates all the main operations of the UnitsService.
 */
async function demonstrateUnitsService() {
  // Initialize the service with configuration
  const service = new UnitsService({
    baseUrl: 'https://your-mealie-instance.com',
    token: 'your-auth-token'
  });

  try {
    // 1. List all units with pagination and filtering
    console.log('--- Fetching all units with filtering ---');
    const queryParams: QueryParams = {
      search: 'cup',
      orderBy: 'name',
      orderDirection: 'asc',
      page: 1,
      perPage: 10
    };
    const allUnits = await service.getAllUnits(queryParams);
    console.log(`Found ${allUnits.total} units. First page contains:`, allUnits.items);

    // 2. Create a new unit
    console.log('\n--- Creating a new unit ---');
    const newUnitData: CreateIngredientUnit = {
      name: 'tablespoon',
      description: 'A common cooking measurement'
    };
    const createdUnit = await service.createUnit(newUnitData);
    console.log('Created unit:', createdUnit);

    // 3. Get a specific unit by ID
    console.log('\n--- Getting a specific unit ---');
    const retrievedUnit = await service.getOne(createdUnit.id);
    console.log('Retrieved unit:', retrievedUnit);

    // 4. Update a unit
    console.log('\n--- Updating a unit ---');
    const updateData: CreateIngredientUnit = {
      name: 'Tablespoon',
      description: 'Updated description for tablespoon measurement'
    };
    const updatedUnit = await service.updateUnit(createdUnit.id, updateData);
    console.log('Updated unit:', updatedUnit);

    // 5. Merge units (example with mock IDs)
    console.log('\n--- Merging units ---');
    // Note: In a real application, you would use actual unit IDs
    const mergeData: MergeUnit = {
      fromUnit: 'unit-to-merge-from-id',
      toUnit: 'unit-to-merge-into-id'
    };
    // Uncomment to actually perform merge:
    // const mergeResult = await service.mergeUnits(mergeData);
    // console.log('Merge result:', mergeResult);
    console.log('Merge would merge unit', mergeData.fromUnit, 'into', mergeData.toUnit);

    // 6. Delete a unit
    console.log('\n--- Deleting a unit ---');
    const deletedUnit = await service.deleteUnit(createdUnit.id);
    console.log('Deleted unit:', deletedUnit);

  } catch (error) {
    console.error('Error demonstrating Units Service:', error);
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
      console.error('Status Text:', error.statusText);
    }
  }
}

/**
 * Example handling common error scenarios
 */
async function demonstrateErrorHandling() {
  const service = new UnitsService({
    baseUrl: 'https://your-mealie-instance.com',
    token: 'your-auth-token'
  });

  try {
    // Attempt to get a non-existent unit
    await service.getOne('non-existent-unit-id');
  } catch (error) {
    if (error.statusCode === 404) {
      console.log('Unit not found - as expected');
    } else {
      console.error('Unexpected error:', error);
    }
  }

  try {
    // Attempt to create a unit with invalid data
    const invalidData = { /* missing required name field */ };
    // @ts-expect-error Demonstrating validation error
    await service.createUnit(invalidData);
  } catch (error) {
    if (error.statusCode === 422) {
      console.log('Validation error - as expected');
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Run the demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Running Units Service demonstration...\n');
  demonstrateUnitsService().then(() => {
    console.log('\nRunning error handling demonstration...\n');
    return demonstrateErrorHandling();
  });
}
