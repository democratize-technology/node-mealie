import { AboutService, MealieError } from '../dist/index.js';
import type { AppInfo, AppStartupInfo, AppTheme } from '../dist/index.js';

async function main() {
  const client = new AboutService({
    baseUrl: 'https://demo.mealie.io',
    debug: true
  });

  try {
    // Get app info with proper types
    const appInfo: AppInfo = await client.getAppInfo();
    console.log('App Version:', appInfo.version);
    console.log('Production:', appInfo.production);

    // Get startup info
    const startupInfo: AppStartupInfo = await client.getStartupInfo();
    console.log('Is Demo:', startupInfo.isDemo);
    console.log('Is First Login:', startupInfo.isFirstLogin);

    // Get app theme
    const theme: AppTheme = await client.getAppTheme();
    console.log('Theme:', theme);
  } catch (error) {
    if (error instanceof MealieError) {
      console.error('Mealie Error:', error.message);
      console.error('Status Code:', error.statusCode);
      console.error('Status Text:', error.statusText);
      console.error('Response:', error.response);
    } else {
      console.error('Unknown error:', error);
    }
  }
}

main();
