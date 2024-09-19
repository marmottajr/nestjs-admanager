// src/service/admanager.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdUnitsService } from './adunits.service';
import { OAuth2Client } from 'google-auth-library';
import { AdManagerServiceOptions } from '../types/admanager.interface';
import { NetworkService } from './network.service';

/**
 * Service responsible for managing Google Ad Manager integrations.
 * 
 * This service provides functionalities for authenticating and interacting 
 * with the Google Ad Manager API using OAuth2 and manages ad units and other
 * ad-related features.
 */
@Injectable()
export class AdManagerService {
  /**
   * Access token used for authenticating API requests.
   * @public
   */
  public access_token: string | null;

  /**
   * OAuth2Client instance to handle authentication with Google APIs.
   * @public
   */
  public oAuth2Client: OAuth2Client;

  /**
   * Service to handle authentication mechanisms.
   * @public
   */
  public auth: AuthService;

  /**
   * Service to manage ad units.
   * @public
   */
  public adUnits: AdUnitsService;

  /**
   * Service to manage network.
   * @public
   */
  public network: NetworkService;

  /**
   * The Google Ad Manager network code.
   * @public
   */
  public network_code: string;

  /**
   * Name of the application using the Google Ad Manager API.
   * @public
   */
  public application_name: string | null;

  /**
   * Version of the Google Ad Manager API being used. Defaults to v202405.
   * @public
   */
  public api_version: string | null;

  /**
   * Constructs an instance of the AdManagerService.
   * 
   * @param options - Configuration options for the Ad Manager service.
   * @param options.network_code - The Google Ad Manager network code.
   * @param options.application_name - The name of the application.
   * @param options.api_version - (Optional) The version of the API. Defaults to 'v202405'.
   * @param options.oAuth2Client - OAuth2 client instance used for authentication.
   */
  constructor(
    @Inject('AD_MANAGER_OPTIONS') private options: AdManagerServiceOptions,
  ) {
    this.network_code = options.network_code;
    this.application_name = options.application_name;
    this.api_version = options.api_version ?? 'v202405';
    this.oAuth2Client = options.oAuth2Client;

    // Initialize auth and adUnits services
    this.auth = new AuthService(this);
    this.adUnits = new AdUnitsService(this);
    this.network = new NetworkService(this);
  }
}
