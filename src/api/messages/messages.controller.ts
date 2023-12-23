import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/decorators/get-user-from-token.decorator';
import { UserEntity } from '../users/entity/users.entity';

//npx @nestjs/cli g c users

@ApiTags('message')
@Controller('message')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @AuthUser() user: UserEntity,
    @Body() body: { chatId: string; content: string },
  ) {
    return this.messagesService.create(user.id, body);
  }
}
