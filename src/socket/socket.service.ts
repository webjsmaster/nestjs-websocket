import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export default class SocketService implements OnGatewayConnection {
  handleConnection(client: any, ...args): any {
    console.log('[CONNECTED] 🚧: ', client, args);
  }
}
