import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chats.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorators';
import { AuthUser } from 'src/decorators/get-user-from-token.decorator';
import { UserEntity } from '../users/entity/users.entity';

@ApiTags('chats')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll() {
    return this.chatService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @AuthUser() user: UserEntity,
    @Body() { recipientId }: { recipientId: string },
  ) {
    return this.chatService.create(user.id, recipientId);
  }
}
