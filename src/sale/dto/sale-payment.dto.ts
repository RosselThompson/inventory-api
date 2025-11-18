import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CURRENCY } from 'src/common/constants/enums/product.enum';
import { SalePaymentMethodType } from 'src/common/constants/enums/sale.enum';

export class SalePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(SalePaymentMethodType)
  paymentMethod: SalePaymentMethodType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currency: CURRENCY;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amountPaid: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  businessId: string;

  @ApiPropertyOptional()
  @IsEmpty()
  @IsString()
  referenceNumber?: string;

  @ApiPropertyOptional()
  @IsEmpty()
  @IsString()
  fileId?: string;
}
