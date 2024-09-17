// src/service/gam/admanager.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AdManagerService {
  private token: string | null;
  private oAuth2Client: OAuth2Client;

  constructor(@Inject('AD_MANAGER_OPTIONS') private options: { token: string | null, oAuth2Client: OAuth2Client }) {
    this.token = options.token;
    this.oAuth2Client = options.oAuth2Client;
  }

  async getAccessToken() {
    if (!this.token) {
      const tokenResponse = await this.oAuth2Client.getAccessToken();
      this.token = tokenResponse.token;
    }
    return this.token;
  }
  
  private async authenticate(): Promise<void> {
    this.token = this.oAuth2Client.credentials.access_token!;
  }

  public async generateAuthUrl(): Promise<string> {
    const authorizeUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/admanager',
    });

    return authorizeUrl;

  }

}
