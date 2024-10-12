// src/service/ad-service-base.ts
import { AdManagerService } from './admanager.service';
import { SoapClientHelper } from '../helper/soap-client.helper';

/**
 * Base class for services that interact with the Google Ad Manager API.
 * 
 * This class provides common functionality, such as accessing API version, network code,
 * and OAuth2 token, as well as a utility for creating SOAP clients. Subclasses must define
 * the `service_url` method to specify the WSDL endpoint relevant to the service.
 */
export abstract class AdServiceBase {
  /**
   * Constructs an instance of the AdServiceBase.
   * 
   * @param adManagerService - The service responsible for providing configuration 
   * and authentication details for interacting with the Google Ad Manager API.
   */
  constructor(protected readonly adManagerService: AdManagerService) {}

  /**
   * Getter to retrieve the OAuth2 access token from the AdManagerService.
   * This token is required for authenticating API requests.
   * 
   * @returns The OAuth2 access token or null if not available.
   */
  protected get access_token(): string | null {
    return this.adManagerService.access_token;
  }

  /**
   * Getter to retrieve the API version from the AdManagerService.
   * This is used to ensure requests are made to the correct version of the API.
   * 
   * @returns The version of the API being used.
   */
  protected get api_version(): string {
    return this.adManagerService.api_version;
  }

  /**
   * Getter to retrieve the Google Ad Manager network code from the AdManagerService.
   * This network code is required for API requests to target the correct account.
   * 
   * @returns The network code for the Google Ad Manager account.
   */
  protected get network_code(): string {
    return this.adManagerService.network_code;
  }

  /**
   * Getter to retrieve the application name from the AdManagerService.
   * The application name is used in API requests to identify the client making the request.
   * 
   * @returns The name of the application using the Google Ad Manager API.
   */
  protected get application_name(): string {
    return this.adManagerService.application_name;
  }

  /**
   * Abstract getter that must be implemented by subclasses to provide the specific WSDL service URL.
   * Each subclass represents a different service in the Google Ad Manager API (e.g., InventoryService).
   * 
   * @returns The WSDL URL for the specific Google Ad Manager service.
   */
  protected abstract get service_url(): string;

  /**
   * Helper method to create and configure a SOAP client.
   * 
   * This method uses the `SoapClientHelper` to create a SOAP client with the necessary headers
   * for authenticating requests (e.g., OAuth2 token, network code, and application name).
   * 
   * @returns A promise that resolves to a SOAP client ready for API interactions.
   */
  protected async createSoapClient(): Promise<any> {
    return await SoapClientHelper.createClientWithHeaders(
      this.service_url,        // URL of the specific WSDL service.
      this.api_version,        // Version of the Google Ad Manager API.
      this.application_name,   // Name of the application making the request.
      this.access_token,       // OAuth2 access token for authorization.
      this.network_code,       // Network code of the Google Ad Manager account.
    );
  }
}
