import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SaleSortByType } from 'src/common/constants/enums/sale.enum';
import { PaginationOptionsDto } from 'src/common/dto/pagination-options.dto';

export class SaleQueryDto extends PaginationOptionsDto {
  @IsOptional()
  @IsEnum(SaleSortByType)
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_sale_number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_customer_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_sale_status?: string;
}
