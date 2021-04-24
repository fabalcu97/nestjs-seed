import { Module } from '@nestjs/common';

import { AuthModule } from 'tenant-modules/auth';
import { UsersModule } from 'tenant-modules/users';

const modules = [UsersModule, AuthModule];

@Module({
  imports: modules,
  exports: modules,
})
export class TenantsModule {}
