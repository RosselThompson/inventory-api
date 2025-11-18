import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Sale } from './sale.entity';
import { SalePaymentMethodType } from 'src/common/constants/enums/sale.enum';
import { CURRENCY } from 'src/common/constants/enums/product.enum';

@Entity(DB_TABLE_NAMES.SALE_PAYMENT)
export class SalePayment extends BaseEntity {
  @Column({ name: 'payment_method', enum: SalePaymentMethodType })
  paymentMethod: SalePaymentMethodType;

  @Column({ name: 'currency' })
  currency: CURRENCY;

  @Column({ name: 'amount_paid' })
  amountPaid: number;

  @Column({ name: 'business_id' })
  businessId: string;

  @Column({ name: 'reference_number', nullable: true })
  referenceNumber: string;

  @Column({ name: 'file_id', nullable: true })
  fileId: string;

  @ManyToOne(() => Sale, (sale) => sale.payments)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}
