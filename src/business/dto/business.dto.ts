import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BusinessDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tradeName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
