import { Injectable } from '@nestjs/common';
import { BusinessDto } from './dto/business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { httpBadRequest } from 'src/common/helpers/http-response';
import { notFoundIdMessage } from 'src/common/helpers/messages';
import { validateUUID } from 'src/common/helpers/validations';
import { MODULES } from 'src/common/constants/modules';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

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
      tradeName: businessDto.tradeName,
      country: businessDto.country,
      city: businessDto.city,
      address: businessDto.address,
      phone: businessDto.phone,
      email: businessDto.email,
    });
  }
}
