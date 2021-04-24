import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { BaseResolver } from 'core/resolvers';
import { CurrentUser, PublicEndpoint } from 'tenant-modules/auth/decorators';
import {
  InvalidPassword,
  PasswordMismatch,
} from 'tenant-modules/auth/exceptions';
import {
  AccessToken,
  ChangePasswordInput,
  RegisterUserInput,
} from 'tenant-modules/auth/interfaces';
import { AuthService } from 'tenant-modules/auth/service';
import { User } from 'tenant-modules/users/model';

@PublicEndpoint()
@Resolver()
export class AuthResolver extends BaseResolver {
  constructor(private authService: AuthService) {
    super();
  }

  @Mutation(type => User)
  async registerUser(@Args('input') input: RegisterUserInput): Promise<User> {
    return this.authService.registerUser(input);
  }

  @Mutation(of => AccessToken)
  async login(
    @Args('user') user: string,
    @Args('password') password: string,
  ): Promise<AccessToken> {
    return this.authService.login(user, password);
  }

  @Mutation(type => User)
  async changePassword(
    @CurrentUser() user: User,
    @Args('changePassword') changePassword: ChangePasswordInput,
  ): Promise<User> {
    const {
      currentPassword,
      newPassword,
      newPasswordConfirmation,
    } = changePassword;
    if (newPassword !== newPasswordConfirmation) {
      throw new PasswordMismatch();
    }
    if (!user.matchPasswords(currentPassword)) {
      throw new InvalidPassword();
    }
    return this.authService.changePassword(user, newPassword);
  }
}
