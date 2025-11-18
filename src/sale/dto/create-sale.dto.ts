import { SaleItemDto } from './sale-item.dto';
import { SalePaymentDto } from './sale-payment.dto';
import { SaleDto } from './sale.dto';

export class CreateSaleDto {
  sale: SaleDto;
  items: SaleItemDto[];
  payments: SalePaymentDto[];
}
