import { Module } from '@nestjs/common';
import SocketService from './socket/socket.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { FriendsModule } from './api/friends/friends.module';
import { MessagesModule } from './api/messages/messages.module';
import { ChatsModule } from './api/chats/chats.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FriendsModule,
    MessagesModule,
    ChatsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SocketService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeoutInterceptor,
    // },
  ],
})
export class AppModule {}
