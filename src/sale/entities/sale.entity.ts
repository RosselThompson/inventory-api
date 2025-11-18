import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { SalePayment } from './sale-payment.entity';
import { CURRENCY } from 'src/common/constants/enums/product.enum';
import { SaleItem } from './sale-item.entity';
import { SaleStatusType } from 'src/common/constants/enums/sale.enum';

@Entity(DB_TABLE_NAMES.SALE)
export class Sale extends BaseEntity {
  @Column({ name: 'sale_date' })
  saleDate: Date;

  @Column({ name: 'sale_number' })
  saleNumber: string;

  @Column({ name: 'sub_total' })
  subTotal: number;

  @Column({ name: 'discount_amount' })
  discountAmount: number;

  @Column({ name: 'discount_rate' })
  discountRate: number;

  @Column({ name: 'tax_amount' })
  taxAmount: number;

  @Column({ name: 'tax_rate' })
  taxRate: number;

  @Column({ name: 'total_amount' })
  totalAmount: number;

  @Column({ name: 'currency' })
  currency: CURRENCY;

  @Column({ name: 'status', enum: SaleStatusType })
  saleStatus: SaleStatusType;

  @Column({ name: 'business_id' })
  businessId: string;

  @Column({ name: 'customer_name', nullable: true })
  customerName: string;

  @Column({ name: 'note', nullable: true })
  note: string;

  @OneToMany(() => SalePayment, (salePayment) => salePayment.sale)
  @JoinColumn()
  payments: SalePayment[];

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale)
  @JoinColumn()
  items: SaleItem[];
}
