import { Query, Resolver } from '@nestjs/graphql';

import { User } from 'tenant-modules/users/model';
import { UsersService } from 'tenant-modules/users/service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(type => [User])
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
