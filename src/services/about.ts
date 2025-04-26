import { MealieClient } from '../client.js';
import type { AppInfo, AppStartupInfo, AppTheme } from '../types/index.js';

export class AboutService extends MealieClient {
  /**
   * Get general application information
   */
  async getAppInfo(): Promise<AppInfo> {
    return this.get<AppInfo>('/api/app/about');
  }

  /**
   * Returns helpful startup information
   */
  async getStartupInfo(): Promise<AppStartupInfo> {
    return this.get<AppStartupInfo>('/api/app/about/startup-info');
  }

  /**
   * Get's the current theme settings
   */
  async getAppTheme(): Promise<AppTheme> {
    return this.get<AppTheme>('/api/app/about/theme');
  }
}
