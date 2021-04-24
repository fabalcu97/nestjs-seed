import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const isPublicKey = 'isPublic';
export const PublicEndpoint = () => SetMetadata(isPublicKey, true);
export const PublicResolver = () => SetMetadata(isPublicKey, true);

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
