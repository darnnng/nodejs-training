import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { DatabaseModule } from 'database/database.module';
import { subscriptionProviders } from './subscription.providers';
import { userProviders } from 'modules/user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SubscriptionController],
  providers: [...subscriptionProviders, ...userProviders, SubscriptionService],
  exports: [SubscriptionService],
})
export class PostModule {}
