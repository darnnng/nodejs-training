import { DATABASE_TOKEN } from 'database/database.providers';
import { DataSource } from 'typeorm';
import { Post } from './post.entity';

export const postProviders = [
  {
    provide: 'POST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: [DATABASE_TOKEN],
  },
];
