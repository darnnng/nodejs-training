import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { DatabaseModule } from 'database/database.module';
import { filesProviders } from './files.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [...filesProviders, FilesService],
  exports: [FilesService],
})
export class FileModule {}
