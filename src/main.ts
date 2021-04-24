import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'app.module';
import { MongoExceptionFilter } from 'core/exception-filters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 8000);

  // App middleware
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ always: true }));

  await app.listen(port);
}
bootstrap();
