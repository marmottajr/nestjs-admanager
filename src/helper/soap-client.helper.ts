// src/helper/soap-client.helper.ts
import * as soap from "soap";

export class SoapClientHelper {
  static async createClientWithHeaders(serviceUrl: string, apiVersion: string, networkCode: string, applicationName: string, accessToken: string): Promise<any> {
    const client = await soap.createClientAsync(serviceUrl);

    const soapHeader = {
      RequestHeader: {
        attributes: {
          'xsi:type': 'RequestHeader',
          'xmlns': `https://www.google.com/apis/ads/publisher/${apiVersion}`
        },
        networkCode: networkCode,
        applicationName: applicationName
      }
    };

    client.addSoapHeader(soapHeader);
    client.addHttpHeader('Authorization', `Bearer ${accessToken}`);

    return client;
  }
}
