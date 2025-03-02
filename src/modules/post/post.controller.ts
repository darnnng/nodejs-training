import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { Routes } from 'shared/constants';
import { BaseController } from 'shared/base';
import { Post } from './post.entity';

@Controller(Routes.Posts)
export class PostController extends BaseController<Post> {
  constructor(protected readonly postService: PostService) {
    super(postService);
  }
}
