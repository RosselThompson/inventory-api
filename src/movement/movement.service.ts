import { Injectable, Inject, Logger, forwardRef } from '@nestjs/common';
import { MovementDto } from './dto/movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { Repository } from 'typeorm';
import { BusinessService } from 'src/business/business.service';
import { MovementQueryDto } from './dto/movement-query.dto';
import { paginateData } from 'src/common/helpers/paginate-data';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { addSearchQuery } from 'src/common/helpers/search-query';
import { MovementSearchType } from 'src/common/constants/enums/movement.enum';
import { validateUUID } from 'src/common/helpers/validations';
import { MODULES } from 'src/common/constants/modules';
import { httpBadRequest } from 'src/common/helpers/http-response';
import { notFoundIdMessage } from 'src/common/helpers/messages';
import { ProductService } from '../product/product.service';
import { movementLogMessage } from '../common/helpers/messages';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private movementRepository: Repository<Movement>,

    @Inject(BusinessService)
    private readonly businessService: BusinessService,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async create(movementDto: MovementDto, businessId: string) {
    const business = await this.businessService.findOne(businessId);
    const product = await this.productService.findOne(
      movementDto.productId,
      businessId,
    );
    const movement = { ...movementDto, businessId: business.id, product };
    const savedMovement = await this.movementRepository.save(movement);
    Logger.log(
      movementLogMessage(
        movementDto.movementType,
        movementDto.operation,
        movementDto.productId,
        movementDto.quantity.toString(),
      ),
    );
    return savedMovement;
  }

  async findAll(movementQueryDto: MovementQueryDto, businessId: string) {
    const movementQueryBuilder = this.generateQueryBuilder(
      movementQueryDto,
      businessId,
    );
    const paginationData = await paginateData(
      DB_TABLE_NAMES.MOVEMENT,
      movementQueryDto,
      movementQueryBuilder,
    );
    return paginationData;
  }

  async findOne(id: string, businessId: string) {
    validateUUID(MODULES.MOVEMENT, id);
    const response = await this.movementRepository.findOne({
      where: { id, businessId },
    });
    if (!response)
      throw httpBadRequest(notFoundIdMessage(MODULES.MOVEMENT, id));
    return response;
  }

  private generateQueryBuilder = (
    movementQueryDto: MovementQueryDto,
    businessId: string,
  ) => {
    const queryBuilder = this.movementRepository
      .createQueryBuilder(DB_TABLE_NAMES.MOVEMENT)
      .where(`${DB_TABLE_NAMES.MOVEMENT}.business_id = :businessId`, {
        businessId: businessId,
      });

    addSearchQuery(
      queryBuilder,
      MovementSearchType.movementType,
      movementQueryDto.s_movement_type,
    );

    addSearchQuery(
      queryBuilder,
      MovementSearchType.operation,
      movementQueryDto.s_operation,
    );

    addSearchQuery(
      queryBuilder,
      MovementSearchType.product,
      movementQueryDto.s_product,
    );

    return queryBuilder;
  };
}
