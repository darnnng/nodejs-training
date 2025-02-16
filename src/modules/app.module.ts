import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [ConfigModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
