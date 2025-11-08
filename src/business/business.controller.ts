import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { BusinessDto } from './dto/business.dto';
import { ENDPOINTS } from 'src/common/constants/endpoints';
import { MODULES } from 'src/common/constants/modules';

@Controller(ENDPOINTS.BUSINESS)
@ApiTags(MODULES.BUSINESS)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() businessDto: BusinessDto) {
    return this.businessService.create(businessDto);
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() businessDto: BusinessDto) {
    return this.businessService.update(+id, businessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(+id);
  }
}
