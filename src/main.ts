import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { TypeORMExceptionFilter } from './common/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new TypeORMExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
