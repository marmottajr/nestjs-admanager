// src/service/adunits.service.ts
import { Injectable } from '@nestjs/common';
import { AdManagerService } from './admanager.service';
import { AdServiceBase } from './ad-service-base';

@Injectable()
export class AdUnitsService extends AdServiceBase {
  constructor(protected readonly adManagerService: AdManagerService) {
    super(adManagerService);
  }

  // Implementação específica do service_url para AdUnits
  protected get service_url(): string {
    return `https://ads.google.com/apis/ads/publisher/${this.api_version}/InventoryService?wsdl`;
  }

  /**
   * Fetches a list of Ad Units from the Google Ad Manager API.
   */
  async getAdUnits(): Promise<any[]> {
    try {
      const client = await this.createSoapClient();

      const request = {
        filterStatement: {
          query: ''
        }
      };

      const result = await client.getAdUnitsByStatementAsync(request);
      return result[0].rval.results;
    } catch (error) {
      console.error('Error fetching AdUnits:', error);
      throw error;
    }
  }

  /**
   * Fetches a list of Ad Unit Sizes from the Google Ad Manager API.
   */
  async getAdUnitSizes(): Promise<any[]> {
    try {
      const client = await this.createSoapClient();

      const request = {
        filterStatement: {
          query: `LIMIT 10`
        }
      };

      const result = await client.getAdUnitSizesByStatementAsync(request);
      return result[0].rval;
    } catch (error) {
      console.error('Error fetching AdUnitSizes:', error);
      throw error;
    }
  }
}
