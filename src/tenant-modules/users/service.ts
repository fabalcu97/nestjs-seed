import { InjectTenancyModel } from '@needle-innovision/nestjs-tenancy';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { ModelService } from 'core/services';
import { User } from 'tenant-modules/users/model';
import {
  CreateUserInterface,
  UpdateUserInterface,
} from 'tenant-modules/users/interfaces';

@Injectable()
export class UsersService extends ModelService<
  User,
  CreateUserInterface,
  UpdateUserInterface
> {
  constructor(
    @InjectTenancyModel(User.name)
    private userModel: Model<User>,
  ) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async changePassword(user: User, newPassword: string): Promise<User> {
    user.setPassword(newPassword);
    return user.save();
  }
}
