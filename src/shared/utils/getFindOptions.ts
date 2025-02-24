import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Like,
} from 'typeorm';

export function getFindOptions<T>(
  query: Partial<FindManyOptions<T>> & {
    sortBy?: keyof T;
    searchBy?: string;
    searchTerm?: string;
    select?: (keyof T)[];
    relations?: string[];
  },
): FindManyOptions<T> {
  const options: FindManyOptions<T> = {};

  const {
    skip,
    take,
    sortBy,
    order,
    select,
    relations,
    searchBy,
    searchTerm,
    ...where
  } = query;

  if (skip !== undefined) {
    options.skip = skip;
  }

  if (take !== undefined) {
    options.take = take;
  }

  if (sortBy && order) {
    options.order = {
      [sortBy]: order,
    } as FindOptionsOrder<T>;
  }

  if (select && select.length > 0) {
    options.select = select;
  }

  if (relations && relations.length > 0) {
    options.relations = relations;
  }

  if (searchBy && searchTerm) {
    options.where = {
      ...where,
      [searchBy]: Like(`%${searchTerm}%`),
    } as FindOptionsWhere<T>;
  } else if (Object.keys(where).length > 0) {
    options.where = where as FindOptionsWhere<T>;
  }

  return options;
}
