import { AdminService } from 'node-mealie';

async function main() {
  // Initialize the admin service
  const admin = new AdminService({
    baseUrl: 'http://localhost:9000', // Your Mealie instance URL
  });

  // Authenticate as admin
  await admin.authenticate('admin-username', 'admin-password');

  try {
    // Get application info
    console.log('=== Application Info ===');
    const appInfo = await admin.getAppInfo();
    console.log('Version:', appInfo.version);
    console.log('Production:', appInfo.production);
    console.log('Database:', appInfo.dbType);

    // Get application statistics
    console.log('\n=== Application Statistics ===');
    const stats = await admin.getAppStatistics();
    console.log('Total Recipes:', stats.totalRecipes);
    console.log('Total Users:', stats.totalUsers);
    console.log('Total Households:', stats.totalHouseholds);
    console.log('Total Groups:', stats.totalGroups);

    // Check application configuration
    console.log('\n=== Configuration Status ===');
    const config = await admin.checkAppConfig();
    console.log('Email Ready:', config.emailReady);
    console.log('LDAP Ready:', config.ldapReady);
    console.log('OIDC Ready:', config.oidcReady);
    console.log('OpenAI Enabled:', config.enableOpenai);

    // User management example
    console.log('\n=== User Management ===');
    
    // List users
    const users = await admin.getAllUsers({ page: 1, perPage: 10 });
    console.log('Total Users:', users.total);
    console.log('First User:', users.items[0]?.email);

    // Create a new user
    const newUser = await admin.createUser({
      username: 'newuser',
      fullName: 'New User',
      email: 'newuser@example.com',
      password: 'securepassword123'
    });
    console.log('Created User:', newUser.id);

    // Update the user
    const updatedUser = await admin.updateUser(newUser.id, {
      ...newUser,
      fullName: 'Updated Full Name'
    });
    console.log('Updated User:', updatedUser.fullName);

    // Household management example
    console.log('\n=== Household Management ===');
    
    // List households
    const households = await admin.getAllHouseholds({ page: 1, perPage: 10 });
    console.log('Total Households:', households.total);

    // Create a new household
    const newHousehold = await admin.createHousehold({
      name: 'Test Household'
    });
    console.log('Created Household:', newHousehold.id);

    // Group management example
    console.log('\n=== Group Management ===');
    
    // List groups
    const groups = await admin.getAllGroups({ page: 1, perPage: 10 });
    console.log('Total Groups:', groups.total);

    // Create a new group
    const newGroup = await admin.createGroup({
      name: 'Test Group'
    });
    console.log('Created Group:', newGroup.id);

    // Backup management example
    console.log('\n=== Backup Management ===');
    
    // List backups
    const backups = await admin.getAllBackups();
    console.log('Available Backups:', backups.imports.length);
    
    // Create a backup
    const backupResult = await admin.createBackup();
    console.log('Backup Created:', backupResult.message);

    // Maintenance example
    console.log('\n=== Maintenance ===');
    
    // Get maintenance summary
    const maintenance = await admin.getMaintenanceSummary();
    console.log('Data Directory Size:', maintenance.dataDirSize);
    console.log('Cleanable Images:', maintenance.cleanableImages);

    // Get storage details
    const storage = await admin.getStorageDetails();
    console.log('Temp Directory Size:', storage.tempDirSize);
    console.log('Backups Directory Size:', storage.backupsDirSize);

    // Email configuration example
    console.log('\n=== Email Configuration ===');
    
    // Check email configuration
    const emailConfig = await admin.checkEmailConfig();
    console.log('Email Ready:', emailConfig.ready);

    if (emailConfig.ready) {
      // Send test email
      const emailTest = await admin.sendTestEmail({
        email: 'test@example.com'
      });
      console.log('Test Email Sent:', emailTest.success);
    }

    // Localization example
    console.log('\n=== Localization Example ===');
    
    // Get app info in French
    const appInfoFr = await admin.getAppInfo('fr-FR');
    console.log('App Info (French version)');

    // Cleanup - Delete created resources
    console.log('\n=== Cleanup ===');
    await admin.deleteUser(newUser.id);
    await admin.deleteHousehold(newHousehold.id);
    await admin.deleteGroup(newGroup.id);
    console.log('Cleaned up test resources');

  } catch (error) {
    console.error('Error:', error.message);
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

main().catch(console.error);
