import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'database/database.module';
import { userProviders } from './user.providers';
import { subscriptionProviders } from 'modules/subscription/subscription.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, ...subscriptionProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
