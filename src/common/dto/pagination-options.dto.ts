import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PaginationOrderType } from '../constants/enums/pagination.enum';

export class PaginationOptionsDto {
  @ApiPropertyOptional({
    enum: PaginationOrderType,
    default: PaginationOrderType.Desc,
  })
  @IsEnum(PaginationOrderType)
  @IsOptional()
  readonly orderBy?: PaginationOrderType = PaginationOrderType.Desc;

  @ApiPropertyOptional({ default: '_createdAt' })
  @IsString()
  readonly sortBy?: string = '_createdAt';

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly size?: number = 10;
}
