// src/module/gam/admanager.module.ts

import { DynamicModule, Module } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AdManagerService } from './admanager.service';
import { AdManagerKeys } from './interface/admanager.interface';

export * from './admanager.service';

@Module({})
export class AdManagerModule {
  static forRoot(options: AdManagerKeys): DynamicModule {
    const { client_id, client_secret, redirect_uris } = options.web;

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
    useFactory: (...args: any[]) => Promise<AdManagerKeys>;
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
            const keys = await options.useFactory(...args);
            const { client_id, client_secret, redirect_uris } = keys.web;

            const oAuth2Client = new OAuth2Client(
              client_id,
              client_secret,
              redirect_uris[0],
            );

            return {
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
