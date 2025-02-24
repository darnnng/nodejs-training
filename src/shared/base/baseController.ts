import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaseService } from './baseService';

export abstract class BaseController<T> {
  constructor(protected readonly service: BaseService<T & { id: string }>) {}

  @Get()
  async getAll(
    @Query('sortBy') sortBy?: keyof T,
    @Query('searchBy') searchBy?: string,
    @Query('searchTerm') searchTerm?: string,
    @Query('select') select?: (keyof T)[],
    @Query('relations') relations?: string,
  ): Promise<T[]> {
    const query = {
      sortBy,
      searchBy,
      searchTerm,
      select: select,
      relations: relations?.split(','),
    };
    return this.service.findAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<T> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() data: any): Promise<T> {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<T> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
