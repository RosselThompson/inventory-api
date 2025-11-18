import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CURRENCY } from 'src/common/constants/enums/product.enum';
import { SaleStatusType } from 'src/common/constants/enums/sale.enum';

export class SaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  saleDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  saleNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subTotal: number;

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
  taxAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  taxRate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currency: CURRENCY;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(SaleStatusType)
  saleStatus: SaleStatusType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  businessId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}
