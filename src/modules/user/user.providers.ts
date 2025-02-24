import { DATABASE_TOKEN } from 'database/database.providers';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATABASE_TOKEN],
  },
];
