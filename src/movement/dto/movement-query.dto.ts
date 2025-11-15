import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationOptionsDto } from 'src/common/dto/pagination-options.dto';
import { MovementSortByType } from '../../common/constants/enums/movement.enum';

export class MovementQueryDto extends PaginationOptionsDto {
  @IsOptional()
  @IsEnum(MovementSortByType)
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_product?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_movement_type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_operation?: string;
}
