import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "./entity/messges.entity";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { UsersModule } from "../users/users.module";
import { MessageNewEntity } from "./entity/new-messges.entity";
import { ChatsModule } from "../chats/chats.module";
import { ChatEntity } from "../chats/entity/chat.entity";
import { ChatService } from "../chats/chats.service";

@Module({
  imports: [TypeOrmModule.forFeature([MessageNewEntity]), ChatsModule],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
