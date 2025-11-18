import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from 'src/product/entities/product.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity(DB_TABLE_NAMES.SALE_ITEM)
export class SaleItem extends BaseEntity {
  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'unit_price' })
  unitPrice: number;

  @Column({ name: 'discount_amount' })
  discountAmount: number;

  @Column({ name: 'discount_rate' })
  discountRate: number;

  @Column({ name: 'total' })
  total: number;

  @Column({ name: 'business_id' })
  businessId: string;

  @ManyToOne(() => Sale, (sale) => sale.items)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Product, (product) => product.sales)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
