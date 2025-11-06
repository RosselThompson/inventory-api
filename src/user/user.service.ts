import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/common/helpers/hash-password';
import { httpBadRequest, httpOk } from 'src/common/helpers/http-response';
import {
  changeStatusMessage,
  existingFieldMessage,
  notFoundIdMessage,
  removedRecordMessage,
} from 'src/common/helpers/messages';
import { UserSearchType } from 'src/common/constants/enums/user.enum';
import { paginateData } from 'src/common/helpers/paginate-data';
import { addSearchQuery } from 'src/common/helpers/search-query';
import { validateUUID } from 'src/common/helpers/validations';
import { MODULES } from 'src/common/constants/modules';
import { UserActivateDto } from './dto/user-activate.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto) {
    await this.checkUniqueUser(userDto.username);
    const hash = await hashPassword(userDto.password);
    const user = { ...userDto, password: hash };
    return await this.userRepository.save(user);
  }

  async findAll(userQueryDto: UserQueryDto) {
    const userQueryBuilder = this.generateQueryBuilder(userQueryDto);
    const paginationData = await paginateData(
      MODULES.USER,
      userQueryDto,
      userQueryBuilder,
    );
    return paginationData;
  }

  async findOne(id: string) {
    validateUUID(MODULES.USER, id);
    const response = await this.userRepository.findOneBy({ id });
    if (!response) throw httpBadRequest(notFoundIdMessage(MODULES.USER, id));
    return response;
  }

  async update(id: string, userDto: UserDto) {
    validateUUID(MODULES.USER, id);
    await this.userRepository.update(id, {
      nid: userDto.nid,
      firstname: userDto.firstname,
      lastname: userDto.lastname,
      email: userDto.email,
      cellphone: userDto.cellphone,
    });
    return await this.findOne(id);
  }

  async remove(id: string) {
    validateUUID(MODULES.USER, id);
    await this.findOne(id);
    await this.userRepository.softDelete({ id });
    return httpOk(removedRecordMessage(MODULES.USER));
  }

  async activate(id: string, userActivateDto: UserActivateDto) {
    validateUUID(MODULES.USER, id);
    await this.findOne(id);
    await this.userRepository.update(id, {
      isActive: userActivateDto.isActive,
    });
    return httpOk(changeStatusMessage(MODULES.USER, id));
  }

  async checkUniqueUser(username: string) {
    const isExistingUsername = await this.findByUsername(username);
    if (isExistingUsername)
      throw httpBadRequest(
        existingFieldMessage(UserSearchType.Username, username),
      );
  }

  generateQueryBuilder = (userQueryDto: UserQueryDto) => {
    const queryBuilder = this.userRepository.createQueryBuilder(MODULES.USER);

    addSearchQuery(
      queryBuilder,
      UserSearchType.Username,
      userQueryDto.s_username,
    );
    addSearchQuery(queryBuilder, UserSearchType.Role, userQueryDto.s_role);
    addSearchQuery(queryBuilder, UserSearchType.Nid, userQueryDto.s_nid);
    addSearchQuery(queryBuilder, UserSearchType.Email, userQueryDto.s_email);

    return queryBuilder;
  };

  /*
    NOTE: The functions findByUsername, findByUserId are used in authentication process.
  */
  async findByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async findByUserId(id: string) {
    const response = await this.userRepository.findOneBy({ id });
    if (!response) return null;
    return response;
  }
}
