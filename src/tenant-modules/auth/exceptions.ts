import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class LoginUnsuccessful extends UnauthorizedException {
  message = 'Login unsuccessful. Either the email or password are wrong.';
}

export class PasswordMismatch extends BadRequestException {
  message = "The passwords doesn't match";
}

export class InvalidPassword extends BadRequestException {
  message = 'The provided password is not correct.';
}
