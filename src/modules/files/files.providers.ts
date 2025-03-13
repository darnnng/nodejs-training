import { DATABASE_TOKEN } from 'database/database.providers';
import { DataSource } from 'typeorm';
import { Files } from './files.entity';

export const filesProviders = [
  {
    provide: 'FILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Files),
    inject: [DATABASE_TOKEN],
  },
];
