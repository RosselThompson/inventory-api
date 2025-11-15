import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, UpdateProductStockDto } from './dto/product.dto';
import { CurrentBusiness } from 'src/auth/decorators/current-business.decorator';
import { ProductQueryDto } from './dto/product-query.dto';
import { Put } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() productDto: ProductDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.productService.create(productDto, businessId);
  }

  @Get()
  findAll(
    @Query() productQueryDto: ProductQueryDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.productService.findAll(productQueryDto, businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentBusiness() businessId: string) {
    return this.productService.findOne(id, businessId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.productService.update(id, productDto, businessId);
  }

  @Patch(':id/stock')
  updateStock(
    @Param('id') id: string,
    @Body() updateProductStockDto: UpdateProductStockDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.productService.updateStock(
      id,
      updateProductStockDto,
      businessId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentBusiness() businessId: string) {
    return this.productService.remove(id, businessId);
  }
}
