// src/service/auth.service.ts
import { Injectable } from '@nestjs/common';
import { OAuth2Client, Credentials } from 'google-auth-library';
import { AdManagerService } from './admanager.service';

/**
 * Service responsible for handling authentication with Google OAuth2.
 * 
 * This service uses the OAuth2 client from `AdManagerService` to generate authentication URLs,
 * obtain access tokens, and manage authentication flows for the Google Ad Manager API.
 */
@Injectable()
export class AuthService {
  /**
   * Constructs an instance of the AuthService.
   * 
   * @param adManagerService - The service responsible for providing the OAuth2 client
   * and managing access tokens for the Google Ad Manager API.
   */
  constructor(private readonly adManagerService: AdManagerService) {}

  /**
   * Getter to retrieve the OAuth2Client instance from the AdManagerService.
   * This client is used to interact with Google OAuth2 endpoints for authentication.
   * 
   * @returns The OAuth2Client instance.
   */
  private get oAuth2Client(): OAuth2Client {
    return this.adManagerService.oAuth2Client;
  }

  /**
   * Retrieves the current access token. If no access token is available, 
   * it requests a new one from the OAuth2 client and sets it in the AdManagerService.
   * 
   * @returns A promise that resolves to the access token or null if not available.
   */
  async getAccessToken(): Promise<string | null> {
    // If there's no access token, request one from the OAuth2 client.
    if (!this.adManagerService.access_token) {
      const tokenResponse = await this.oAuth2Client.getAccessToken();
      // Store the retrieved access token in AdManagerService.
      this.adManagerService.access_token = tokenResponse.token;
    }
    // Return the access token.
    return this.adManagerService.access_token;
  }

  /**
   * Exchanges an authorization code for OAuth2 credentials (tokens).
   * Once the tokens are retrieved, they are set in the OAuth2 client and the access token is stored.
   * 
   * @param code - The authorization code obtained from the OAuth2 authorization flow.
   * @returns A promise that resolves to the OAuth2 credentials (including the access token).
   */
  async getToken(code: string): Promise<Credentials> {
    // Exchange the authorization code for OAuth2 tokens.
    const tokenResponse = await this.oAuth2Client.getToken(code);
    // Set the retrieved credentials (tokens) into the OAuth2 client.
    this.oAuth2Client.setCredentials(tokenResponse.tokens);
    
    // If an access token is present in the tokens, authenticate the service with it.
    if (tokenResponse.tokens.access_token) {
      await this.authenticate(tokenResponse.tokens.access_token);
    }
    
    // Return the OAuth2 credentials.
    return tokenResponse.tokens;
  }

  /**
   * Generates an authorization URL that the user can visit to authorize the application.
   * This URL redirects to a Google page where the user can consent to provide access.
   * 
   * @returns A promise that resolves to the generated OAuth2 authorization URL.
   */
  async generateAuthUrl(): Promise<string> {
    // Generate and return the URL for user authorization.
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline', // Ensures that a refresh token is returned.
      scope: 'https://www.googleapis.com/auth/admanager', // Specifies the scope for Ad Manager.
    });
  }

  /**
   * Authenticates the service by setting the provided access token.
   * This method updates the access token in the AdManagerService for future requests.
   * 
   * @param access_token - The OAuth2 access token to be used for authenticating API requests.
   */
  async authenticate(access_token: string): Promise<void> {
    // Set the access token in the AdManagerService.
    this.adManagerService.access_token = access_token;
  }
}
