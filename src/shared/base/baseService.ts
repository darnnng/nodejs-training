import {
  Repository,
  DeepPartial,
  FindManyOptions,
  ObjectLiteral,
  FindOptionsWhere,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { getFindOptions } from 'shared/utils/getFindOptions';

export abstract class BaseService<T extends ObjectLiteral & { id: string }> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(query?: Partial<FindManyOptions<T>>): Promise<T[]> {
    const options: FindManyOptions<T> = getFindOptions<T>(query || {});
    return this.repository.find(options);
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
