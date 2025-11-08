import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BusinessDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  legalId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  legalName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tradeName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  industry: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
