import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserActivateDto } from './dto/user-activate.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { ENDPOINTS } from 'src/common/constants/endpoints';
import { MODULES } from 'src/common/constants/modules';

@Controller(ENDPOINTS.USER)
@ApiTags(MODULES.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  findAll(@Query() userQueryDto: UserQueryDto) {
    return this.userService.findAll(userQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.update(id, userDto);
  }

  @Put(':id/activate')
  activate(@Param('id') id: string, @Body() userActivateDto: UserActivateDto) {
    return this.userService.activate(id, userActivateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
