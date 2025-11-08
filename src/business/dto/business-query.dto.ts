import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { BusinessSortByType } from 'src/common/constants/enums/business.enum';
import { PaginationOptionsDto } from 'src/common/dto/pagination-options.dto';

export class BusinessQueryDto extends PaginationOptionsDto {
  @IsOptional()
  @IsEnum(BusinessSortByType)
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_legalId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_legalName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_tradeName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_isActive?: boolean;
}
