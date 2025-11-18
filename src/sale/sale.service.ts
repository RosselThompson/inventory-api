import { Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { SalePayment } from './entities/sale-payment.entity';
import { BusinessService } from 'src/business/business.service';
import { Business } from 'src/business/entities/business.entity';
import { runInTransaction } from 'src/common/helpers/run-in-transaction';
import {
  SaleSearchType,
  SaleStatusType,
} from 'src/common/constants/enums/sale.enum';
import { SaleDto } from './dto/sale.dto';
import { SaleItemDto } from './dto/sale-item.dto';
import { SalePaymentDto } from './dto/sale-payment.dto';
import {
  MovementOperationType,
  MovementReferenceType,
  MovementType,
} from 'src/common/constants/enums/movement.enum';
import { ProductService } from 'src/product/product.service';
import { SaleQueryDto } from './dto/sale-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { addSearchQuery } from 'src/common/helpers/search-query';
import { paginateData } from 'src/common/helpers/paginate-data';
import { validateUUID } from 'src/common/helpers/validations';
import { MODULES } from 'src/common/constants/modules';
import { httpBadRequest } from 'src/common/helpers/http-response';
import { notFoundIdMessage } from 'src/common/helpers/messages';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,

    @Inject(BusinessService)
    private readonly businessService: BusinessService,

    @Inject(ProductService)
    private readonly productService: ProductService,

    private readonly dataSource: DataSource,
  ) {}

  async create(createSaleDto: CreateSaleDto, businessId: string) {
    const { sale, items, payments } = createSaleDto;
    const business: Business = await this.businessService.findOne(businessId);

    return await runInTransaction(this.dataSource, async (manager) => {
      const savedSale = await this.createSaleWithManager(
        manager,
        sale,
        business.id,
      );

      const savedItems = await this.createSaleItemsWithManager(
        manager,
        items,
        savedSale.id,
        business.id,
      );

      const savedPayments = await this.createSalePaymentsWithManager(
        manager,
        payments,
        savedSale.id,
        business.id,
      );

      return { sale: savedSale, items: savedItems, payments: savedPayments };
    });
  }

  async findAll(saleQueryDto: SaleQueryDto, businessId: string) {
    const saleQueryBuilder = this.generateQueryBuilder(
      saleQueryDto,
      businessId,
    );
    const paginationData = await paginateData(
      DB_TABLE_NAMES.SALE,
      saleQueryDto,
      saleQueryBuilder,
    );
    return paginationData;
  }

  async findOne(id: string, businessId: string) {
    validateUUID(MODULES.SALE, id);
    const response = await this.saleRepository.findOne({
      where: { id, businessId },
      relations: ['items', 'payments'],
    });
    if (!response) throw httpBadRequest(notFoundIdMessage(MODULES.SALE, id));
    return response;
  }

  private generateQueryBuilder = (
    saleQueryDto: SaleQueryDto,
    businessId: string,
  ) => {
    const queryBuilder = this.saleRepository
      .createQueryBuilder(DB_TABLE_NAMES.SALE)
      .where(`${DB_TABLE_NAMES.SALE}.business_id = :businessId`, {
        businessId: businessId,
      });

    addSearchQuery(
      queryBuilder,
      SaleSearchType.saleNumber,
      saleQueryDto.s_sale_number,
    );

    addSearchQuery(
      queryBuilder,
      SaleSearchType.customerName,
      saleQueryDto.s_customer_name,
    );

    addSearchQuery(
      queryBuilder,
      SaleSearchType.saleStatus,
      saleQueryDto.s_sale_status,
    );

    return queryBuilder;
  };

  private createSaleWithManager = async (
    manager: EntityManager,
    sale: SaleDto,
    businessId: string,
  ) => {
    const newSale = manager.create(Sale, {
      ...sale,
      saleDate: new Date(),
      businessId: businessId,
      saleStatus: SaleStatusType.PAID,
    });

    return await manager.save(newSale);
  };

  private createSaleItemsWithManager = async (
    manager: EntityManager,
    items: SaleItemDto[],
    saleId: string,
    businessId: string,
  ) => {
    const newItems = [];

    for (const item of items) {
      const movementStockDto = {
        movementType: MovementType.Sale,
        operation: MovementOperationType.Decrement,
        quantity: item.quantity,
        referenceType: MovementReferenceType.Sales,
        referenceId: saleId,
      };

      await this.productService.updateStockWithManager(
        manager,
        item.productId,
        businessId,
        movementStockDto,
      );

      const entity = manager.create(SaleItem, {
        ...item,
        businessId,
        sale: { id: saleId },
        product: { id: item.productId },
      });

      newItems.push(entity);
    }

    return await manager.save(newItems);
  };

  private createSalePaymentsWithManager = async (
    manager: EntityManager,
    payments: SalePaymentDto[],
    saleId: string,
    businessId: string,
  ) => {
    const newPayments = payments.map((payment) =>
      manager.create(SalePayment, {
        ...payment,
        sale: { id: saleId },
        businessId,
      }),
    );

    return await manager.save(newPayments);
  };
}
