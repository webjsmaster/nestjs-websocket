import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "./entity/messges.entity";
import { Brackets, Repository } from "typeorm";
import { PageOptionsDto } from "../page/page-option.dto";
import { PageDto } from "../page/page.dto";
import { PageMetaDto } from "../page/page-meta.dto";
import { CreateMessageDto, GetMessagesDto, UpdateMessageDto } from "./dto/messages.dto";
import { UsersService } from "../users/users.service";
import { UserEntity } from "../users/entity/users.entity";
import { MessageNewEntity } from "./entity/new-messges.entity";
import { UserNewEntity } from "../users/entity/users-new.entity";
import { ChatService } from "../chats/chats.service";
import { ChatEntity } from "../chats/entity/chat.entity";



@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageNewEntity)
    private readonly messagesRepository: Repository<MessageNewEntity>,


    @Inject(forwardRef(() => ChatService))
    private readonly chatsService: ChatService,
  ) {}


  async create(id:string, body: {chatId: string, content: string}) {
    const message:MessageNewEntity = await this.messagesRepository.save({
      user_id: id,
      chat_id: body.chatId,
      content: body.content
    })

    return message
  }

  async getChatMessages(
    chatId: string,
    pageOptionsDto: PageOptionsDto,
  ) {
    const page = pageOptionsDto.page || 1
    const take = pageOptionsDto.take || 1000

    // const promise1:Promise<MessageNewEntity[]> = new Promise(resolve => resolve(this.messagesRepository.find({
    //   where: {
    //     from: id,
    //     to: user.id
    //   }
    // })))

    // const promise2:Promise<MessageNewEntity[]> = new Promise(resolve => resolve(this.messagesRepository.find({
    //   where: {
    //     from: user.id,
    //     to: id
    //   }
    // })))

    // const messages = await Promise.all([promise1, promise2])
    // .then(([response1, response2]) => [...response1, ...response2])


    const messages = await this.messagesRepository.find({
      where: {
        chat_id: chatId
      }
    })

    // const sortAndSlice = messages.sort((a,b) => a.createdAt - b.createdAt).slice((page - 1) * take, page * take)
    const pageMetaDto = new PageMetaDto({ itemCount: messages.length, pageOptionsDto });


    return new PageDto(messages, pageMetaDto);
  }

  // async create(id: string, createMessage: CreateMessageDto) {
      // return await this.messagesRepository.save({
      //   message: createMessage.message,
      //   from: id,
      //   to: createMessage.partnerId,
      //   status: 3,
      // });  
  // }

    // async getOne(id: string): Promise<UserEntity> {
  //   const user = await this.userRepository.findOne({ where: { id } });
  //   if (user) {
  //     return user;
  //   } else {
  //     throw new NotFoundException('User not found');
  //   }
  // }

  async update(id: string, messageDto: UpdateMessageDto) {
    // const message = await this.messagesRepository.findOne({ where: { id }});
    // if (!message) throw new NotFoundException('Message not found');
    // await this.messagesRepository.update(id, {
    //   message: messageDto.message,
    // });

    // return await this.messagesRepository.findOne({ where: { id }});
  }

  // async delete(id: string): Promise<{ status: string }> {
  //   const user: UserEntity = await this.getOne(id);
  //   if (user) {
  //     await this.userRepository.delete({ id: user.id });
  //     return { status: 'ok' };
  //   } else {
  //     throw new NotFoundException('User not found');
  //   }
  // }


}
