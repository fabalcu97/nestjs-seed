import { TenancyModule } from '@needle-innovision/nestjs-tenancy';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'mongoose';

import { TenancyVars, DatabaseVars } from 'config/vars/interfaces';
import { TenantModule } from 'modules/tenants';
import { TenantValidator } from 'modules/tenants/validator';

@Module({
  imports: [
    TenancyModule.forRootAsync({
      imports: [TenantModule],
      useFactory: async (
        configService: ConfigService,
        validator: TenantValidator,
      ) => {
        const { uri, authSource } = configService.get<DatabaseVars>('database');
        const { tenantIdentifier } = configService.get<TenancyVars>('tenancy');
        return {
          // Mongoose connection options
          options: (): ConnectionOptions => ({
            authSource,
            authMechanism: 'SCRAM-SHA-256',
            useNewUrlParser: true,
            useCreateIndex: true,
          }),
          tenantIdentifier,
          uri: (tenantId: string) => `${uri}-${tenantId}`,
          validator: (tenantId: string) => validator.setTenantId(tenantId),
        };
      },
      inject: [ConfigService, TenantValidator],
    }),
  ],
})
export class TenancyConfigModule {}
