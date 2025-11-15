import { Module, forwardRef } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { Movement } from 'src/movement/entities/movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessModule } from 'src/business/business.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movement]),
    BusinessModule,
    forwardRef(() => ProductModule),
  ],
  controllers: [MovementController],
  providers: [MovementService],
  exports: [MovementService],
})
export class MovementModule {}
