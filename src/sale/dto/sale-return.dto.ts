import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaleReturnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discountAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discountRate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  businessId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiPropertyOptional()
  @IsEmpty()
  @IsString()
  reason?: string;
}
