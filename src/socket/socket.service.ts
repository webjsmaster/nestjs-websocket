import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ConnectedSocketDto, SendMessageDto } from './dto/socket.dto';
import { Inject, forwardRef } from '@nestjs/common';
import { MessagesService } from 'src/api/messages/messages.service';
import { CreateMessageDto } from 'src/api/messages/dto/messages.dto';
import { Server } from 'socket.io';
import { ChatService } from 'src/api/chats/chats.service';


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
 

  @SubscribeMessage('server-path')
  async handleEvent(@MessageBody() dto: SendMessageDto, @ConnectedSocket() client: any) {
    console.log('🧬:', dto);

    // const message = await this.sendMessageDb(dto)

    // client.emit('my-event', dto);
    // client.emit('client-path', dto);

    // this.server.emit('server-response', dto.text)
    this.server.sockets.in('game').emit('server-response', dto.text)

    // return dto;

  }


  @SubscribeMessage('emit-server')
  async handleEvent2(@MessageBody() dto: ConnectedSocketDto, @ConnectedSocket() client: any) {
    const chat = await this.chatsRepository.create(dto.id, dto.recipientId)
    this.server.socketsJoin(chat.id)
    const messages = await this.messagesRepository.getChatMessages(chat.id, {page: 0, skip: 0})
    this.server.sockets.in(chat.id).emit('server-response-messages', messages)
    // this.server.emit('server-response-messages', messages)
  }

  

  
  async sendMessageDb(dto:SendMessageDto) {
    // return await this.messagesRepository.create( dto.userId, {partnerId:dto.friendId, message: dto.text} as CreateMessageDto)
  }



  handleConnection(client: any, ...args): any {
    console.log('[CONNECTED] 🚧: ', args);
  }
}
