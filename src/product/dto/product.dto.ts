import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  UNIT_OF_MEASURE,
  CURRENCY,
} from '../../common/constants/enums/product.enum';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  unitOfMeasure: UNIT_OF_MEASURE;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currency: CURRENCY;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  stockQuantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateProductStockDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stockQuantity: number;
}
