import { TenancyModule } from '@needle-innovision/nestjs-tenancy';
import { Module } from '@nestjs/common';

import { User, UserSchema } from 'tenant-modules/users/model';
import { UsersResolver } from 'tenant-modules/users/resolver';
import { UsersService } from 'tenant-modules/users/service';

@Module({
  imports: [
    TenancyModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersService,
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
