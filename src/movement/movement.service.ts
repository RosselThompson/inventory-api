import { Injectable, Logger } from '@nestjs/common';
import { MovementDto } from './dto/movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { EntityManager, Repository } from 'typeorm';
import { MovementQueryDto } from './dto/movement-query.dto';
import { paginateData } from 'src/common/helpers/paginate-data';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { addSearchQuery } from 'src/common/helpers/search-query';
import { MovementSearchType } from 'src/common/constants/enums/movement.enum';
import { validateUUID } from 'src/common/helpers/validations';
import { MODULES } from 'src/common/constants/modules';
import { httpBadRequest } from 'src/common/helpers/http-response';
import { notFoundIdMessage } from 'src/common/helpers/messages';
import { movementLogMessage } from '../common/helpers/messages';
import { Business } from 'src/business/entities/business.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private movementRepository: Repository<Movement>,
  ) {}

  async createWithManager(manager: EntityManager, movementDto: MovementDto) {
    const businessExists = await manager.findOne(Business, {
      where: { id: movementDto.businessId },
    });
    if (!businessExists)
      throw httpBadRequest(
        notFoundIdMessage(MODULES.BUSINESS, movementDto.businessId),
      );

    const productExists = await manager.findOne(Product, {
      where: { id: movementDto.productId },
    });
    if (!productExists)
      throw httpBadRequest(
        notFoundIdMessage(MODULES.PRODUCT, movementDto.productId),
      );

    const movement = manager.create(Movement, {
      ...movementDto,
      quantity: Math.abs(movementDto.quantity),
      business: { id: movementDto.businessId },
      product: { id: movementDto.productId },
    });

    const savedMovement = await manager.save(movement);

    Logger.log(
      movementLogMessage(
        savedMovement.id,
        savedMovement.movementType,
        savedMovement.operation,
        savedMovement.quantity,
        savedMovement.product.id,
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
