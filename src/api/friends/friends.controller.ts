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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Public } from 'src/decorators/public.decorators';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserFriendsEntity } from '../users/entity/users-friends.entity';
import { CreateFriendDto, DeleteFriendDto } from './dto/friends.dto';
import {
  ApiBadReqMessage,
  ApiBadReqUUIDNoValidation,
  ApiForbiddenMessage,
  ApiNotAuth,
  ApiStatusOkResponse,
} from 'src/decorators/response.decorators';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Public()
  // @Get()
  // getAll() {
  //   return this.friendsService.getAll();
  // }

  @ApiOperation({ summary: 'Get all friends user' })
  @ApiResponse({
    status: 201,
    type: UserFriendsEntity,
  })
  @ApiBadReqUUIDNoValidation()
  @ApiNotAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  @HttpCode(HttpStatus.CREATED)
  getUserFiends(@Param('id', ParseUUIDPipe) id: string) {
    return this.friendsService.getUserFriends(id);
  }

  @ApiOperation({ summary: 'Add user as friend' })
  @ApiResponse({
    status: 201,
    type: UserFriendsEntity
  })
  @ApiNotAuth()
  @ApiForbiddenMessage('Users are already friends')
  @ApiBadReqUUIDNoValidation()
  @ApiBadReqMessage(['friendId must be a UUID', 'friendId should not be empty'])
  @ApiBody({ type: CreateFriendDto })
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() friendId: CreateFriendDto,
  ): Promise<UserFriendsEntity> {
    return this.friendsService.create(id, friendId);
  }

  @ApiOperation({ summary: 'Remove a user from friends' })
  @ApiStatusOkResponse()
  @ApiBadReqUUIDNoValidation()
  @ApiBadReqMessage(['friendId must be a UUID', 'friendId should not be empty'])
  @ApiNotAuth()
  @ApiBody({ type: DeleteFriendDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  @HttpCode(HttpStatus.CREATED)
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { friendId }: DeleteFriendDto,
  ): Promise<UserFriendsEntity> {
    return this.friendsService.deleteFriend(id, friendId);
  }
}
