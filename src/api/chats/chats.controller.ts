import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService} from './chats.service';
import {ApiTags} from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorators';
import { AuthUser } from 'src/decorators/get-user-from-token.decorator';
import { UserNewEntity } from '../users/entity/users-new.entity';


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
    @AuthUser() user: UserNewEntity,
    @Body() {recipientId}: {recipientId: string}
  ) {
    return this.chatService.create(user.id, recipientId);
  }

  
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Get all user messages and his interlocutor' })
  // @ApiPaginatedResponse(MessageEntity)
  // @ApiNotAuth()
  // @ApiBadReqMessage('Incorrect query parameters are specified')
  // @ApiQuery({ name: 'value', type: String })
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // getMessageUser(
  //   @AuthUser() user: UserNewEntity,
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Query() pageOptionsDto: PageOptionsDto,
  //   ) {
  //   return this.messagesService.getMessages(id, user, pageOptionsDto);
  // }

  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Get all user messages and his interlocutor' })
  // @ApiNotAuth()
  // @ApiBody({ type: CreateMessageDto })
  // @UsePipes(ValidationPipe)
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Post(':id')
  // @HttpCode(HttpStatus.CREATED)
  // create(@Param('id', ParseUUIDPipe) id: string, @Body() createMessage: CreateMessageDto) {
  //   return this.messagesService.create(id, createMessage);
  // }


  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Update message' })
  // @ApiBody({ type: UpdateMessageDto })
  // @UseInterceptors(ClassSerializerInterceptor)
  // @UsePipes(ValidationPipe)
  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() messageDto: UpdateMessageDto,
  // ) {
  //   return this.messagesService.update(id, messageDto);
  // }


  // @ApiOperation({ summary: 'Removing user' })
  // @ApiResponse({
  //   status: 200,
  //   schema: {
  //     example: { status: 'ok' },
  //   },
  // })
  // @ApiNotFoundMessage('User not found')
  // @ApiBadReqUUIDNoValidation()
  // @ApiNotAuth()
  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // delete(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.usersService.delete(id);
  // }
}
