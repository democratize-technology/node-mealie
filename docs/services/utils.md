# Utils Service

The Utils Service provides utility functions for file downloads and other utility operations within Mealie.

## Overview

The UtilsService class extends the MealieClient and provides methods for:
- Downloading files from the server

## Usage

```typescript
import { UtilsService } from 'node-mealie';

const service = new UtilsService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token' // Optional - may be required based on server configuration
});
```

## Methods

### File Downloads

#### downloadFile(params?: DownloadParams): Promise<DownloadResponse>

Downloads a file from the server.

**Parameters:**
- `params` (optional): DownloadParams object with:
  - `token`: Additional token for authentication if required

**Returns:**
- Promise resolving to a Blob object containing the file data

**Example:**
```typescript
// Download a file without additional token
const fileBlob = await service.downloadFile();

// Download a file with an additional token
const fileBlob = await service.downloadFile({ token: 'special-download-token' });

// Save the downloaded file in a browser environment
const url = URL.createObjectURL(fileBlob);
const link = document.createElement('a');
link.href = url;
link.download = 'downloaded-file';
link.click();
URL.revokeObjectURL(url);

// Save the downloaded file in a Node.js environment
import { writeFile } from 'fs/promises';
const buffer = await fileBlob.arrayBuffer();
await writeFile('downloaded-file', Buffer.from(buffer));
```

## Type Definitions

### Request Types

```typescript
interface DownloadParams {
  /** Token for authentication if required */
  token?: string | null;
}
```

### Response Types

```typescript
type DownloadResponse = Blob;
```

## Authentication

The Utils Service supports two methods of authentication:

1. **Token Authentication**: Pass a token when creating the service instance
```typescript
const service = new UtilsService({
  baseUrl: 'https://your-mealie-instance.com',
  token: 'your-auth-token'
});
```

2. **Download Token**: Pass a specific token for a download operation
```typescript
const fileBlob = await service.downloadFile({ token: 'special-download-token' });
```

## Error Handling

All methods throw errors in the following cases:
- Network connectivity issues
- Authentication errors (401)
- Resource not found (404)
- Validation errors (422)
- Server errors (500)

**Example:**
```typescript
try {
  const fileBlob = await service.downloadFile();
} catch (error) {
  console.error('Error:', error.message);
  if (error.statusCode) {
    console.error('Status:', error.statusCode);
  }
}
```

## Use Cases

The Utils Service can be used for various scenarios such as:

1. **Exporting Data**: Download backup files or exported data
2. **Downloading Reports**: Access generated reports or analytics
3. **Token-based Downloads**: Handle secure file downloads that require special authentication

## Browser vs Node.js Usage

The service works in both browser and Node.js environments, but the way you handle the downloaded Blob differs:

### Browser Environment

```typescript
const fileBlob = await service.downloadFile();

// Create download link
const url = URL.createObjectURL(fileBlob);
const link = document.createElement('a');
link.href = url;
link.download = 'filename.ext';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
URL.revokeObjectURL(url);
```

### Node.js Environment

```typescript
import { writeFile } from 'fs/promises';

const fileBlob = await service.downloadFile();
const buffer = await fileBlob.arrayBuffer();
await writeFile('filename.ext', Buffer.from(buffer));
```
