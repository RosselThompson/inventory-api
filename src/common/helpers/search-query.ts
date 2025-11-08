import { SelectQueryBuilder } from 'typeorm';

export const addSearchQuery = (
  queryBuilder: SelectQueryBuilder<any>,
  field: string,
  value: string | boolean,
) => {
  const entity = queryBuilder.alias;
  if (value === 'true' || value === 'false') {
    queryBuilder.andWhere(`${entity}.${field} = :${field}`, { [field]: value });
  } else if (value?.toString().trim()) {
    queryBuilder.andWhere(`${entity}.${field} LIKE :${field}`, {
      [field]: `%${value}%`,
    });
  }
  return queryBuilder;
};
