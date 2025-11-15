export enum MovementType {
  InitialStock = 'INITIAL_STOCK',
  Sale = 'SALE',
  ReturnSale = 'RETURN_SALE',
  ManualAdjustment = 'MANUAL_ADJUSTMENT',
}

export enum MovementReferenceType {
  Sales = 'sales',
  Returns = 'returns',
}
export enum MovementOperationType {
  Increment = 'increment',
  Decrement = 'decrement',
}

export enum MovementSortByType {
  CreatedAt = '_createdAt',
  Operation = 'operation',
  MovementType = 'movement_type',
  Quantity = 'quantity',
  Product = 'product_id',
}

export enum MovementSearchType {
  product = 'product_id',
  movementType = 'movement_type',
  operation = 'operation',
}
