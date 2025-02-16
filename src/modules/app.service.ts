import { Injectable } from '@nestjs/common';
import { ConfigService } from './config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  root(): string {
    return this.config.get('APP_URL');
  }
}
