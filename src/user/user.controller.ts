import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ActivateDto } from '../common/dto/activate.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { ENDPOINTS } from 'src/common/constants/endpoints';
import { MODULES } from 'src/common/constants/modules';
import { CurrentBusiness } from 'src/auth/decorators/current-business.decorator';

@Controller(ENDPOINTS.USER)
@ApiTags(MODULES.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDto: UserDto, @CurrentBusiness() businessId: string) {
    return this.userService.create(userDto, businessId);
  }

  @Get()
  findAll(
    @Query() userQueryDto: UserQueryDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.userService.findAll(userQueryDto, businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentBusiness() businessId: string) {
    return this.userService.findOne(id, businessId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.userService.update(id, userDto, businessId);
  }

  @Patch(':id/activate')
  activate(
    @Param('id') id: string,
    @Body() activateDto: ActivateDto,
    @CurrentBusiness() businessId: string,
  ) {
    return this.userService.activate(id, activateDto, businessId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentBusiness() businessId: string) {
    return this.userService.remove(id, businessId);
  }
}
