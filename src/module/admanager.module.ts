// src/module/admanager.module.ts

import { DynamicModule, Module } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AdManagerService } from '../service/admanager.service';
import { AdManagerModuleOptions } from '../interface/admanager.interface';

export * from '../service/admanager.service';

/**
 * Module responsible for configuring and providing the AdManagerService.
 * This module provides two static methods, `forRoot` and `forRootAsync`, 
 * to allow synchronous or asynchronous initialization of the service 
 * with options such as OAuth2 credentials.
 */
@Module({})
export class AdManagerModule {
  
  /**
   * Synchronously configures the AdManagerModule with static options.
   * 
   * @param options - The configuration options for the Ad Manager module, including OAuth2 credentials.
   * @returns A DynamicModule configured with the provided options and services.
   */
  static forRoot(options: AdManagerModuleOptions): DynamicModule {
    // Destructure OAuth2 credentials from the provided options.
    const { client_id, client_secret, redirect_uris } = options.keys.web;

    // Create an OAuth2Client instance using the credentials.
    const oAuth2Client = new OAuth2Client(
      client_id,
      client_secret,
      redirect_uris[0],  // Use the first redirect URI.
    );

    return {
      module: AdManagerModule, // Define the module being exported.
      global: true, // Makes the module global so it can be injected in any part of the application.
      providers: [
        {
          // Provide configuration options for AdManagerService.
          provide: 'AD_MANAGER_OPTIONS',
          useValue: {
            network_code: options.network_code,
            application_name: options.application_name,
            api_version: options.api_version,
            oAuth2Client, // Inject the configured OAuth2 client.
          },
        },
        // Provide the AdManagerService which depends on the options.
        AdManagerService,
      ],
      // Export both the options and the AdManagerService for external use.
      exports: ['AD_MANAGER_OPTIONS', AdManagerService],
    };
  }

  /**
   * Asynchronously configures the AdManagerModule, allowing for options to be loaded dynamically.
   * 
   * @param options - Object containing the imports, injects, and a useFactory method to fetch options.
   * @returns A DynamicModule configured with the options returned by the factory function.
   */
  static forRootAsync(options: {
    imports: any[]; // External modules to import, if any.
    inject: any[]; // Dependencies to inject into the useFactory function.
    useFactory: (...args: any[]) => Promise<AdManagerModuleOptions>; // Factory function to asynchronously load options.
  }): DynamicModule {
    return {
      module: AdManagerModule, // Define the module being exported.
      global: true, // Makes the module global.
      imports: options.imports, // Import any necessary modules.
      providers: [
        {
          // Asynchronously provide configuration options for AdManagerService using the factory function.
          provide: 'AD_MANAGER_OPTIONS',
          inject: options.inject, // Inject dependencies into the factory function.
          useFactory: async (...args: any[]) => {
            // Await the options generated by the factory function.
            const optionsFactory = await options.useFactory(...args);
            const { client_id, client_secret, redirect_uris } = optionsFactory.keys.web;

            // Create an OAuth2Client instance using the dynamically loaded credentials.
            const oAuth2Client = new OAuth2Client(
              client_id,
              client_secret,
              redirect_uris[0], // Use the first redirect URI.
            );

            return {
              network_code: optionsFactory.network_code,
              application_name: optionsFactory.application_name,
              api_version: optionsFactory.api_version,
              oAuth2Client, // Return the configured OAuth2 client.
            };
          },
        },
        // Provide the AdManagerService which depends on the options.
        AdManagerService,
      ],
      // Export both the dynamically loaded options and the AdManagerService.
      exports: ['AD_MANAGER_OPTIONS', AdManagerService],
    };
  }
}
