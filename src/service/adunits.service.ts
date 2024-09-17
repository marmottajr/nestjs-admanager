// src/service/adunits.service.ts
import { Injectable } from '@nestjs/common';
import { AdManagerService } from './admanager.service';
import * as soap from "soap"

/**
 * Service responsible for interacting with the Ad Manager API to manage ad units.
 * 
 * This service leverages the `AdManagerService` to retrieve configuration and authentication
 * details, and uses SOAP to communicate with the Google Ad Manager API.
 */
@Injectable()
export class AdUnitsService {
  /**
   * Constructs an instance of the AdUnitsService.
   * 
   * @param adManagerService - The service responsible for providing authentication
   * and configuration for the Google Ad Manager API.
   */
  constructor(private readonly adManagerService: AdManagerService) {}

  /**
   * Getter to retrieve the OAuth2 access token from the AdManagerService.
   * This token is used to authenticate requests to the Google Ad Manager API.
   * 
   * @returns The OAuth2 access token or null if not available.
   */
  private get access_token(): string | null {
    return this.adManagerService.access_token;
  }

  /**
   * Getter to construct the URL for the InventoryService WSDL endpoint.
   * This endpoint is used to interact with the inventory (Ad Units) API via SOAP.
   * 
   * @returns The full URL to the InventoryService WSDL.
   */
  private get service_url(): string {
    return `https://ads.google.com/apis/ads/publisher/${this.api_version}/InventoryService?wsdl`;
  }

  /**
   * Getter to retrieve the API version from the AdManagerService.
   * This is used to construct API requests with the correct version.
   * 
   * @returns The API version being used.
   */
  private get api_version(): string {
    return this.adManagerService.api_version;
  }

  /**
   * Getter to retrieve the Google Ad Manager network code from the AdManagerService.
   * This network code is required in most API requests to specify the account being used.
   * 
   * @returns The Google Ad Manager network code.
   */
  private get network_code(): string {
    return this.adManagerService.network_code;
  }

  /**
   * Getter to retrieve the application name from the AdManagerService.
   * This name is used in requests to identify the application interacting with the API.
   * 
   * @returns The name of the application using the Google Ad Manager API.
   */
  private get application_name(): string {
    return this.adManagerService.application_name;
  }

  /**
   * Fetches a list of Ad Units from the Google Ad Manager API.
   * 
   * This method creates a SOAP client, adds the necessary authentication headers,
   * and sends a request to the InventoryService to retrieve the Ad Units.
   * 
   * @returns A promise that resolves to an array of Ad Units.
   * @throws Throws an error if the request to the API fails.
   */
  async getAdUnits(): Promise<any[]> {
    // Create a SOAP client using the WSDL endpoint for the InventoryService.
    const client = await soap.createClientAsync(this.service_url);
    
    // Define the SOAP header with the network code and application name.
    const soapHeader = {
      RequestHeader: {
        attributes: {
          'xsi:type': 'RequestHeader',
          'xmlns': `https://www.google.com/apis/ads/publisher/${this.api_version}` // Specify the namespace with the API version.
        },
        networkCode: this.network_code, // Google Ad Manager network code.
        applicationName: this.application_name, // Application name interacting with the API.
      }
    };
    
    // Add the SOAP header to the client.
    client.addSoapHeader(soapHeader);
    
    // Add the Authorization header to the HTTP request using the OAuth2 access token.
    client.addHttpHeader('Authorization', `Bearer ${this.access_token}`);
  
    // Define the request payload with a filter statement to limit the results.
    const request = {
      filterStatement: {
        query: 'LIMIT 10' // Retrieve up to 10 Ad Units.
      }
    };
  
    try {
      // Send the request to the API and await the response.
      const result = await client.getAdUnitsByStatementAsync(request);
      // Return the list of Ad Units from the API response.
      return result[0].rval.results;
    } catch (error) {
      // Log the error if the request fails.
      console.error('Error fetching AdUnits:', error);
      // Throw the error so it can be handled by the caller.
      throw error;
    }
  }
}
