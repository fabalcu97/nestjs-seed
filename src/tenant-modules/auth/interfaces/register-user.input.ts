import { InputType } from '@nestjs/graphql';
import {
  Equals,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';
import { PASSWORD_REGEX } from 'config/constants';
import { Match } from 'core/validators/match.decorator';

/**
 * Create user input.
 *
 * @export
 * @class CreateUserInput
 */
@InputType()
export class RegisterUserInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(7)
  @Matches(PASSWORD_REGEX, {
    message:
      'The password must contain at least one capital letter, one number and one special character (@$%!&*_-#?).',
  })
  @Match('confirmationPassword')
  password: string;

  @IsNotEmpty()
  confirmationPassword: string;
}
