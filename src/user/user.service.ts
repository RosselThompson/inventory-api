import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/common/helpers/hash-password';
import { httpBadRequest, httpOk } from 'src/common/helpers/http-response';
import {
  changedStatusMessage,
  existingFieldMessage,
  notFoundIdMessage,
  removedRecordMessage,
} from 'src/common/helpers/messages';
import { UserSearchType } from 'src/common/constants/enums/user.enum';
import { paginateData } from 'src/common/helpers/paginate-data';
import { addSearchQuery } from 'src/common/helpers/search-query';
import { validateUUID } from 'src/common/helpers/validations';
import { MODULES } from 'src/common/constants/modules';
import { ActivateDto } from '../common/dto/activate.dto';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { BusinessService } from 'src/business/business.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(BusinessService)
    private readonly businessService: BusinessService,
  ) {}

  async create(userDto: UserDto, businessId: string) {
    await this.checkUniqueUser(userDto.username);
    const business = await this.businessService.findOne(businessId);
    const hash = await hashPassword(userDto.password);
    const user = { ...userDto, business, password: hash };
    return await this.userRepository.save(user);
  }

  async findAll(userQueryDto: UserQueryDto, businessId: string) {
    const userQueryBuilder = this.generateQueryBuilder(
      userQueryDto,
      businessId,
    );
    const paginationData = await paginateData(
      DB_TABLE_NAMES.USER,
      userQueryDto,
      userQueryBuilder,
    );
    return paginationData;
  }

  async findOne(id: string, businessId: string) {
    validateUUID(MODULES.USER, id);
    const response = await this.userRepository.findOne({
      where: { id, business: { id: businessId } },
    });
    if (!response) throw httpBadRequest(notFoundIdMessage(MODULES.USER, id));
    return response;
  }

  async update(id: string, userDto: UserDto, businessId: string) {
    validateUUID(MODULES.USER, id);
    await this.userRepository.update(id, {
      nid: userDto.nid,
      firstname: userDto.firstname,
      lastname: userDto.lastname,
      email: userDto.email,
      cellphone: userDto.cellphone,
    });
    return await this.findOne(id, businessId);
  }

  async remove(id: string, businessId: string) {
    validateUUID(MODULES.USER, id);
    await this.findOne(id, businessId);
    await this.userRepository.softDelete({ id });
    return httpOk(removedRecordMessage(MODULES.USER, id));
  }

  async activate(id: string, activateDto: ActivateDto, businessId: string) {
    validateUUID(MODULES.USER, id);
    await this.findOne(id, businessId);
    await this.userRepository.update(id, {
      isActive: activateDto.isActive,
    });
    return httpOk(changedStatusMessage(MODULES.USER, id));
  }

  async checkUniqueUser(username: string) {
    const isExistingUsername = await this.findByUsername(username);
    if (isExistingUsername)
      throw httpBadRequest(
        existingFieldMessage(UserSearchType.Username, username),
      );
  }

  generateQueryBuilder = (userQueryDto: UserQueryDto, businessId: string) => {
    const queryBuilder = this.userRepository
      .createQueryBuilder(DB_TABLE_NAMES.USER)
      .where(`${DB_TABLE_NAMES.USER}.business_id = :businessId`, {
        businessId: businessId,
      })
      .where(`${DB_TABLE_NAMES.USER}.is_visible = :isVisible`, {
        isVisible: true,
      });

    addSearchQuery(
      queryBuilder,
      UserSearchType.Username,
      userQueryDto.s_username,
    );

    addSearchQuery(
      queryBuilder,
      UserSearchType.IsActive,
      userQueryDto.s_isActive,
    );

    return queryBuilder;
  };

  /*
    NOTE: The functions findByUsername, findByUserId are used in authentication process.
  */
  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      relations: { business: true },
    });
  }

  async findByUserId(id: string) {
    const response = await this.userRepository.findOne({
      where: { id },
      relations: { business: true },
    });
    if (!response) return null;
    return response;
  }
}
