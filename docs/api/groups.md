# Groups API

The Groups API provides access to group-related functionality in Mealie, including household management, group preferences, member management, data migration, reporting, and data seeding operations.

## Overview

The Groups API is divided into several sections:

1. **Households API** - Manage households within a group
2. **Self Service API** - Access and manage group information and preferences
3. **Migrations API** - Handle data migrations from other platforms
4. **Reports API** - Access and manage reports
5. **Multi Purpose Labels API** - Manage custom labels
6. **Seeders API** - Initialize group data with predefined values

## Usage

First, initialize the client and create a Groups service instance:

```typescript
import { MealieClient, GroupsService } from 'node-mealie';

const client = new MealieClient({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});

const groupsService = new GroupsService(client);
```

### Households API

#### Get All Households

```typescript
const households = await groupsService.getAllHouseholds({
  page: 1,
  perPage: 10,
  orderBy: 'name',
  orderDirection: OrderDirection.ASC
});
```

#### Get One Household

```typescript
const household = await groupsService.getOneHousehold('household-slug');
```

### Self Service API

#### Get Current Group

```typescript
const group = await groupsService.getSelf();
```

#### Get Group Members

```typescript
const members = await groupsService.getGroupMembers({
  page: 1,
  perPage: 20,
  queryFilter: 'username LIKE "%user%"'
});
```

#### Get Specific Group Member

```typescript
// By username
const member = await groupsService.getGroupMember('username');

// By UUID
const memberById = await groupsService.getGroupMember('123e4567-e89b-12d3-a456-426614174000');
```

#### Group Preferences

```typescript
// Get preferences
const preferences = await groupsService.getGroupPreferences();

// Update preferences
const updated = await groupsService.updateGroupPreferences({
  // preference properties
});
```

#### Get Storage Information

```typescript
const storage = await groupsService.getStorage();
console.log(`Used: ${storage.usedStorageStr} of ${storage.totalStorageStr}`);
```

### Migrations API

#### Start Data Migration

```typescript
const migrationFile = new File(['...content...'], 'migration.zip');
const report = await groupsService.startDataMigration({
  migration_type: SupportedMigrations.CHOWDOWN,
  archive: migrationFile
});
```

Supported migration types:
- `NEXTCLOUD`
- `CHOWDOWN` 
- `COPYMETHAT`
- `PAPRIKA`
- `MEALIE_ALPHA`
- `TANDOOR`
- `PLANTOEAT`
- `MYRECIPEBOX`
- `RECIPEKEEPER`

### Reports API

#### Get All Reports

```typescript
// Get all reports
const reports = await groupsService.getAllReports();

// Filter by type
const backupReports = await groupsService.getAllReports(ReportCategory.BACKUP);
```

#### Get/Delete Report

```typescript
// Get report
const report = await groupsService.getOneReport('report-id');

// Delete report
await groupsService.deleteOneReport('report-id');
```

### Multi Purpose Labels API

#### Create Label

```typescript
const label = await groupsService.createLabel({
  name: 'My Custom Label'
});
```

#### Get Labels

```typescript
// Get all labels with search
const labels = await groupsService.getAllLabels({
  search: 'custom',
  page: 1,
  perPage: 20
});

// Get specific label
const label = await groupsService.getOneLabel('label-id');
```

#### Update/Delete Label

```typescript
// Update label
const updated = await groupsService.updateLabel('label-id', {
  id: 'label-id',
  name: 'Updated Label Name',
  groupId: 'group-id'
});

// Delete label
const deleted = await groupsService.deleteLabel('label-id');
```

### Seeders API

#### Seed Data

```typescript
// Seed foods
await groupsService.seedFoods({ locale: 'en-US' });

// Seed labels
await groupsService.seedLabels({ locale: 'en-US' });

// Seed units
await groupsService.seedUnits({ locale: 'en-US' });
```

## Query Parameters

Many endpoints support pagination and filtering via query parameters:

```typescript
interface QueryParams {
  orderBy?: string;
  orderByNullPosition?: OrderByNullPosition;
  orderDirection?: OrderDirection;
  queryFilter?: string;
  paginationSeed?: string;
  page?: number;
  perPage?: number;
}
```

### Example with Advanced Filtering

```typescript
const results = await groupsService.getAllHouseholds({
  orderBy: 'name',
  orderByNullPosition: OrderByNullPosition.LAST,
  orderDirection: OrderDirection.ASC,
  queryFilter: 'name LIKE "%kitchen%" AND created_at > "2023-01-01"',
  page: 2,
  perPage: 25
});
```

## Error Handling

All API methods may throw `MealieError` exceptions:

```typescript
try {
  const household = await groupsService.getOneHousehold('invalid-slug');
} catch (error) {
  if (error instanceof MealieError) {
    console.error(`Status: ${error.statusCode}`);
    console.error(`Message: ${error.message}`);
    console.error(`Response: ${error.response}`);
  }
}
```

## Types

Key types used in the Groups API:

```typescript
// Group types
interface GroupSummary {
  name: string;
  id: string;
  slug: string;
}

interface GroupStorage {
  usedStorageBytes: number;
  usedStorageStr: string;
  totalStorageBytes: number;
  totalStorageStr: string;
}

// Household types
interface HouseholdSummary {
  groupId: string;
  name: string;
  id: string;
  slug: string;
}

// User types
interface UserSummary {
  id: string;
  groupId: string;
  householdId: string;
  username: string;
  fullName: string;
}

// Report types
enum ReportCategory {
  BACKUP = 'backup',
  RESTORE = 'restore',
  MIGRATION = 'migration',
  BULK_IMPORT = 'bulk_import'
}

interface ReportSummary {
  category: ReportCategory;
  groupId: string;
  name: string;
  id: string;
}
```

For complete type definitions, refer to [src/types/groups.ts](https://github.com/your-org/node-mealie/blob/main/src/types/groups.ts).
