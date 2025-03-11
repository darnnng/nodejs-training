import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { BaseService } from 'shared/base';
import { Files } from 'modules/files/files.entity';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

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

  async createPost(data: CreatePostDto): Promise<Post> {
    const post = await this.create(data);
    return await this.repository.save(post);
  }

  async updatePost(id: string, data: UpdatePostDto): Promise<Post> {
    await this.update(id, data);
    return this.findOne(id);
  }

  async deletePost(id: string): Promise<void> {
    await this.remove(id);
  }

  async getPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    const posts = await this.findAll({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['files', 'likes', 'comments'],
    });

    return posts;
  }
}
