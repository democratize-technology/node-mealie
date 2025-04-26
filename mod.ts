// Deno entry point for the built library
export { MealieClient } from './dist/client.js';
export { AboutService } from './dist/services/about.js';
export { FoodsService } from './dist/services/foods.js';
export type {
  AppInfo,
  AppTheme,  
  AppStartupInfo,
  MealieClientOptions,
  AuthToken,
} from './dist/types/index.js';
export { MealieError } from './dist/types/index.js';
