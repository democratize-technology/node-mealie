import { MealieClient } from '../client.js';
import type { AuthToken } from '../types/index.js';
import { MealieError } from '../types/index.js';

export interface OAuthInitResponse {
  redirectUrl: string;
}

export interface OAuthCallbackParams {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
}

export interface TokenRefreshResponse extends AuthToken {
  refresh_token?: string;
}

export interface LogoutResponse {
  success: boolean;
}

export class AuthService extends MealieClient {
  /**
   * Authenticate with username and password
   * This is the same as client.authenticate() but moved here for consistency
   */
  async login(username: string, password: string): Promise<AuthToken> {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const url = '/api/auth/token';

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
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

      this.setToken(authResponse.access_token);
      return authResponse;
    } catch (error) {
      if (error instanceof MealieError) throw error;
      if (error instanceof Error) {
        throw new MealieError(error.message);
      }
      throw new MealieError('Unknown error occurred');
    }
  }

  /**
   * Initiate OAuth login flow
   * Returns the URL to redirect the user to for OAuth authentication
   */
  async oauthLogin(): Promise<OAuthInitResponse> {
    const response = await this.get<any>('/api/auth/oauth');

    // The API might return a redirect URL or handle the redirect automatically
    // We need to check the actual response structure
    if (typeof response === 'string') {
      return { redirectUrl: response };
    }

    return response as OAuthInitResponse;
  }

  /**
   * Handle OAuth callback
   * This endpoint processes the OAuth callback parameters
   */
  async oauthCallback(params: OAuthCallbackParams): Promise<AuthToken> {
    const queryParams = new URLSearchParams();
    if (params.code) queryParams.append('code', params.code);
    if (params.state) queryParams.append('state', params.state);
    if (params.error) queryParams.append('error', params.error);
    if (params.error_description) queryParams.append('error_description', params.error_description);

    const url = `/api/auth/oauth/callback?${queryParams.toString()}`;
    const response = await this.get<AuthToken>(url);

    if (response.access_token) {
      this.setToken(response.access_token);
    }

    return response;
  }

  /**
   * Refresh the authentication token
   */
  async refreshToken(): Promise<TokenRefreshResponse> {
    const response = await this.get<TokenRefreshResponse>('/api/auth/refresh');

    if (response.access_token) {
      this.setToken(response.access_token);
    }

    return response;
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<LogoutResponse> {
    const response = await this.post<LogoutResponse>('/api/auth/logout');
    this.clearToken();
    return response;
  }
}
