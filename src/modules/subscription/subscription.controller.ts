import { Controller, Param, Patch } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { BaseController } from 'shared/base';
import { Subscription } from './subscription.entity';

@Controller()
export class SubscriptionController extends BaseController<Subscription> {
  constructor(protected readonly subscriptionService: SubscriptionService) {
    super(subscriptionService);
  }

  @Patch(':followerId/follow/:followingId')
  async follow(
    @Param('followerId') followerId: string,
    @Param('followingId') followingId: string,
  ) {
    return this.subscriptionService.followUser(followerId, followingId);
  }

  @Patch(':followerId/unfollow/:followingId')
  async unfollow(
    @Param('followerId') followerId: string,
    @Param('followingId') followingId: string,
  ) {
    return this.subscriptionService.unfollowUser(followerId, followingId);
  }
}
