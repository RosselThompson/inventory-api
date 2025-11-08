import { Injectable } from '@nestjs/common';
import { BusinessDto } from './dto/business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { httpBadRequest, httpOk } from 'src/common/helpers/http-response';
import {
  existingFieldMessage,
  notFoundIdMessage,
  removedRecordMessage,
} from 'src/common/helpers/messages';
import { BusinessQueryDto } from './dto/business-query.dto';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { addSearchQuery } from 'src/common/helpers/search-query';
import { BusinessSearchType } from 'src/common/constants/enums/business.enum';
import { paginateData } from 'src/common/helpers/paginate-data';
import { validateUUID } from 'src/common/helpers/validations';
import { MODULES } from 'src/common/constants/modules';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  async create(businessDto: BusinessDto) {
    await this.checkUniqueness(businessDto.legalId);
    return await this.businessRepository.save(businessDto);
  }

  async findAll(businessQueryDto: BusinessQueryDto) {
    const businessQueryBuilder = this.generateQueryBuilder(businessQueryDto);
    return await paginateData(
      DB_TABLE_NAMES.BUSINESS,
      businessQueryDto,
      businessQueryBuilder,
    );
  }

  async findOne(id: string) {
    validateUUID(MODULES.BUSINESS, id);
    const response = await this.businessRepository.findOneBy({ id });
    if (!response)
      throw httpBadRequest(notFoundIdMessage(MODULES.BUSINESS, id));
    return response;
  }

  async update(id: string, businessDto: BusinessDto) {
    validateUUID(MODULES.BUSINESS, id);
    await this.findOne(id);
    return await this.businessRepository.save({
      id,
      legalName: businessDto.legalName,
      tradeName: businessDto.tradeName,
      country: businessDto.country,
      city: businessDto.city,
      address: businessDto.address,
      phone: businessDto.phone,
      email: businessDto.email,
    });
  }

  async remove(id: string) {
    validateUUID(MODULES.BUSINESS, id);
    await this.findOne(id);
    await this.businessRepository.softDelete({ id });
    return httpOk(removedRecordMessage(MODULES.BUSINESS, id));
  }

  private async checkUniqueness(legalId: string) {
    const isExistingLegalId = await this.businessRepository.findOneBy({
      legalId,
    });
    if (isExistingLegalId)
      throw httpBadRequest(existingFieldMessage('LegalId', legalId));
  }

  private generateQueryBuilder = (businessQueryDto: BusinessQueryDto) => {
    const queryBuilder = this.businessRepository.createQueryBuilder(
      DB_TABLE_NAMES.BUSINESS,
    );

    addSearchQuery(
      queryBuilder,
      BusinessSearchType.LegalId,
      businessQueryDto.s_legalId,
    );
    addSearchQuery(
      queryBuilder,
      BusinessSearchType.LegalName,
      businessQueryDto.s_legalName,
    );
    addSearchQuery(
      queryBuilder,
      BusinessSearchType.TradeName,
      businessQueryDto.s_tradeName,
    );
    addSearchQuery(
      queryBuilder,
      BusinessSearchType.IsActive,
      businessQueryDto.s_isActive,
    );

    return queryBuilder;
  };
}
