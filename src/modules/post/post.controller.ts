import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Routes } from 'shared/constants';
import { BaseController } from 'shared/base';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Controller(Routes.Posts)
export class PostController extends BaseController<PostEntity> {
  constructor(protected readonly postService: PostService) {
    super(postService);
  }

  @Post('create')
  async createPost(@Body() data: CreatePostDto) {
    return this.postService.createPost(data);
  }

  //TO-DO: check that post belongs to user who wants to update it

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postService.updatePost(id, data);
  }

  //TO-DO: check that post belongs to user who wants to delete it

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @Get()
  async getPosts(@Query('page') page: number, @Query('limit') limit: number) {
    return this.postService.getPosts(page, limit);
  }
}
