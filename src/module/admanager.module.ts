// src/module/admanager.module.ts

import { DynamicModule, Module } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AdManagerService } from '../service/admanager.service';
import { AdManagerModuleOptions } from '../interface/admanager.interface';

export * from '../service/admanager.service';

@Module({})
export class AdManagerModule {
  static forRoot(options: AdManagerModuleOptions): DynamicModule {
    const { client_id, client_secret, redirect_uris } = options.keys.web;

    // Cria o OAuth2Client usando as credenciais fornecidas
    const oAuth2Client = new OAuth2Client(
      client_id,
      client_secret,
      redirect_uris[0], // Primeiro redirect_uri da lista
    );

    return {
      module: AdManagerModule,
      global: true, // Torna o módulo global
      providers: [
        {
          provide: 'AD_MANAGER_OPTIONS',
          useValue: {
            network_code: options.network_code,
            application_name: options.application_name,
            api_version: options.api_version,
            oAuth2Client,
          },
        },
        AdManagerService,
      ],
      exports: ['AD_MANAGER_OPTIONS', AdManagerService],
    };
  }

  static forRootAsync(options: {
    imports: any[];
    inject: any[];
    useFactory: (...args: any[]) => Promise<AdManagerModuleOptions>;
  }): DynamicModule {
    return {
      module: AdManagerModule,
      global: true, // Torna o módulo global
      imports: options.imports, // Importa módulos externos
      providers: [
        {
          provide: 'AD_MANAGER_OPTIONS',
          inject: options.inject,
          useFactory: async (...args: any[]) => {
            const optionsFactory = await options.useFactory(...args);
            const { client_id, client_secret, redirect_uris } = optionsFactory.keys.web;

            const oAuth2Client = new OAuth2Client(
              client_id,
              client_secret,
              redirect_uris[0],
            );

            return {
              network_code: optionsFactory.network_code,
              application_name: optionsFactory.application_name,
              api_version: optionsFactory.api_version,
              oAuth2Client,
            };
          },
        },
        AdManagerService,
      ],
      exports: ['AD_MANAGER_OPTIONS', AdManagerService],
    };
  }
}
