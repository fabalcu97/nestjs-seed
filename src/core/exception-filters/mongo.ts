import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { MongoError } from 'mongodb';

import { MongoErrorCodes } from 'config/constants';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.code) {
      case MongoErrorCodes.DUPLICATE_KEY:
        const errors = exception['keyValue'];
        const msg = Object.keys(errors).map(
          key => `This ${key} is already in use, please try another one.`,
        );
        throw new GraphQLError(msg.join('\n'));
      default:
        break;
    }
  }
}
