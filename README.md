<p align="center">
  <a href="https://developers.google.com/ad-manager/api/start" target="blank"><img src="https://developers.google.com/ads/images/logo_admanager_192px.svg" width="120" alt="Ad Manager Logo" /></a>
</p>

  <p align="center"><a href="https://developers.google.com/ad-manager/api/start" target="_blank">Google Ad Manager API</a> Client Library for NestJs.</p>
    <p align="center">
    <img alt="NPM License" src="https://img.shields.io/npm/l/nestjs-admanager">
</p>

**Client Library for NodeJs**

## Descrição

`admanager-nestjs` é um pacote npm que facilita a integração de projetos NestJS com a API do Google Ad Manager. Ele fornece uma interface simplificada para autenticação, gerenciamento de unidades de anúncio e outras funcionalidades disponíveis na API, permitindo que você construa aplicações robustas com rapidez e eficiência.

## Instalação

Você pode instalar o pacote usando npm:

```bash
npm install admanager-nestjs
```

Ou usando yarn:

```bash
yarn add admanager-nestjs
```

## Configuração

Antes de utilizar o `admanager-nestjs`, você precisará configurar as credenciais de acesso à API do Google Ad Manager.

### Configuração Síncrona com `forRoot`

Se você possui as credenciais disponíveis no momento da inicialização, pode configurar o módulo de forma síncrona:

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { AdManagerModule } from 'admanager-nestjs';

@Module({
  imports: [
    AdManagerModule.forRoot({
      web: {
        client_id: 'SEU_CLIENT_ID',
        client_secret: 'SEU_CLIENT_SECRET',
        redirect_uris: ['SEU_REDIRECT_URI'],
      },
    }),
  ],
})
export class AppModule {}
```

### Configuração Assíncrona com `forRootAsync`

Caso precise carregar as credenciais de forma assíncrona, use o método `forRootAsync`:

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { AdManagerModule } from 'admanager-nestjs';
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

## Uso

Após configurar o módulo, você pode injetar o `AdManagerService` em seus serviços ou controladores.

### Autenticação

```typescript
// auth.service.ts

import { Injectable } from '@nestjs/common';
import { AdManagerService } from 'admanager-nestjs';

@Injectable()
export class AuthService {
  constructor(private readonly adManagerService: AdManagerService) {}

  getAuthUrl(): string {
    return this.adManagerService.generateAuthUrl();
  }

  async authenticate(code: string): Promise<void> {
    const token = await this.adManagerService.getToken(code);
    // Salve o token para uso futuro
  }
}
```

### Gerenciamento de Unidades de Anúncio

```typescript
// adunit.service.ts

import { Injectable } from '@nestjs/common';
import { AdManagerService } from 'admanager-nestjs';

@Injectable()
export class AdUnitService {
  constructor(private readonly adManagerService: AdManagerService) {}

  async getAdUnits(): Promise<any> {
    return await this.adManagerService.getAdUnits();
  }
}
```

## Licença

Este projeto está licenciado sob a **GNU General Public License v3.0 ou posterior**. Consulte o arquivo [LICENSE](./LICENSE) para obter mais detalhes.

## Autor

- **Márcio Motta** - [Marmottajr](https://github.com/marmottajr)

## Referências

- [Documentação da API do Google Ad Manager](https://developers.google.com/ad-manager/api)
- [NestJS Documentation](https://docs.nestjs.com/)

## Agradecimentos

Agradecemos a todos que contribuíram para este projeto e à comunidade open-source por seu suporte contínuo.

## Aviso Legal

Este projeto não é afiliado, associado, autorizado, endossado ou de qualquer forma oficialmente conectado ao Google ou a qualquer uma de suas subsidiárias ou afiliadas. Os nomes Google e Google Ad Manager, bem como marcas relacionadas, nomes, marcas registradas e imagens são marcas registradas de propriedade de seus respectivos proprietários.
