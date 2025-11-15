import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ProductSortByType } from 'src/common/constants/enums/product.enum';
import { PaginationOptionsDto } from 'src/common/dto/pagination-options.dto';

export class ProductQueryDto extends PaginationOptionsDto {
  @IsOptional()
  @IsEnum(ProductSortByType)
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_sku?: string;
}
