import { AboutService } from '../dist/index.js';

const client = new AboutService({
  baseUrl: 'https://demo.mealie.io'
});

try {
  // Get app info
  const appInfo = await client.getAppInfo();
  console.log('App Version:', appInfo.version);
  console.log('Demo Status:', appInfo.demoStatus);

  // Get startup info
  const startupInfo = await client.getStartupInfo();
  console.log('Is Demo:', startupInfo.isDemo);
  console.log('Is First Login:', startupInfo.isFirstLogin);

  // Get app theme
  const theme = await client.getAppTheme();
  console.log('Theme:', theme);
} catch (error) {
  console.error('Error:', error.message);
}
