// src/interface/admanager.interface.ts

import { OAuth2Client } from "google-auth-library";

export type AdManagerKeys = {
  web: {
    client_id: string;
    client_secret: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    redirect_uris: string[];
  };
};

export type AdManagerModuleOptions = {
  network_code: string;
  application_name: string;
  keys: AdManagerKeys;
  api_version?: string;
  service_url?: string;
};

export type AdManagerServiceOptions = {
  network_code: string;
  application_name: string;
  api_version?: string;
  oAuth2Client: OAuth2Client;
};