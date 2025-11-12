import { Controller, Get, Body, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { BusinessDto } from './dto/business.dto';
import { ENDPOINTS } from 'src/common/constants/endpoints';
import { MODULES } from 'src/common/constants/modules';
import { CurrentBusiness } from 'src/auth/decorators/current-business.decorator';

@Controller(ENDPOINTS.BUSINESS)
@ApiTags(MODULES.BUSINESS)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('me')
  findOne(@CurrentBusiness() businessId: string) {
    return this.businessService.findOne(businessId);
  }

  @Put('me')
  update(
    @CurrentBusiness() businessId: string,
    @Body() businessDto: BusinessDto,
  ) {
    return this.businessService.update(businessId, businessDto);
  }
}
