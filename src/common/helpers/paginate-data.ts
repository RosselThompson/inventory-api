import { SelectQueryBuilder } from 'typeorm';
import { PaginationOptionsDto } from '../dto/pagination-options.dto';
import { PaginationMetaDto } from '../dto/pagination-meta.dto';
import { PaginationDto } from '../dto/pagination.dto';

export const paginateData = async (
  entityName: string,
  pageOptionsDto: PaginationOptionsDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const defaultPageOptions = new PaginationOptionsDto();
  const pageConfig: PaginationOptionsDto = {
    ...defaultPageOptions,
    ...(pageOptionsDto || {}),
  };
  const skip = (pageConfig.page - 1) * pageConfig.size;

  queryBuilder
    .orderBy(`${entityName}.${pageConfig.sortBy}`, pageConfig.orderBy)
    .skip(skip)
    .take(pageConfig.size);

  const itemCount = await queryBuilder.getCount();
  const { entities: data } = await queryBuilder.getRawAndEntities();
  const pageMetaDto = new PaginationMetaDto({
    itemCount,
    pageOptionsDto: pageConfig,
  });

  return new PaginationDto(data, pageMetaDto);
};
