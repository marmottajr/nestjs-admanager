// src/service/adunits.service.ts

import { Injectable } from '@nestjs/common';
import { AdManagerService } from './admanager.service';
import { AdServiceBase } from './ad-service-base';
import { Network } from '../types/network/Network';

/**
 * Service responsible for interacting with the Google Ad Manager's NetworkService API.
 * 
 * This service inherits from `AdServiceBase` and provides functionality to retrieve 
 * networks from the Google Ad Manager API using SOAP.
 */
@Injectable()
export class NetworkService extends AdServiceBase {
  /**
   * Constructs an instance of the NetworkService.
   * 
   * @param adManagerService - The AdManagerService instance used for authentication and API requests.
   */
  constructor(protected readonly adManagerService: AdManagerService) {
    super(adManagerService); // Calls the constructor of the base class (AdServiceBase).
  }

  /**
   * Property that returns the full URL of the NetworkService WSDL endpoint.
   * 
   * The URL is dynamically built using the API version from the base class.
   * 
   * @protected
   * @returns The WSDL URL for NetworkService.
   */
  protected get service_url(): string {
    return `https://ads.google.com/apis/ads/publisher/${this.api_version}/NetworkService?wsdl`;
  }

  /**
   * Private method to fetch all networks using a SOAP client asynchronously.
   * 
   * This method wraps the SOAP client's `getAllNetworks` method in a Promise.
   * 
   * @param client - The SOAP client used to interact with the NetworkService API.
   * @private
   * @returns A promise that resolves to an array of `Network` objects.
   */
  private getAllNetworksAsync(client): Promise<Network[]> {
    return new Promise((resolve, reject) => {
      client.getAllNetworks((error: any, networks: any) => {
        if (error) {
          reject(error); // Rejects the Promise if an error occurs during the API call.
        } else {
          if (!networks.rval) {
            reject(new Error('No networks found')); // If no networks are returned, rejects with an error.
          }
          resolve(networks.rval); // Resolves the Promise with the array of networks.
        }
      });
    });
  }

  /**
   * Public method to retrieve all networks from the Google Ad Manager API.
   * 
   * This method creates a SOAP client using the service URL, and calls `getAllNetworksAsync` 
   * to fetch the network data.
   * 
   * @async
   * @returns A promise that resolves to an array of `Network` objects.
   * @throws Will throw an error if there is an issue with the SOAP client or network retrieval.
   */
  async getAllNetworks(): Promise<Network[]> {
    try {
      // Create the SOAP client using the service URL.
      const client = await this.createSoapClient();

      // Fetch all networks using the async helper method.
      const result = await this.getAllNetworksAsync(client);

      return result;
    } catch (error) {
      console.error('Error fetching Networks:', error); // Logs the error if any.
      throw error; // Re-throws the error to be handled by the calling code.
    }
  }
}
