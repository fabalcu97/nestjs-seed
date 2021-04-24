import { HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { saltRounds } from 'config/constants';

import { BaseModel } from 'core/classes/base.model';
import { BaseSchema } from 'core/classes/base.schema';

@Schema()
@ObjectType()
export class User extends BaseModel {
  /**
   * User email
   *
   * @type {string}
   * @memberof User
   */
  @Prop({ required: true, unique: true })
  email: string;

  /**
   * User password
   *
   * @type {string}
   * @memberof User
   */
  @HideField()
  @Prop({ required: true })
  password: string;

  // Methods

  @HideField()
  setPassword: (newPassword: string) => void;

  @HideField()
  matchPasswords: (passwordToMatch: string) => boolean;
}

export const UserSchema = new BaseSchema(User).schema;

UserSchema.methods.setPassword = async function(
  this: User,
  newPassword: string,
) {
  this.password = await hash(newPassword, saltRounds);
  return this.save();
};

UserSchema.methods.matchPasswords = async function(
  this: User,
  passwordToMatch: string,
) {
  return await compare(passwordToMatch, this.password);
};
