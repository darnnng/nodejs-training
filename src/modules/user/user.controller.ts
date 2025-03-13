import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Routes } from 'shared/constants';
import { BaseController } from 'shared/base';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/user.dto';

@Controller(Routes.Users)
export class UserController extends BaseController<User> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get(':id/posts')
  async getUsersPosts(
    @Param('userId') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.userService.getUsersPosts(userId, page, limit);
  }

  @Patch(':id')
  async updateProfile(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch(':adminId/block/:userId')
  async blockUser(
    @Param('adminId') adminId: string,
    @Param('userId') userId: string,
    @Param('isBlocked') isBlocked: boolean,
  ) {
    return this.userService.setUserBlockStatus(adminId, userId, isBlocked);
  }
}
