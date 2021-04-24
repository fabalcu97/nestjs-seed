import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseConfigModule } from 'config/database';
import { GraphQLConfigModule } from 'config/graphql';
import { TenancyConfigModule } from 'config/tenancy';
import { databaseVars, jwtVars, tenancyVars } from 'config/vars';
import { MainModule } from 'modules';
import { TenantsModule } from 'tenant-modules';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseVars, tenancyVars, jwtVars],
    }),
    DatabaseConfigModule,
    TenancyConfigModule,
    GraphQLConfigModule,
    MainModule,
    TenantsModule,
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
