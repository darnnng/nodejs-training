import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app.module';
import { ConfigService } from 'modules/config';
import { AllExceptionsFilter } from 'shared/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  await app.listen(configService.get('PORT') ?? 3000);
}

bootstrap();
