# Nestjs-AdManager

## Google Ad Manager API Client Library for NestJs

[![npm nestjs-admanager](https://img.shields.io/npm/l/nestjs-admanager)](https://www.npmjs.com/package/nestjs-admanager)

## Description

`nestjs-admanager` is an npm package that facilitates the integration of NestJS projects with the Google Ad Manager API. It provides a simplified interface for authentication, ad unit management, and other functionalities available in the API, allowing you to build robust applications quickly and efficiently.

## Installation

You can install the package using npm:

```bash
npm install nestjs-admanager
```

Or using yarn:

```bash
yarn add nestjs-admanager
```

## Configuration

Before using `nestjs-admanager`, you need to configure access credentials for the Google Ad Manager API.

### Synchronous Configuration with `forRoot`

If you have the credentials available at initialization, you can configure the module synchronously:

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { AdManagerModule } from 'nestjs-admanager';

@Module({
  imports: [
    AdManagerModule.forRoot({
      web: {
        client_id: 'YOUR_CLIENT_ID',
        client_secret: 'YOUR_CLIENT_SECRET',
        redirect_uris: ['YOUR_REDIRECT_URI'],
      },
    }),
  ],
})
export class AppModule {}
```

### Asynchronous Configuration with `forRootAsync`

If you need to load the credentials asynchronously, use the `forRootAsync` method:

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { AdManagerModule } from 'nestjs-admanager';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdManagerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          web: {
            client_id: configService.get<string>('CLIENT_ID'),
            client_secret: configService.get<string>('CLIENT_SECRET'),
            redirect_uris: [configService.get<string>('REDIRECT_URI')],
          },
        };
      },
    }),
  ],
})
export class AppModule {}
```

## Usage

After configuring the module, you can inject the `AdManagerService` into your services or controllers.

### Authentication

```typescript
// auth.service.ts

import { Injectable } from '@nestjs/common';
import { AdManagerService } from 'nestjs-admanager';

@Injectable()
export class AuthService {
  constructor(private readonly adManagerService: AdManagerService) {}

  getAuthUrl(): string {
    return this.adManagerService.generateAuthUrl();
  }

  async authenticate(code: string): Promise<void> {
    const token = await this.adManagerService.getToken(code);
    // Save the token for future use
  }
}
```

### Ad Unit Management

```typescript
// adunit.service.ts

import { Injectable } from '@nestjs/common';
import { AdManagerService } from 'nestjs-admanager';

@Injectable()
export class AdUnitService {
  constructor(private readonly adManagerService: AdManagerService) {}

  async getAdUnits(): Promise<any> {
    return await this.adManagerService.getAdUnits();
  }
}
```

## License

This project is licensed under the **GNU General Public License v3.0 or later**. See the [LICENSE](./LICENSE) file for details.

## Author

- **Márcio Motta** - [Marmottajr](https://github.com/marmottajr)

## References

- [Google Ad Manager API Documentation](https://developers.google.com/ad-manager/api)
- [NestJS Documentation](https://docs.nestjs.com/)

## Acknowledgments

We would like to thank everyone who contributed to this project and the open-source community for their continued support.

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Google or any of its subsidiaries or affiliates. The names Google and Google Ad Manager, as well as related names, trademarks, and images, are registered trademarks of their respective owners.
