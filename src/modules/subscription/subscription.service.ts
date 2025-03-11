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
      follower: { id: followerId },
      following: { id: followingId },
    });

    console.log(existingSubscription, 'existingSubscription');
    // TO-DO : check why code execution does not stop after getting 409
    if (existingSubscription) throw new ConflictException('Already following');

    const subscription = this.repository.create({
      follower: { id: followerId },
      following: { id: followingId },
    });

    await this.repository.save(subscription);
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    const subscription = await this.findOne({
      follower: { id: followerId },
      following: { id: followingId },
    });

    if (!subscription) throw new NotFoundException('Subscription not found');

    await this.repository.remove(subscription);
  }
}
