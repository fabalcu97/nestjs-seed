import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import * as MongooseAutoPopulate from 'mongoose-autopopulate';

import { DatabaseVars } from 'config/vars/interfaces';

const DatabaseProvider = MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const { authSource, uri, dbName } = config.get<DatabaseVars>('database');
    return {
      uri,
      dbName,
      authSource,
      useNewUrlParser: true,
      useCreateIndex: true,
      connectionFactory: connection => {
        connection.plugin(MongooseAutoPopulate);
        return connection;
      },
    };
  },
});

@Module({
  imports: [DatabaseProvider],
})
export class DatabaseConfigModule {}
