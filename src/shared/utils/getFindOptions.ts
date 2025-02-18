import { FindManyOptions, FindOptionsWhere } from 'typeorm';

export function getFindOptions<T>(
  query: Partial<FindManyOptions<T>>,
): FindManyOptions<T> {
  const options: FindManyOptions<T> = {};

  const { ...where } = query;

  if (Object.keys(where).length > 0) {
    options.where = where as FindOptionsWhere<T>;
  }

  return options;
}
