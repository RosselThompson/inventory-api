import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  MovementReferenceType,
  MovementOperationType,
  MovementType,
} from '../../common/constants/enums/movement.enum';
import { Product } from 'src/product/entities/product.entity';

@Entity(DB_TABLE_NAMES.MOVEMENT)
export class Movement extends BaseEntity {
  @Column({ name: 'movement_type' })
  movementType: MovementType;

  @Column({ name: 'operation' })
  operation: MovementOperationType;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'updated_stock' })
  updatedStock: number;

  @Column({ name: 'business_id' })
  businessId: string;

  @Column({ name: 'reference', nullable: true })
  reference: MovementReferenceType;

  @Column({ name: 'reference_id', nullable: true })
  referenceId: string;

  @ManyToOne(() => Product, (product) => product.movements)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
