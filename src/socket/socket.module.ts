import { Module } from "@nestjs/common";
import { MessagesModule } from "src/api/messages/messages.module";

@Module({
  imports: [MessagesModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class SocketModule {}
