import { SelectQueryBuilder } from 'typeorm';
import { PaginationOptionsDto } from '../dto/pagination-options.dto';
import { PaginationMetaDto } from '../dto/pagination-meta.dto';
import { PaginationDto } from '../dto/pagination.dto';

export const paginateData = async <T>(
  dbTableName: string,
  pageOptionsDto: PaginationOptionsDto,
  queryBuilder: SelectQueryBuilder<T>,
  customMapper?: (entities: T[], raw: any[]) => any[],
) => {
  const defaultPageOptions = new PaginationOptionsDto();
  const pageConfig: PaginationOptionsDto = {
    ...defaultPageOptions,
    ...(pageOptionsDto || {}),
  };
  const skip = (pageConfig.page - 1) * pageConfig.size;

  queryBuilder
    .orderBy(`${dbTableName}.${pageConfig.sortBy}`, pageConfig.orderBy)
    .skip(skip)
    .take(pageConfig.size);

  const itemCount = await queryBuilder.getCount();
  const { raw: rawData, entities: entities } =
    await queryBuilder.getRawAndEntities();

  const data = customMapper ? customMapper(rawData, entities) : entities;

  const pageMetaDto = new PaginationMetaDto({
    itemCount,
    pageOptionsDto: pageConfig,
  });

  return new PaginationDto(data, pageMetaDto);
};
