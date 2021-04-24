import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

const GraphQLProvider = GraphQLModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const debug = config.get('DEBUG') || false;
    return {
      debug,
      playground: debug,
      introspection: debug,
      sortSchema: true,
      uploads: false,
      context: ({ req }) => ({
        req,
        headers: req.headers,
        get: req.get,
      }),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    };
  },
});

@Module({
  imports: [GraphQLProvider],
})
export class GraphQLConfigModule {}
