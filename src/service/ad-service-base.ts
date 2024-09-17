// src/service/ad-service-base.ts
import { AdManagerService } from './admanager.service';
import { SoapClientHelper } from '../helper/soap-client.helper';

export abstract class AdServiceBase {
  constructor(protected readonly adManagerService: AdManagerService) {}

  protected get access_token(): string | null {
    return this.adManagerService.access_token;
  }

  protected get api_version(): string {
    return this.adManagerService.api_version;
  }

  protected get network_code(): string {
    return this.adManagerService.network_code;
  }

  protected get application_name(): string {
    return this.adManagerService.application_name;
  }

  // O método service_url será abstrato, forçando as subclasses a implementar a URL específica.
  protected abstract get service_url(): string;

  /**
   * Helper method to create and configure a SOAP client.
   */
  protected async createSoapClient(): Promise<any> {
    return await SoapClientHelper.createClientWithHeaders(
      this.service_url,
      this.api_version,
      this.network_code,
      this.application_name,
      this.access_token
    );
  }
}
