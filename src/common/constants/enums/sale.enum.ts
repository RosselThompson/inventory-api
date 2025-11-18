export enum SalePaymentMethodType {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
}

export enum SaleStatusType {
  CREATED = 'CREATED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum SaleSortByType {
  CreatedAt = '_createdAt',
  SaleNumber = 'sale_number',
  SaleStatus = 'sale_status',
  TotalAmount = 'total_amount',
  Currency = 'currency',
}

export enum SaleSearchType {
  saleNumber = 'sale_number',
  customerName = 'customer_name',
  saleStatus = 'sale_status',
}
