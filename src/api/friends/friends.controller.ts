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
import { CreateFriendsDto } from './dto/friends.dto';
import { Public } from 'src/decorators/public.decorators';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Get()
  getAll() {
    return this.friendsService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.CREATED)
  getMyFiends(@Param('id', ParseUUIDPipe) id: string) {
    return this.friendsService.getUserFriends(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Delete('/:id')
  @HttpCode(HttpStatus.CREATED)
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { friendId }: { friendId: string },
  ) {
    return this.friendsService.deleteFriend(id, friendId);
  }

  @Public()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateFriends: CreateFriendsDto) {
    return this.friendsService.create(CreateFriends);
  }
}
