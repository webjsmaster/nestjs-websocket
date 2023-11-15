import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ConnectedSocketDto, SendMessageDto } from './dto/socket.dto';
import { ForbiddenException, Inject, UseGuards, forwardRef } from '@nestjs/common';
import { MessagesService } from 'src/api/messages/messages.service';
import { CreateMessageDto } from 'src/api/messages/dto/messages.dto';
import { Server } from 'socket.io';
import { ChatService } from 'src/api/chats/chats.service';
import { AuthUser } from 'src/decorators/get-user-from-token.decorator';
import { UserNewEntity } from 'src/api/users/entity/users-new.entity';
import { JwtService } from '@nestjs/jwt';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export default class SocketService implements OnGatewayConnection {

  constructor(
    @Inject(forwardRef(() => MessagesService))
    private readonly messagesRepository: MessagesService,

    @Inject(forwardRef(() => ChatService))
    private readonly chatsRepository: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;
 

  @SubscribeMessage('send-message')
  async handleEvent(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() client: any
    ) {
    console.log('🧬:', dto);

    const user = await this.getUserFromToken(client)
    await this.messagesRepository.create(user.id, {
      chatId: dto.chatId,
      content: dto.content
    })

    // client.emit('my-event', dto);
    // client.emit('client-path', dto);

    // this.server.emit('server-response', dto.text)
    const messages = await this.messagesRepository.getChatMessages(dto.chatId, {page: 0, take: 0, skip: 0})
    this.server.sockets.in(dto.chatId).emit('server-response-messages', {messages: messages.data, chatId: dto.chatId, meta: messages.meta})

    // return dto;

  }


  @SubscribeMessage('emit-server')
  async handleEvent2(@MessageBody() dto: ConnectedSocketDto, @ConnectedSocket() client: any) {
    const chat = await this.chatsRepository.create(dto.id, dto.recipientId)
    // this.server.socketsJoin(chat.id)

    // this.server.sockets.socketsJoin(chat.id)
    client.join(chat.id)
    const messages = await this.messagesRepository.getChatMessages(chat.id, {page: 0, skip: 0})
    this.server.sockets.in(chat.id).emit('server-response-messages', {messages: messages.data, chatId: chat.id, meta: messages.meta})
  }

  
  async getUserFromToken(client: any) {
    const token = client.handshake.query.token
    try {
      const jwt = new JwtService
      return jwt.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
    } catch (error) {
      client.emit('server-error', 'The user is not authorized')
      throw new ForbiddenException('The user is not authorized');
    }
  }

  
  async sendMessageDb(dto:SendMessageDto) {
    // return await this.messagesRepository.create( dto.userId, {recipientId:dto.recipientId, message: dto.text} as CreateMessageDto)
  }



  handleConnection(client: any, ...args): any {
    console.log('[CONNECTED] 🚧: ', args);
  }
}
