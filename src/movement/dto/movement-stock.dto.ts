import {
  MovementOperationType,
  MovementReferenceType,
  MovementType,
} from 'src/common/constants/enums/movement.enum';

export class MovementStockDto {
  quantity: number;
  movementType: MovementType;
  operation: MovementOperationType;
  reference?: MovementReferenceType;
  referenceId?: string;
}
