import { PaginationOptionsDto } from '../dto/pagination-options.dto';

export interface PaginationMetaInterface {
  pageOptionsDto: PaginationOptionsDto;
  itemCount: number;
}
