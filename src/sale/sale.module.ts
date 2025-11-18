import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { SalePayment } from './entities/sale-payment.entity';
import { BusinessModule } from 'src/business/business.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleItem, SalePayment]),
    BusinessModule,
    ProductModule,
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
