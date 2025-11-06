import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserActivateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
