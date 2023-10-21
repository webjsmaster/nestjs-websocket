import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendsDto, GetFriendsDto } from './dto/friends.dto';
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

  @Public()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateFriends: CreateFriendsDto) {
    return this.friendsService.create(CreateFriends);
  }
}
