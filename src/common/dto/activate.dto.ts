import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActivateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
