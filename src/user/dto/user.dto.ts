import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { fieldMatchErrorMessage } from 'src/common/helpers/messages';
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  companyId: string;
}
