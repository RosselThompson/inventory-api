import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { fieldMatchErrorMessage } from 'src/common/helpers/messages';
import { UserRoleType } from 'src/common/constants/enums/user.enum';
import { NIO_NID_REGEX } from 'src/common/constants/regex';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRoleType, default: UserRoleType.Admin })
  @IsNotEmpty()
  @IsEnum(UserRoleType)
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(NIO_NID_REGEX, {
    message: fieldMatchErrorMessage('nid', '00000000000000X'),
  })
  nid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cellphone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
