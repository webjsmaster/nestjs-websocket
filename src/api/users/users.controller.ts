import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import {
  CreateUsersDto,
  UpdateAvatarUserDto,
  UpdateUserDto,
} from './dto/users.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserFriendsEntity } from './entity/users-friends.entity';
import { UserEntity } from './entity/users.entity';
import { Public } from 'src/decorators/public.decorators';

//npx @nestjs/cli g c users

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiResponse({
    status: 200,
    type: UserFriendsEntity,
  })
  @ApiQuery({ name: 'value', type: String })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/find')
  @HttpCode(HttpStatus.OK)
  getMany(@Query() value: { value: string }) {
    return this.usersService.getMany(value);
  }

  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOne(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create user',
    type: UserEntity,
  })
  @ApiBody({ type: CreateUsersDto })
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateUser: CreateUsersDto) {
    return this.usersService.create(CreateUser);
  }

  @ApiBody({ type: UpdateUserDto })
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

  @ApiBody({ type: UpdateAvatarUserDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  updateAvatar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() avatar: UpdateAvatarUserDto,
  ) {
    return this.usersService.updateAvatar(id, avatar);
  }

  @ApiResponse({
    status: 204,
    schema: {
      example: { status: 'ok' },
    },
  })
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
