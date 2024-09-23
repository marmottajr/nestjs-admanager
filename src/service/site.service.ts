// src/service/adunits.service.ts

import { Injectable } from '@nestjs/common';
import { AdManagerService } from './admanager.service';
import { AdServiceBase } from './ad-service-base';
import { Site } from '../types/site/Site';
@Injectable()
export class SiteService extends AdServiceBase {
  constructor(protected readonly adManagerService: AdManagerService) {
    super(adManagerService); // Calls the constructor of the base class (AdServiceBase).
  }
  protected get service_url(): string {
    return `https://ads.google.com/apis/ads/publisher/${this.api_version}/SiteService?wsdl`;
  }
  async getAllSites(): Promise<Site[]> {
    try {
      const client = await this.createSoapClient();

      const request = {
        filterStatement: {
          query: `WHERE approvalStatus = 'APPROVED'`,
        }
      };

      const result = await client.getSitesByStatementAsync(request);

      return  result[0].rval.results as Site[];
    } catch (error) {
      throw error;
    }
  }
}
