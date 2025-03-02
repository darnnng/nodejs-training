import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Files } from './files.entity';
import { BaseService } from 'shared/base';

@Injectable()
export class FilesService extends BaseService<Files> {
  constructor(
    @Inject('FILE_REPOSITORY')
    filesRepository: Repository<Files>,
  ) {
    super(filesRepository);
  }
}
