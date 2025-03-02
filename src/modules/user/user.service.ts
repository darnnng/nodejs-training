import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseService } from 'shared/base';
import { Subscription } from 'modules/subscription/subscription.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @Inject('USER_REPOSITORY')
    userRepository: Repository<User>,
    @Inject('SUBSCRIPTION_REPOSITORY')
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {
    super(userRepository);
  }

  private async checkIsAdmin(adminId: string): Promise<void> {
    const admin = await this.findOne(adminId);
    if (!admin || !admin.isAdmin)
      throw new ForbiddenException('Only admins can perform this action');
  }

  async getAllUsers(): Promise<User[]> {
    return this.findAll();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    return this.remove(id);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    await this.update(id, data);
    return this.findOne(id);
  }

  async setUserBlockStatus(
    adminId: string,
    id: string,
    isBlocked: boolean,
  ): Promise<User> {
    await this.checkIsAdmin(adminId);
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.update(id, { isBlocked });
  }
}
