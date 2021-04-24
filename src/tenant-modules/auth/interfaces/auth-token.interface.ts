import { ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Access token type' })
export class AccessToken {
  accessToken: string;
}
