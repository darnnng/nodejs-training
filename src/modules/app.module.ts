import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'database/database.module';
import { SubscriptionModule } from './subscription/subsciption.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    DatabaseModule,
    SubscriptionModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
