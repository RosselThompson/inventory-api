import { SelectQueryBuilder } from 'typeorm';

export const addSearchQuery = (
  queryBuilder: SelectQueryBuilder<any>,
  field: string,
  value: string,
) => {
  if (value?.toString().trim()) {
    queryBuilder.andWhere(`${field} LIKE :${field}`, { [field]: `%${value}%` });
  }
  return queryBuilder;
};
