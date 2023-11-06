import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "./entity/messges.entity";
import { Brackets, Repository } from "typeorm";
import { PageOptionsDto } from "../page/page-option.dto";
import { PageDto } from "../page/page.dto";
import { PageMetaDto } from "../page/page-meta.dto";
import { CreateMessageDto, GetMessagesDto, UpdateMessageDto } from "./dto/messages.dto";
import { UsersService } from "../users/users.service";



@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>,

    @Inject(forwardRef(() => UsersService))
    private readonly usersRepository: UsersService,
  ) {}

  async getMessages(
    pageOptionsDto: PageOptionsDto,
    id: string,
    createMessage: GetMessagesDto
  ): Promise<PageDto<MessageEntity>> {
    const page = pageOptionsDto.page || 1
    const take = pageOptionsDto.take || 10

    const promise1:Promise<MessageEntity[]> = new Promise(resolve => resolve(this.messagesRepository.find({
      where: {
        from: id,
        to: createMessage.partnerId
      }
    })))

    const promise2:Promise<MessageEntity[]> = new Promise(resolve => resolve(this.messagesRepository.find({
      where: {
        from: createMessage.partnerId,
        to: id
      }
    })))

    const messages = await Promise.all([promise1, promise2])
    .then(([response1, response2]) => [...response1, ...response2])
    const sortAndSlice = messages.sort((a,b) => a.createdAt - b.createdAt).slice((page - 1) * take, page * take)
    const pageMetaDto = new PageMetaDto({ itemCount: messages.length, pageOptionsDto });

    return new PageDto(sortAndSlice, pageMetaDto);
  }

  async create(id: string, createMessage: CreateMessageDto): Promise<MessageEntity> {
      return await this.messagesRepository.save({
        message: createMessage.message,
        from: id,
        to: createMessage.partnerId,
        status: 3,
      });  
  }

    // async getOne(id: string): Promise<UserEntity> {
  //   const user = await this.userRepository.findOne({ where: { id } });
  //   if (user) {
  //     return user;
  //   } else {
  //     throw new NotFoundException('User not found');
  //   }
  // }

  async update(id: string, messageDto: UpdateMessageDto) {
    const message = await this.messagesRepository.findOne({ where: { id }});
    if (!message) throw new NotFoundException('Message not found');
    await this.messagesRepository.update(id, {
      message: messageDto.message,
    });

    return await this.messagesRepository.findOne({ where: { id }});
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
