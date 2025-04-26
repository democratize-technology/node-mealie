# Admin API

The admin API provides functionality for managing users, households, groups, and system maintenance tasks. These endpoints require administrator privileges.

## Overview

The admin functionality is accessible through the `AdminService` class:

```typescript
import { AdminService } from 'node-mealie';

const admin = new AdminService({ baseUrl: 'http://your-mealie-instance' });
```

## Authentication

All admin endpoints require authentication with an administrator account.

## About Endpoints

### Get Application Info

Get detailed information about the Mealie instance.

```typescript
const appInfo = await admin.getAppInfo();
// Returns: AdminAboutInfo
```

### Get Application Statistics

Get usage statistics for the Mealie instance.

```typescript
const stats = await admin.getAppStatistics();
// Returns: AppStatistics
```

### Check Application Configuration

Check the configuration status of various features.

```typescript
const config = await admin.checkAppConfig();
// Returns: CheckAppConfig
```

## User Management

### Get All Users

Retrieve a paginated list of all users.

```typescript
const users = await admin.getAllUsers({
  page: 1,
  perPage: 50,
  orderBy: 'email',
  orderDirection: 'asc',
  queryFilter: 'admin:true'
});
// Returns: AdminUserPagination
```

### Create User

Create a new user account.

```typescript
const newUser = await admin.createUser({
  username: 'newuser',
  fullName: 'New User',
  email: 'user@example.com',
  password: 'securepassword'
});
// Returns: AdminUserOut
```

### Get Specific User

Retrieve details for a specific user.

```typescript
const user = await admin.getUser('user-id');
// Returns: AdminUserOut
```

### Update User

Update user details.

```typescript
const updatedUser = await admin.updateUser('user-id', {
  id: 'user-id',
  email: 'updated@example.com',
  fullName: 'Updated Name'
});
// Returns: AdminUserOut
```

### Delete User

Delete a user account.

```typescript
const deletedUser = await admin.deleteUser('user-id');
// Returns: AdminUserOut
```

### Unlock Users

Unlock locked user accounts.

```typescript
const result = await admin.unlockUsers(false); // force = false
// Returns: UnlockResults
```

### Generate Password Reset Token

Generate a password reset token for a user.

```typescript
const token = await admin.generatePasswordResetToken({
  email: 'user@example.com'
});
// Returns: PasswordResetToken
```

## Household Management

### Get All Households

Retrieve a paginated list of all households.

```typescript
const households = await admin.getAllHouseholds({
  page: 1,
  perPage: 50
});
// Returns: HouseholdPagination
```

### Create Household

Create a new household.

```typescript
const household = await admin.createHousehold({
  name: 'New Household'
});
// Returns: AdminHouseholdInDB
```

### Get Specific Household

Retrieve details for a specific household.

```typescript
const household = await admin.getHousehold('household-id');
// Returns: AdminHouseholdInDB
```

### Update Household

Update household details.

```typescript
const updatedHousehold = await admin.updateHousehold('household-id', {
  id: 'household-id',
  name: 'Updated Household',
  groupId: 'group-id'
});
// Returns: AdminHouseholdInDB
```

### Delete Household

Delete a household.

```typescript
const deletedHousehold = await admin.deleteHousehold('household-id');
// Returns: AdminHouseholdInDB
```

## Group Management

### Get All Groups

Retrieve a paginated list of all groups.

```typescript
const groups = await admin.getAllGroups({
  page: 1,
  perPage: 50
});
// Returns: GroupPagination
```

### Create Group

Create a new group.

```typescript
const group = await admin.createGroup({
  name: 'New Group'
});
// Returns: GroupInDB
```

### Get Specific Group

Retrieve details for a specific group.

```typescript
const group = await admin.getGroup('group-id');
// Returns: GroupInDB
```

### Update Group

Update group details.

```typescript
const updatedGroup = await admin.updateGroup('group-id', {
  id: 'group-id',
  name: 'Updated Group'
});
// Returns: GroupInDB
```

### Delete Group

Delete a group.

```typescript
const deletedGroup = await admin.deleteGroup('group-id');
// Returns: GroupInDB
```

## Email Management

### Check Email Configuration

Check if email is properly configured.

```typescript
const emailConfig = await admin.checkEmailConfig();
// Returns: EmailReady
```

### Send Test Email

Send a test email to verify configuration.

```typescript
const result = await admin.sendTestEmail({
  email: 'test@example.com'
});
// Returns: EmailSuccess
```

## Backup Management

### Get All Backups

List all available backups.

```typescript
const backups = await admin.getAllBackups();
// Returns: AllBackups
```

### Create Backup

Create a new backup.

```typescript
const result = await admin.createBackup();
// Returns: SuccessResponse
```

### Get Backup Token

Get a token to download a specific backup file.

```typescript
const token = await admin.getBackupToken('backup-filename.zip');
// Returns: FileTokenResponse
```

### Delete Backup

Delete a backup file.

```typescript
const result = await admin.deleteBackup('backup-filename.zip');
// Returns: SuccessResponse
```

### Upload Backup

Upload a backup file.

```typescript
const file = new File(['backup data'], 'backup.zip', { type: 'application/zip' });
const result = await admin.uploadBackup(file);
// Returns: SuccessResponse
```

### Restore Backup

Restore from a backup file.

```typescript
const result = await admin.restoreBackup('backup-filename.zip');
// Returns: SuccessResponse
```

## Maintenance

### Get Maintenance Summary

Get a summary of system maintenance status.

```typescript
const summary = await admin.getMaintenanceSummary();
// Returns: MaintenanceSummary
```

### Get Storage Details

Get detailed storage information.

```typescript
const storage = await admin.getStorageDetails();
// Returns: MaintenanceStorageDetails
```

### Clean Images

Clean unused image files.

```typescript
const result = await admin.cleanImages();
// Returns: SuccessResponse
```

### Clean Temporary Files

Clean temporary files.

```typescript
const result = await admin.cleanTemp();
// Returns: SuccessResponse
```

### Clean Recipe Folders

Clean up recipe folders.

```typescript
const result = await admin.cleanRecipeFolders();
// Returns: SuccessResponse
```

## Debug

### Debug OpenAI Integration

Test OpenAI integration with an optional file.

```typescript
// Without file
const result = await admin.debugOpenAI();

// With file
const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
const result = await admin.debugOpenAI(file);
// Returns: DebugResponse
```

## Language Support

All admin endpoints support localization via the `acceptLanguage` parameter:

```typescript
// Example with language header
const users = await admin.getAllUsers({ 
  page: 1,
  acceptLanguage: 'fr-FR'
});
```

## Error Handling

All methods throw `MealieError` if the request fails:

```typescript
try {
  await admin.createUser({ 
    username: 'existinguser',
    email: 'existing@example.com',
    password: 'password123' 
  });
} catch (error) {
  if (error instanceof MealieError) {
    console.error('Error:', error.statusCode, error.message);
  }
}
```

## TypeScript Definitions

The admin API includes comprehensive TypeScript definitions for all request and response types. Key interfaces include:

- `AdminAboutInfo` - Application information
- `AppStatistics` - Usage statistics
- `CheckAppConfig` - Configuration status
- `AdminUserPagination` - Paginated user list
- `AdminUserIn` - User creation data
- `AdminUserOut` - User details
- `HouseholdPagination` - Paginated household list
- `AdminHouseholdInDB` - Household details
- `GroupPagination` - Paginated group list
- `GroupInDB` - Group details
- `AllBackups` - Backup listing
- `MaintenanceSummary` - Maintenance summary
- `MaintenanceStorageDetails` - Storage details
