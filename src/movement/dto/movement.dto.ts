import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MovementReferenceType } from '../../common/constants/enums/movement.enum';
import {
  MovementType,
  MovementOperationType,
} from '../../common/constants/enums/movement.enum';

export class MovementDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  movementType: MovementType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  operation: MovementOperationType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  updatedStock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  businessId: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  productId: string;

  @ApiPropertyOptional()
  @IsEmpty()
  @IsString()
  reference?: MovementReferenceType;

  @ApiPropertyOptional()
  @IsEmpty()
  @IsString()
  referenceId?: string;
}
