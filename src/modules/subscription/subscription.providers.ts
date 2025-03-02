import { DATABASE_TOKEN } from 'database/database.providers';
import { DataSource } from 'typeorm';
import { Subscription } from './subscription.entity';

export const subscriptionProviders = [
  {
    provide: 'SUBSCRIPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Subscription),
    inject: [DATABASE_TOKEN],
  },
];
