import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUsersDto,
  UpdateAvatarUserDto,
  UpdatePasswordUserDto,
} from './dto/users.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserFriendsEntity } from './entity/users-friends.entity';
import {
  ApiBadReqMessage,
  ApiBadReqUUIDNoValidation,
  ApiForbiddenMessage,
  ApiNotAuth,
  ApiNotFoundMessage,
  ApiPaginatedResponse,
} from 'src/decorators/response.decorators';
import { ClosedAccessGuard } from 'src/guards/closed-access.guard';
import { Public } from 'src/decorators/public.decorators';
import { PageOptionsDto } from '../page/page-option.dto';
import { PageDto } from '../page/page.dto';
import { UserEntity } from './entity/users.entity';

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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search for users by login' })
  @ApiPaginatedResponse(UserFriendsEntity)
  @ApiNotAuth()
  @ApiBadReqMessage('Incorrect query parameters are specified')
  @ApiQuery({ name: 'value', type: String })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/find')
  @HttpCode(HttpStatus.OK)
  getMany(
    @Query() value: { value: string },
    @Query() pageOptionsDto: PageOptionsDto,
    @Headers() body,
  ): Promise<PageDto<UserFriendsEntity>> {
    return this.usersService.getMany(pageOptionsDto, value, body);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @ApiNotAuth()
  @ApiBadReqUUIDNoValidation()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOne(id);
  }

  @ApiOperation({ summary: 'This endpoint is not used from outside' })
  @ApiForbiddenMessage('Forbidden resource')
  @ApiBody({ type: CreateUsersDto })
  @UseGuards(ClosedAccessGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateUser: CreateUsersDto) {
    return this.usersService.create(CreateUser);
  }

  @ApiBody({ type: UpdatePasswordUserDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdatePasswordUserDto,
  ) {
    return this.usersService.updatePassword(id, updateUser);
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

  @ApiOperation({ summary: 'Removing user' })
  @ApiResponse({
    status: 200,
    schema: {
      example: { status: 'ok' },
    },
  })
  @ApiNotFoundMessage('User not found')
  @ApiBadReqUUIDNoValidation()
  @ApiNotAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
