import { SalePaymentDto } from './sale-payment.dto';
import { SaleReturnDto } from './sale-return.dto';

export class CreateSaleReturnDto {
  returns: SaleReturnDto[];
  refund: SalePaymentDto;
}
