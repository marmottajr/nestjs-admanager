// src/service/auth.service.ts
import { Injectable } from '@nestjs/common';
import { OAuth2Client, Credentials } from 'google-auth-library';
import { AdManagerService } from './admanager.service';

@Injectable()
export class AuthService {
  constructor(private readonly adManagerService: AdManagerService) {}

  private get oAuth2Client(): OAuth2Client {
    return this.adManagerService.oAuth2Client;
  }

  async getAccessToken(): Promise<string | null> {
    if (!this.adManagerService.access_token) {
      const tokenResponse = await this.oAuth2Client.getAccessToken();
      this.adManagerService.access_token = tokenResponse.token;
    }
    return this.adManagerService.access_token;
  }

  async getToken(code: string): Promise<Credentials> {
    const tokenResponse = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokenResponse.tokens);
    if(tokenResponse.tokens.access_token){
      await this.authenticate(tokenResponse.tokens.access_token);
    }
    return tokenResponse.tokens;
  }

  async generateAuthUrl(): Promise<string> {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/admanager',
    });
  }

  async authenticate(access_token: string): Promise<void> {
    this.adManagerService.access_token = access_token;
  }
}
