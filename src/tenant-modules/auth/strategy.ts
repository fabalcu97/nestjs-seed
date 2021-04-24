import { InjectTenancyModel } from '@needle-innovision/nestjs-tenancy';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { JwtVars } from 'config/vars/interfaces';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadInterface } from 'tenant-modules/auth/interfaces';
import { User } from 'tenant-modules/users/model';
import { UsersService } from 'tenant-modules/users/service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    @InjectTenancyModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<JwtVars>('jwt').secretKey,
      ignoreExpiration: false,
    });
    console.log(1313123113);
  }

  async validate(payload: JwtPayloadInterface): Promise<any> {
    // return this.usersService.findById(payload.uid);
    return {};
  }
}
