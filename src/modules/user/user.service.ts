import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseService } from 'shared/base';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @Inject('USER_REPOSITORY')
    userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async getAllUsers(): Promise<User[]> {
    return this.findAll();
  }

  async findAdmins(): Promise<User[]> {
    return this.repository.find({ where: { isAdmin: true } });
  }
}
