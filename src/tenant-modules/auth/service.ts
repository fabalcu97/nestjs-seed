import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginUnsuccessful } from 'tenant-modules/auth/exceptions';
import { AccessToken } from 'tenant-modules/auth/interfaces';
import { JwtPayloadInterface } from 'tenant-modules/auth/interfaces/jwt-payload.interface';
import { RegisterUserInput } from 'tenant-modules/auth/interfaces/register-user.input';
import { UserNotFound } from 'tenant-modules/users/exceptions';
import { User } from 'tenant-modules/users/model';
import { UsersService } from 'tenant-modules/users/service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(input: RegisterUserInput): Promise<User> {
    return this.usersService.create(input);
  }

  async login(email: string, password: string): Promise<AccessToken> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UserNotFound();
    }
    if (!user.matchPasswords(password)) {
      throw new LoginUnsuccessful();
    }
    const payload: JwtPayloadInterface = { uid: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async changePassword(user: User, newPassword: string): Promise<User> {
    return this.usersService.changePassword(user, newPassword);
  }
}
