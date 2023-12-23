import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from '../page/page-option.dto';
import { PageDto } from '../page/page.dto';
import { PageMetaDto } from '../page/page-meta.dto';
import { MessageEntity } from './entity/messages.entity';
import { ChatService } from '../chats/chats.service';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>,

    @Inject(forwardRef(() => ChatService))
    private readonly chatsService: ChatService,
  ) {}

  async create(id: string, body: { chatId: string; content: string }) {
    const message: MessageEntity = await this.messagesRepository.save({
      user_id: id,
      chat_id: body.chatId,
      content: body.content,
    });
    return message;
  }

  async getChatMessages(chatId: string, pageOptionsDto: PageOptionsDto) {
    const messages = await this.messagesRepository.find({
      where: {
        chat_id: chatId,
      },
    });
    const pageMetaDto = new PageMetaDto({
      itemCount: messages.length,
      pageOptionsDto,
    });
    return new PageDto(messages, pageMetaDto);
  }
}
