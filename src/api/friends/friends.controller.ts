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
import { CreateFriendsDto, DeleteFriendsDto } from './dto/friends.dto';
import { Public } from 'src/decorators/public.decorators';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserFriendsEntity } from '../users/entity/users-friends.entity';

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

  @ApiResponse({
    status: 201,
    type: UserFriendsEntity,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.CREATED)
  getMyFiends(@Param('id', ParseUUIDPipe) id: string) {
    return this.friendsService.getUserFriends(id);
  }

  @ApiResponse({
    status: 201,
    schema: {
      example: { status: 'ok' },
    },
  })
  @ApiBody({ type: CreateFriendsDto })
  @Public()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateFriends: CreateFriendsDto) {
    return this.friendsService.create(CreateFriends);
  }

  @ApiResponse({
    status: 201,
    schema: {
      example: { status: 'ok' },
    },
  })
  @ApiBody({ type: DeleteFriendsDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Delete('/:id')
  @HttpCode(HttpStatus.CREATED)
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { friendId }: DeleteFriendsDto,
  ) {
    return this.friendsService.deleteFriend(id, friendId);
  }
}
