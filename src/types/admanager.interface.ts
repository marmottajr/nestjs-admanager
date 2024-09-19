// src/interface/admanager.interface.ts

import { OAuth2Client } from 'google-auth-library';

/**
 * Type representing the structure of the OAuth2 credentials for the AdManager API.
 * This type is used to store and pass the required OAuth2 credentials for the Google API.
 */
export type AdManagerKeys = {
  web: {
    client_id: string;  // The client ID from Google OAuth2 credentials.
    client_secret: string;  // The client secret from Google OAuth2 credentials.
    project_id: string;  // The Google Cloud project ID.
    auth_uri: string;  // The URI for user authentication.
    token_uri: string;  // The URI for obtaining access tokens.
    auth_provider_x509_cert_url: string;  // The URL for the OAuth2 provider's certificates.
    redirect_uris: string[];  // List of redirect URIs used in the OAuth2 flow.
  };
};

/**
 * Type representing the options needed to configure the AdManagerModule.
 * This includes network code, application name, API version, and OAuth2 credentials.
 */
export type AdManagerModuleOptions = {
  application_name: string;  // The name of the application using the API.
  keys: AdManagerKeys;  // OAuth2 credentials required for authentication.
  api_version?: string;  // Optional: The version of the API to use (defaults to latest).
  network_code?: string;  // The Google Ad Manager network code.
  service_url?: string;  // Optional: Custom service URL for the AdManager API.
};

/**
 * Type representing the options provided to the AdManagerService after processing.
 * This includes the network code, application name, API version, and an OAuth2 client.
 */
export type AdManagerServiceOptions = {
  network_code: string;  // The Google Ad Manager network code.
  application_name: string;  // The name of the application.
  api_version?: string;  // Optional: The version of the API being used.
  oAuth2Client: OAuth2Client;  // The OAuth2 client instance used for authentication.
};
