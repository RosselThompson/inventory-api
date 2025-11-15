import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Business } from 'src/business/entities/business.entity';
import {
  CURRENCY,
  UNIT_OF_MEASURE,
} from 'src/common/constants/enums/product.enum';

@Entity(DB_TABLE_NAMES.PRODUCT)
export class Product extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'sku' })
  sku: string;

  @Column({ name: 'unit_of_measure' })
  unitOfMeasure: UNIT_OF_MEASURE;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'currency' })
  currency: CURRENCY;

  @Column({ name: 'stock_quantity', default: 0 })
  stockQuantity: number;

  @Column({ name: 'description', nullable: true })
  description: string;

  @ManyToOne(() => Business, (business) => business.products)
  @JoinColumn({ name: 'business_id' })
  business: Business;
}
