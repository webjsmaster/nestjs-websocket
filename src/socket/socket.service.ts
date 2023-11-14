import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SendMessageDto } from './dto/message.dto';
import { Inject, forwardRef } from '@nestjs/common';
import { MessagesService } from 'src/api/messages/messages.service';
import { CreateMessageDto } from 'src/api/messages/dto/messages.dto';
import { Server } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export default class SocketService implements OnGatewayConnection {

  constructor(
    @Inject(forwardRef(() => MessagesService))
    private readonly messagesRepository: MessagesService,
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

  
  async sendMessageDb(dto:SendMessageDto) {
    // return await this.messagesRepository.create( dto.userId, {partnerId:dto.friendId, message: dto.text} as CreateMessageDto)
  }



  handleConnection(client: any, ...args): any {
    console.log('[CONNECTED] 🚧: ');
  }
}
