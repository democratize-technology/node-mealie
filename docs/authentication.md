# Authentication

The node-mealie library provides comprehensive authentication support for the Mealie API, including standard username/password authentication, OAuth/OIDC flows, token refresh, and logout functionality.

## Overview

The `AuthService` class handles all authentication-related operations. It extends the `MealieClient` class and provides methods for:

- Username/password authentication
- OAuth/OIDC login flows
- Token refresh
- Logout

## Usage

### Standard Authentication

Use username and password to authenticate:

```typescript
import { AuthService } from 'node-mealie';

const auth = new AuthService({ baseUrl: 'https://your-mealie-instance.com' });

// Login with credentials
try {
  const token = await auth.login('username', 'password');
  console.log('Authenticated:', token.access_token);
} catch (error) {
  console.error('Authentication failed:', error);
}
```

### OAuth/OIDC Authentication

Implement OAuth authentication flow:

```typescript
// Step 1: Initiate OAuth login
const { redirectUrl } = await auth.oauthLogin();
// Redirect user to the OAuth provider
window.location.href = redirectUrl;

// Step 2: Handle OAuth callback (after redirect back)
const urlParams = new URLSearchParams(window.location.search);
const callbackParams = {
  code: urlParams.get('code'),
  state: urlParams.get('state'),
  error: urlParams.get('error'),
  error_description: urlParams.get('error_description')
};

try {
  const token = await auth.oauthCallback(callbackParams);
  console.log('OAuth authenticated:', token.access_token);
} catch (error) {
  console.error('OAuth callback failed:', error);
}
```

### Token Refresh

Refresh an expired token:

```typescript
try {
  const newToken = await auth.refreshToken();
  console.log('Token refreshed:', newToken.access_token);
} catch (error) {
  console.error('Token refresh failed:', error);
}
```

### Logout

Log out the current user:

```typescript
try {
  const response = await auth.logout();
  console.log('Logged out successfully:', response.success);
} catch (error) {
  console.error('Logout failed:', error);
}
```

## Authentication Flow

The following diagram illustrates the authentication flows supported by the library:

![Authentication Flow](../assets/mealie-auth-flow.png)

## Error Handling

All authentication methods throw `MealieError` when an error occurs. The error includes:

- `message`: Error description
- `statusCode`: HTTP status code (if applicable)
- `statusText`: HTTP status text (if applicable)
- `response`: The error response body from the API

Example error handling:

```typescript
import { MealieError } from 'node-mealie';

try {
  await auth.login('username', 'wrong_password');
} catch (error) {
  if (error instanceof MealieError) {
    console.error(`Auth Error [${error.statusCode}]: ${error.message}`);
    if (error.response) {
      console.error('Details:', error.response);
    }
  }
}
```

## Token Management

The AuthService automatically manages tokens:

- Stores access tokens internally after successful authentication
- Automatically includes tokens in authenticated requests
- Clears tokens on logout

You can also manually manage tokens:

```typescript
// Set a token manually
auth.setToken('your-access-token');

// Clear the current token
auth.clearToken();
```

## Security Considerations

1. **Token Storage**: The library stores tokens in memory only. For browser environments, implement secure storage (e.g., HttpOnly cookies) for tokens.

2. **OAuth Security**: Always validate the `state` parameter in OAuth callbacks to prevent CSRF attacks.

3. **HTTPS**: Always use HTTPS for your Mealie instance to ensure tokens are transmitted securely.

4. **Token Refresh**: Implement automatic token refresh to maintain user sessions without requiring re-authentication.

## API Reference

### AuthService

#### Methods

- `login(username: string, password: string): Promise<AuthToken>`
- `oauthLogin(): Promise<OAuthInitResponse>`
- `oauthCallback(params: OAuthCallbackParams): Promise<AuthToken>`
- `refreshToken(): Promise<TokenRefreshResponse>`
- `logout(): Promise<LogoutResponse>`
- `setToken(token: string): void`
- `clearToken(): void`

#### Types

```typescript
interface AuthToken {
  access_token: string;
  token_type: string;
}

interface OAuthInitResponse {
  redirectUrl: string;
}

interface OAuthCallbackParams {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
}

interface TokenRefreshResponse extends AuthToken {
  refresh_token?: string;
}

interface LogoutResponse {
  success: boolean;
}
```
