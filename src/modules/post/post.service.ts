import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { BaseService } from 'shared/base';
import { Files } from 'modules/files/files.entity';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(
    @Inject('POST_REPOSITORY')
    postRepository: Repository<Post>,
    @Inject('FILE_REPOSITORY')
    private readonly fileRepository: Repository<Files>,
  ) {
    super(postRepository);
  }
}
