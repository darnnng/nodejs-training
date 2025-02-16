import { ConfigService } from 'modules/config';
import { AppDataSource } from './datasource';

export const DATABASE_TOKEN = 'DATA_SOURCE';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: DATABASE_TOKEN,
    useFactory: async () => {
      return AppDataSource.initialize();
    },
  },
];
