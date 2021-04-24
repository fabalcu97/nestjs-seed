import { NotFoundException } from '@nestjs/common';

export class UserNotFound extends NotFoundException {
  message = 'User not found.';
}
