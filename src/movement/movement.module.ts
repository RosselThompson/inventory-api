import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { Movement } from 'src/movement/entities/movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movement])],
  controllers: [MovementController],
  providers: [MovementService],
  exports: [MovementService],
})
export class MovementModule {}
