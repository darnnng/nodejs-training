import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { BaseService } from 'shared/base';
import { User } from 'modules/user/user.entity';

@Injectable()
export class SubscriptionService extends BaseService<Subscription> {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY')
    subscriptionRepository: Repository<Subscription>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {
    super(subscriptionRepository);
  }

  async followUser(followerId: string, followingId: string): Promise<void> {
    if (followerId === followingId)
      throw new BadRequestException('Cannot follow yourself');

    const follower = await this.userRepository.findOne({
      where: { id: followerId },
    });
    const following = await this.userRepository.findOne({
      where: { id: followingId },
    });

    if (!follower || !following) throw new NotFoundException('User not found');

    const existingSubscription = await this.findOne({
      where: { follower, following },
    });

    if (existingSubscription) throw new ConflictException('Already following');

    const subscription = this.create({
      follower,
      following,
    });
    await this.save(subscription);
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    const subscription = await this.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });

    if (!subscription) throw new NotFoundException('Subscription not found');

    await this.remove(subscription);
  }
}
