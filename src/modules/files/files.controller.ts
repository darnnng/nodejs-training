import { Controller } from '@nestjs/common';
import { FilesService } from './files.service';
import { BaseController } from 'shared/base';
import { Files } from './files.entity';

@Controller()
export class FilesController extends BaseController<Files> {
  constructor(protected readonly filesService: FilesService) {
    super(filesService);
  }
}
