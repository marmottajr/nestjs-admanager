// src/interface/admanager.interface.ts

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
  keys: AdManagerKeys;
};