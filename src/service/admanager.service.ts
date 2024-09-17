// src/service/admanager.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdUnitsService } from './adunits.service';
import { OAuth2Client } from 'google-auth-library';
import { AdManagerServiceOptions } from '@app/interface/admanager.interface';

@Injectable()
export class AdManagerService {
  public access_token: string | null;
  public oAuth2Client: OAuth2Client;
  public auth: AuthService;
  public adUnits: AdUnitsService;
  public network_code: string;
  public application_name: string | null;
  public api_version: string | null;

  constructor(
    @Inject('AD_MANAGER_OPTIONS') private options: AdManagerServiceOptions,
  ) {
    this.network_code = options.network_code;
    this.application_name = options.application_name;
    this.api_version = options.api_version ?? 'v202405';
    this.oAuth2Client = options.oAuth2Client;

    this.auth = new AuthService(this);
    this.adUnits = new AdUnitsService(this);
  }
}
