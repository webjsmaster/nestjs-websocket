import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export default class SocketService implements OnGatewayConnection {
  
  @SubscribeMessage('server-path')
  handleEvent(@MessageBody() dto: any, @ConnectedSocket() client: any) {
    console.log('🧬:', dto);
    const res = { type: 'someType', dto };
    client.emit('client-path', res);
  }

  handleConnection(client: any, ...args): any {
    console.log('[CONNECTED] 🚧: ');
  }
}
