import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Routes } from 'shared/constants';
import { BaseController } from 'shared/base';
import { User } from './user.entity';

@Controller(Routes.Users)
export class UserController extends BaseController<User> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }

  @Get('/admins')
  async getAdmins() {
    return this.userService.findAdmins();
  }
}
