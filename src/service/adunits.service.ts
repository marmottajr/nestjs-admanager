// src/service/adunits.service.ts
import { Injectable } from '@nestjs/common';
import { AdManagerService } from './admanager.service';
import { AdServiceBase } from './ad-service-base';
import { AdUnit } from '../types/inventory/AdUnit';

/**
 * Service responsible for managing Ad Units and Ad Unit Sizes via the Google Ad Manager API.
 * 
 * This service extends `AdServiceBase` to reuse the common functionality for creating SOAP clients
 * and adds specific methods for interacting with the Ad Unit-related API endpoints.
 */
@Injectable()
export class AdUnitsService extends AdServiceBase {
  /**
   * Constructs an instance of the AdUnitsService.
   * 
   * @param adManagerService - The service responsible for providing configuration and authentication
   * details for interacting with the Google Ad Manager API.
   */
  constructor(protected readonly adManagerService: AdManagerService) {
    super(adManagerService); // Calls the constructor of the base class (AdServiceBase).
  }

  /**
   * Overrides the `service_url` getter to return the specific WSDL URL for the InventoryService.
   * 
   * This URL is used to interact with the Ad Units and Inventory-related services via SOAP.
   * 
   * @returns The full WSDL URL for the InventoryService.
   */
  protected get service_url(): string {
    return `https://ads.google.com/apis/ads/publisher/${this.api_version}/InventoryService?wsdl`;
  }

  /**
   * Fetches a list of Ad Units from the Google Ad Manager API.
   * 
   * This method sends a SOAP request to retrieve Ad Units by applying a filter statement.
   * 
   * @returns A promise that resolves to an array of Ad Units.
   * @throws Throws an error if the API request fails.
   */
  async getAdUnits(): Promise<AdUnit[]> {
    try {
      // Create the SOAP client using the service URL.
      const client = await this.createSoapClient();

      // Define the request payload, in this case, without any specific filtering.
      const request = {
        filterStatement: {
          query: 'LIMIT 10' // Fetch all Ad Units without a specific filter.
        }
      };

      // Send the request and await the response from the API.
      const result = await client.getAdUnitsByStatementAsync(request);

      // Return the results, which contain the list of Ad Units.
      return result[0].rval.results as AdUnit[];
    } catch (error) {
      // Log the error and rethrow it for further handling.
      throw error;
    }
  }

  /**
   * Fetches a list of Ad Unit Sizes from the Google Ad Manager API.
   * 
   * This method sends a SOAP request to retrieve Ad Unit sizes by applying a filter statement.
   * 
   * @returns A promise that resolves to an array of Ad Unit Sizes.
   * @throws Throws an error if the API request fails.
   */
  async getAdUnitSizes(): Promise<any[]> {
    try {
      // Create the SOAP client using the service URL.
      const client = await this.createSoapClient();

      // Define the request payload to limit the results to 10 Ad Unit Sizes.
      const request = {
        filterStatement: {
          query: `` // Limit the response to 10 Ad Unit sizes.
        }
      };

      // Send the request and await the response from the API.
      const result = await client.getAdUnitSizesByStatementAsync(request);

      // Return the results, which contain the list of Ad Unit Sizes.
      return result[0].rval;
    } catch (error) {
      // Log the error and rethrow it for further handling.
      throw error;
    }
  }
}
