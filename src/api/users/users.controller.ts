import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateAvatarUserDto, UpdateUserDto } from './dto/users.dto';

//npx @nestjs/cli g c users

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOne(id);
  }

  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateUser: CreateUsersDto) {
    return this.usersService.create(CreateUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  updateAvatar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() avatar: UpdateAvatarUserDto,
  ) {
    // console.log('🚀:', id, avatar);
    return this.usersService.updateAvatar(id, avatar);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }

  @Get('/test/1')
  testing() {
    return this.usersService.testing();
  }
}
