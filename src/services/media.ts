import { MealieClient } from '../client.js';
import type {
  ImageType,
  MediaResponse,
} from '../types/media.js';

export class MediaService extends MealieClient {
  /**
   * Get a recipe image (original, min-original, or tiny-original)
   */
  async getRecipeImage(recipeId: string, fileName: ImageType): Promise<MediaResponse> {
    // Override the request method to handle binary response
    const url = `${this.baseUrl}/api/media/recipes/${recipeId}/images/${fileName}`;
    
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
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
        throw new Error(`Failed to fetch recipe image: ${error.message}`);
      }
      throw new Error('Failed to fetch recipe image');
    }
  }

  /**
   * Get a recipe timeline event image
   */
  async getRecipeTimelineEventImage(recipeId: string, timelineEventId: string, fileName: ImageType): Promise<MediaResponse> {
    const url = `${this.baseUrl}/api/media/recipes/${recipeId}/images/timeline/${timelineEventId}/${fileName}`;
    
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
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
        throw new Error(`Failed to fetch timeline event image: ${error.message}`);
      }
      throw new Error('Failed to fetch timeline event image');
    }
  }

  /**
   * Get a recipe asset
   */
  async getRecipeAsset(recipeId: string, fileName: string): Promise<MediaResponse> {
    const url = `${this.baseUrl}/api/media/recipes/${recipeId}/assets/${fileName}`;
    
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
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
        throw new Error(`Failed to fetch recipe asset: ${error.message}`);
      }
      throw new Error('Failed to fetch recipe asset');
    }
  }

  /**
   * Get a user image
   */
  async getUserImage(userId: string, fileName: string): Promise<MediaResponse> {
    const url = `${this.baseUrl}/api/media/users/${userId}/${fileName}`;
    
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
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
        throw new Error(`Failed to fetch user image: ${error.message}`);
      }
      throw new Error('Failed to fetch user image');
    }
  }

  /**
   * Get validation text for Docker
   */
  async getValidationText(): Promise<string> {
    const url = `${this.baseUrl}/api/media/docker/validate.txt`;
    
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorBody}`);
      }

      return response.text();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch validation text: ${error.message}`);
      }
      throw new Error('Failed to fetch validation text');
    }
  }
}
