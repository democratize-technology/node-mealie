import type { MealieClientOptions, AuthToken } from './types/index.js';
import { MealieError } from './types/index.js';

export class MealieClient {
  protected baseUrl: string;
  protected token?: string;
  protected debug: boolean;

  constructor(options: MealieClientOptions = {}) {
    this.baseUrl = options.baseUrl?.replace(/\/$/, '') || 'https://demo.mealie.io';
    this.token = options.token;
    this.debug = options.debug || false;

    // If credentials provided, authenticate immediately
    if (options.username && options.password) {
      this.authenticate(options.username, options.password).catch((err) => {
        if (this.debug) console.error('Initial authentication failed:', err);
      });
    }
  }

  private log(...args: any[]): void {
    if (this.debug) {
      console.log('[MealieClient]', ...args);
    }
  }

  protected async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      ...((options.headers || {}) as Record<string, string>),
    };

    // Only set Content-Type if it's not FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    this.log(`${options.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        body: options.body instanceof FormData ? options.body : options.body,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorBody);
        } catch {
          errorData = errorBody;
        }

        throw new MealieError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText,
          errorData,
        );
      }

      const text = await response.text();
      if (!text) return {} as T;

      return JSON.parse(text) as T;
    } catch (error) {
      if (error instanceof MealieError) throw error;
      if (error instanceof Error) {
        throw new MealieError(error.message);
      }
      throw new MealieError('Unknown error occurred');
    }
  }

  async authenticate(username: string, password: string): Promise<void> {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const url = `${this.baseUrl}/api/auth/token`;
    this.log(`POST ${url}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorBody);
        } catch {
          errorData = errorBody;
        }

        throw new MealieError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText,
          errorData,
        );
      }

      const text = await response.text();
      const authResponse = JSON.parse(text) as AuthToken;

      this.token = authResponse.access_token;
      this.log('Authentication successful');
    } catch (error) {
      if (error instanceof MealieError) throw error;
      if (error instanceof Error) {
        throw new MealieError(error.message);
      }
      throw new MealieError('Unknown error occurred');
    }
  }

  setToken(token: string): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = undefined;
  }

  // The actual API method implementation goes in specific services
  public get<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  public post<T>(path: string, body?: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public patch<T>(path: string, body?: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  public put<T>(path: string, body?: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public delete<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}
