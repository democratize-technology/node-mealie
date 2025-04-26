import { MealieClient } from '../client.js';
import type { DownloadParams, DownloadResponse } from '../types/utils.js';

export class UtilsService extends MealieClient {
  /**
   * Download a file from the server
   */
  async downloadFile(params?: DownloadParams): Promise<DownloadResponse> {
    const url = new URL(`${this.baseUrl}/api/utils/download`);
    
    if (params?.token) {
      url.searchParams.append('token', params.token);
    }

    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorBody}`);
      }

      return response.blob();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to download file: ${error.message}`);
      }
      throw new Error('Failed to download file');
    }
  }
}
