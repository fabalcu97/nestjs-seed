import { InputType } from '@nestjs/graphql';
import { Equals, IsNotEmpty, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'config/constants';

@InputType()
export class ChangePasswordInput {
  currentPassword: string;

  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message:
      'The password must contain at least one capital letter, one number and one special character (@$%!&*_-#?).',
  })
  @Equals('confirmationPassword')
  newPassword: string;

  @IsNotEmpty()
  newPasswordConfirmation: string;
}
