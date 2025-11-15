import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovementService } from './movement.service';
import { CurrentBusiness } from 'src/auth/decorators/current-business.decorator';
import { ENDPOINTS } from 'src/common/constants/endpoints';
import { MODULES } from 'src/common/constants/modules';
import { ApiTags } from '@nestjs/swagger';
import { MovementQueryDto } from './dto/movement-query.dto';

@Controller(ENDPOINTS.MOVEMENT)
@ApiTags(MODULES.MOVEMENT)
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Get()
  findAll(
    @Query() movementQueryDto: MovementQueryDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.movementService.findAll(movementQueryDto, businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentBusiness() businessId: string) {
    return this.movementService.findOne(id, businessId);
  }
}
