import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { BusinessModule } from 'src/business/business.module';
import { MovementModule } from 'src/movement/movement.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    BusinessModule,
    forwardRef(() => MovementModule),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
