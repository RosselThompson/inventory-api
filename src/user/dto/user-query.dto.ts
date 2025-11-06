import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { UserSortByType } from 'src/common/constants/enums/user.enum';
import { PaginationOptionsDto } from 'src/common/dto/pagination-options.dto';

export class UserQueryDto extends PaginationOptionsDto {
  @IsOptional()
  @IsEnum(UserSortByType)
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_nid?: string;

  @ApiPropertyOptional()
  @IsOptional()
  s_email?: string;
}
