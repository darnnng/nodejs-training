import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from 'database/database.module';
import { postProviders } from './post.providers';
import { filesProviders } from 'modules/files/files.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [...postProviders, ...filesProviders, PostService],
  exports: [PostService],
})
export class PostModule {}
