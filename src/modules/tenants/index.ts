import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Tenant, TenantSchema } from 'modules/tenants/model';
import { TenantResolver } from 'modules/tenants/resolver';
import { TenantValidator } from 'modules/tenants/validator';
import { TenantsService } from 'modules/tenants/service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
  ],
  providers: [TenantsService, TenantValidator, TenantResolver],
  exports: [TenantsService, TenantValidator],
})
export class TenantModule {}
