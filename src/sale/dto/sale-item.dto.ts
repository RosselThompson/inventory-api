import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaleItemDto {
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
}
