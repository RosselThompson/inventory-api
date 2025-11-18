import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ENDPOINTS } from 'src/common/constants/endpoints';
import { MODULES } from 'src/common/constants/modules';
import { ApiTags } from '@nestjs/swagger';
import { CurrentBusiness } from 'src/auth/decorators/current-business.decorator';
import { SaleQueryDto } from './dto/sale-query.dto';

@Controller(ENDPOINTS.SALE)
@ApiTags(MODULES.SALE)
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  create(
    @Body() createSaleDto: CreateSaleDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.saleService.create(createSaleDto, businessId);
  }

  @Get()
  findAll(
    @Query() saleQueryDto: SaleQueryDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.saleService.findAll(saleQueryDto, businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentBusiness() businessId: string) {
    return this.saleService.findOne(id, businessId);
  }
}
