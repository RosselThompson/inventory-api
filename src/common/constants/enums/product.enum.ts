export type UNIT_OF_MEASURE = 'und' | 'kg' | 'lb' | 'box' | 'pack' | 'dozen';
export type CURRENCY = 'USD' | 'NIO';

export enum ProductSortByType {
  CreatedAt = '_createdAt',
  StockQuantity = 'stock_quantity',
  UnitOfMeasure = 'unit_of_measure',
  Price = 'price',
}

export enum ProductSearchType {
  name = 'name',
  sku = 'sku',
}
