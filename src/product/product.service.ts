import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ProductDto, UpdateProductStockDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { BusinessService } from 'src/business/business.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { addSearchQuery } from 'src/common/helpers/search-query';
import { ProductSearchType } from '../common/constants/enums/product.enum';
import { paginateData } from 'src/common/helpers/paginate-data';
import { validateUUID } from 'src/common/helpers/validations';
import { MODULES } from 'src/common/constants/modules';
import { httpBadRequest, httpOk } from 'src/common/helpers/http-response';
import { notFoundIdMessage } from 'src/common/helpers/messages';
import { removedRecordMessage } from '../common/helpers/messages';
import { MovementService } from 'src/movement/movement.service';
import { MovementDto } from 'src/movement/dto/movement.dto';
import {
  MovementOperationType,
  MovementType,
} from '../common/constants/enums/movement.enum';
import { runInTransaction } from 'src/common/helpers/run-in-transaction';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @Inject(BusinessService)
    private readonly businessService: BusinessService,

    @Inject(forwardRef(() => MovementService))
    private readonly movementService: MovementService,

    private readonly dataSource: DataSource,
  ) {}

  async create(productDto: ProductDto, businessId: string) {
    await this.businessService.findOne(businessId);

    return await runInTransaction(this.dataSource, async (manager) => {
      const product = manager.create(Product, {
        ...productDto,
        business: { id: businessId },
      });
      const savedProduct = await manager.save(product);
      await this.movementService.createWithManager(manager, {
        movementType: MovementType.InitialStock,
        operation: MovementOperationType.Increment,
        quantity: productDto.stockQuantity,
        updatedStock: productDto.stockQuantity,
        businessId,
        productId: savedProduct.id,
      });

      return savedProduct;
    });
  }

  async findAll(productQueryDto: ProductQueryDto, businessId: string) {
    const productQueryBuilder = this.generateQueryBuilder(
      productQueryDto,
      businessId,
    );
    const paginationData = await paginateData(
      DB_TABLE_NAMES.PRODUCT,
      productQueryDto,
      productQueryBuilder,
    );
    return paginationData;
  }

  async findOne(id: string, businessId: string) {
    validateUUID(MODULES.PRODUCT, id);
    const response = await this.productRepository.findOne({
      where: { id, business: { id: businessId } },
    });
    if (!response) throw httpBadRequest(notFoundIdMessage(MODULES.USER, id));
    return response;
  }

  async update(id: string, productDto: ProductDto, businessId: string) {
    validateUUID(MODULES.PRODUCT, id);
    await this.businessService.findOne(businessId);
    await this.productRepository.update(id, {
      name: productDto.name,
      sku: productDto.sku,
      unitOfMeasure: productDto.unitOfMeasure,
      price: productDto.price,
      currency: productDto.currency,
      description: productDto.description,
    });
    return await this.findOne(id, businessId);
  }

  async remove(id: string, businessId: string) {
    validateUUID(MODULES.PRODUCT, id);
    const product = await this.findOne(id, businessId);
    if (product.stockQuantity > 0) {
      throw httpBadRequest(
        `Cannot remove product with existing stock quantity.`,
      );
    }
    await this.productRepository.softDelete({ id });
    return httpOk(removedRecordMessage(MODULES.USER, id));
  }

  async updateStock(
    id: string,
    updateProductStockDto: UpdateProductStockDto,
    businessId: string,
  ) {
    validateUUID(MODULES.PRODUCT, id);
    const product = await this.findOne(id, businessId);
    const productId = product.id;

    const stockDifference =
      updateProductStockDto.stockQuantity - product.stockQuantity;

    const movementOperation =
      stockDifference >= 0
        ? MovementOperationType.Increment
        : MovementOperationType.Decrement;

    const movementDto: MovementDto = {
      movementType: MovementType.ManualAdjustment,
      operation: movementOperation,
      quantity: stockDifference,
      updatedStock: updateProductStockDto.stockQuantity,
      businessId,
      productId,
    };

    return await runInTransaction(this.dataSource, async (manager) => {
      await manager.update(
        Product,
        { id: productId },
        { stockQuantity: updateProductStockDto.stockQuantity },
      );
      await this.movementService.createWithManager(manager, movementDto);

      return { ...product, stockQuantity: updateProductStockDto.stockQuantity };
    });
  }

  private generateQueryBuilder = (
    productQueryDto: ProductQueryDto,
    businessId: string,
  ) => {
    const queryBuilder = this.productRepository
      .createQueryBuilder(DB_TABLE_NAMES.PRODUCT)
      .where(`${DB_TABLE_NAMES.PRODUCT}.business_id = :businessId`, {
        businessId: businessId,
      });

    addSearchQuery(
      queryBuilder,
      ProductSearchType.name,
      productQueryDto.s_name,
    );

    addSearchQuery(queryBuilder, ProductSearchType.sku, productQueryDto.s_sku);

    return queryBuilder;
  };
}
