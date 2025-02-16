import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app.module';
import { ConfigService } from 'modules/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
