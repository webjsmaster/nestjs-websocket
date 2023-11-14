import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiBadReqMessage,
  ApiForbiddenMessage,
  ApiNotAuth,
  ApiPaginatedResponse,
} from 'src/decorators/response.decorators';
import { PageOptionsDto } from '../page/page-option.dto';
import { PageDto } from '../page/page.dto';
import { MessageEntity } from './entity/messges.entity';
import { CreateMessageDto, GetMessagesDto, UpdateMessageDto } from './dto/messages.dto';
import { ClosedAccessGuard } from 'src/guards/closed-access.guard';
import { Public } from 'src/decorators/public.decorators';
import { AuthUser } from 'src/decorators/get-user-from-token.decorator';
import { UserEntity } from '../users/entity/users.entity';
import { UserNewEntity } from '../users/entity/users-new.entity';

//npx @nestjs/cli g c users

@ApiTags('message')
@Controller('message')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @AuthUser() user: UserNewEntity,
    @Body() body: {chatId: string, content: string}
  ) {
    return this.messagesService.create(user.id, body);
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
