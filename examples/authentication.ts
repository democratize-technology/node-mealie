import { AuthService, MealieError } from '../src/index.js';

async function demonstrateAuthentication() {
  const auth = new AuthService({
    baseUrl: 'https://demo.mealie.io',
    debug: true
  });

  // Standard Login Flow
  console.log('\n--- Standard Login ---');
  try {
    const token = await auth.login('demo@mealie.io', 'demo');
    console.log('Login successful!');
    console.log('Access Token:', token.access_token);
    console.log('Token Type:', token.token_type);
  } catch (error) {
    if (error instanceof MealieError) {
      console.error('Login failed:', error.message);
      console.error('Status:', error.statusCode, error.statusText);
    }
  }

  // Token Refresh Flow
  console.log('\n--- Token Refresh ---');
  try {
    const refreshedToken = await auth.refreshToken();
    console.log('Token refreshed successfully!');
    console.log('New Access Token:', refreshedToken.access_token);
    if (refreshedToken.refresh_token) {
      console.log('New Refresh Token:', refreshedToken.refresh_token);
    }
  } catch (error) {
    if (error instanceof MealieError) {
      console.error('Token refresh failed:', error.message);
    }
  }

  // Logout Flow
  console.log('\n--- Logout ---');
  try {
    const logoutResponse = await auth.logout();
    console.log('Logout successful:', logoutResponse.success);
  } catch (error) {
    if (error instanceof MealieError) {
      console.error('Logout failed:', error.message);
    }
  }
}

// OAuth Flow Example (typically used in a web application)
async function demonstrateOAuthFlow() {
  const auth = new AuthService({
    baseUrl: 'https://demo.mealie.io',
    debug: true
  });

  // Step 1: Initiate OAuth flow
  console.log('\n--- OAuth Login Flow ---');
  try {
    const { redirectUrl } = await auth.oauthLogin();
    console.log('Redirect user to:', redirectUrl);
    
    // In a real web app, you would do:
    // window.location.href = redirectUrl;
    
    // Step 2: Handle callback (this would happen after redirect)
    // Simulating callback parameters
    const callbackParams = {
      code: 'example-auth-code',
      state: 'example-state'
    };
    
    console.log('\n--- OAuth Callback ---');
    const token = await auth.oauthCallback(callbackParams);
    console.log('OAuth authentication successful!');
    console.log('Access Token:', token.access_token);
  } catch (error) {
    if (error instanceof MealieError) {
      console.error('OAuth flow failed:', error.message);
    }
  }
}

// Run the examples
async function main() {
  await demonstrateAuthentication();
  // Uncomment to run OAuth example
  // await demonstrateOAuthFlow();
}

main().catch(console.error);
