/**
 * Groups API Examples
 * 
 * This example demonstrates how to use the Groups API endpoints
 * including households, members, migrations, reports, and more.
 */

import { 
  MealieClient, 
  GroupsService,
  OrderDirection,
  OrderByNullPosition,
  ReportCategory,
  SupportedMigrations 
} from '../dist/index.js';

async function main() {
  // Initialize client
  const client = new MealieClient({ 
    baseUrl: 'https://demo.mealie.io'
  });

  // Authenticate
  await client.authenticate('demo@example.com', 'demo');

  // Create groups service
  const groupsService = new GroupsService(client);

  console.log('\n=== Group Information ===\n');
  
  // Get current group
  try {
    const currentGroup = await groupsService.getSelf();
    console.log('Current Group:', currentGroup);
  } catch (error) {
    console.error('Error getting current group:', error.message);
  }

  // Get group storage
  try {
    const storage = await groupsService.getStorage();
    console.log('Storage:', storage);
    console.log(`Used: ${storage.usedStorageStr} of ${storage.totalStorageStr}`);
  } catch (error) {
    console.error('Error getting storage:', error.message);
  }

  console.log('\n=== Households ===\n');
  
  // Get all households
  try {
    const households = await groupsService.getAllHouseholds({
      page: 1,
      perPage: 10,
      orderBy: 'name',
      orderDirection: OrderDirection.ASC
    });
    console.log('Households:', households.items);
  } catch (error) {
    console.error('Error getting households:', error.message);
  }

  console.log('\n=== Group Members ===\n');
  
  // Get group members
  try {
    const members = await groupsService.getGroupMembers({
      page: 1,
      perPage: 20
    });
    console.log('Members:', members.items);
    
    // Get individual member details
    if (members.items.length > 0) {
      const memberDetails = await groupsService.getGroupMember(members.items[0].username);
      console.log('Member Details:', memberDetails);
    }
  } catch (error) {
    console.error('Error getting members:', error.message);
  }

  console.log('\n=== Reports ===\n');
  
  // Get all reports
  try {
    const reports = await groupsService.getAllReports();
    console.log('All Reports:', reports);
    
    // Get backup reports
    const backupReports = await groupsService.getAllReports(ReportCategory.BACKUP);
    console.log('Backup Reports:', backupReports);
  } catch (error) {
    console.error('Error getting reports:', error.message);
  }

  console.log('\n=== Multi-Purpose Labels ===\n');
  
  // Create and manage labels
  try {
    const newLabel = await groupsService.createLabel({
      name: 'Example Label'
    });
    console.log('Created Label:', newLabel);
    
    // Get all labels
    const labels = await groupsService.getAllLabels({
      search: 'Example',
      page: 1,
      perPage: 10
    });
    console.log('Labels:', labels.items);
    
    // Update label
    const updatedLabel = await groupsService.updateLabel(newLabel.id, {
      id: newLabel.id,
      name: 'Updated Example Label',
      groupId: newLabel.groupId
    });
    console.log('Updated Label:', updatedLabel);
    
    // Delete label
    const deletedLabel = await groupsService.deleteLabel(newLabel.id);
    console.log('Deleted Label:', deletedLabel);
  } catch (error) {
    console.error('Error managing labels:', error.message);
  }

  console.log('\n=== Advanced Query Examples ===\n');
  
  // Advanced filtering
  try {
    const filteredHouseholds = await groupsService.getAllHouseholds({
      orderBy: 'name',
      orderByNullPosition: OrderByNullPosition.LAST,
      orderDirection: OrderDirection.DESC,
      queryFilter: 'name LIKE "%h%"',
      page: 1,
      perPage: 25
    });
    console.log('Filtered Households:', filteredHouseholds.items);
  } catch (error) {
    console.error('Error with advanced query:', error.message);
  }

  console.log('\n=== Migration Example ===\n');
  
  // Migration example (commented out as it requires a file)
  /*
  try {
    const migrationFile = new File(['...migration data...'], 'migration.zip');
    const migrationReport = await groupsService.startDataMigration({
      migration_type: SupportedMigrations.CHOWDOWN,
      archive: migrationFile
    });
    console.log('Migration Report:', migrationReport);
  } catch (error) {
    console.error('Error starting migration:', error.message);
  }
  */

  console.log('\n=== Seeder Example ===\n');
  
  // Seed data example
  try {
    const foodsResult = await groupsService.seedFoods({ locale: 'en-US' });
    console.log('Foods Seeded:', foodsResult);
    
    const labelsResult = await groupsService.seedLabels({ locale: 'en-US' });
    console.log('Labels Seeded:', labelsResult);
    
    const unitsResult = await groupsService.seedUnits({ locale: 'en-US' });
    console.log('Units Seeded:', unitsResult);
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
}

// Run the example
main().catch(console.error);
