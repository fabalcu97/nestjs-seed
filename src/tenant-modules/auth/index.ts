import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { JWTConfigModule } from 'config/jwt';
import { JwtAuthGuard } from 'tenant-modules/auth/guard';
import { AuthResolver } from 'tenant-modules/auth/resolver';
import { AuthService } from 'tenant-modules/auth/service';
import { JwtStrategy } from 'tenant-modules/auth/strategy';
import { UsersService } from 'tenant-modules/users/service';

@Module({
  imports: [PassportModule, JWTConfigModule],
  exports: [PassportModule, JWTConfigModule, AuthService],
  providers: [
    UsersService,
    AuthService,
    AuthResolver,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
