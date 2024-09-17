// src/service/adunits.service.ts
import { Injectable } from '@nestjs/common';
import { AdManagerService } from './admanager.service';
import * as soap from "soap"

@Injectable()
export class AdUnitsService {
  constructor(private readonly adManagerService: AdManagerService) {}

  private get access_token(): string | null {
    return this.adManagerService.access_token;
  }
  private get service_url(): string {
    return `https://ads.google.com/apis/ads/publisher/${this.api_version}/InventoryService?wsdl`;
  }
  private get api_version(): string {
    return this.adManagerService.api_version;
  }
  private get network_code(): string {
    return this.adManagerService.network_code;
  }
  private get application_name(): string {
    return this.adManagerService.application_name;
  }

  async getAdUnits(): Promise<any[]> {
    const client = await soap.createClientAsync(this.service_url);
    
    const soapHeader = {
      RequestHeader: {
        attributes: {
          'xsi:type': 'RequestHeader',
          'xmlns': `https://www.google.com/apis/ads/publisher/${this.api_version}`
        },
        networkCode: this.network_code,
        applicationName: this.application_name,
      }
    };
    client.addSoapHeader(soapHeader);
    
    client.addHttpHeader('Authorization', `Bearer ${this.access_token}`);
  
    const request = {
      filterStatement: {
        query: 'LIMIT 10'
      }
    };
  
    try {
      const result = await client.getAdUnitsByStatementAsync(request);
      return result[0].rval.results;
    } catch (error) {
      console.error('Error fetching AdUnits:', error);
      throw error;
    }
  }
}
