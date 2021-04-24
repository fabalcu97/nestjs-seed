import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JwtVars } from 'config/vars/interfaces';

const JWTProvider = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const { secretKey } = config.get<JwtVars>('jwt');
    return {
      secret: secretKey,
      verifyOptions: {
        ignoreExpiration: true,
      },
    };
  },
});

@Module({
  imports: [JWTProvider],
  exports: [JWTProvider],
})
export class JWTConfigModule {}
