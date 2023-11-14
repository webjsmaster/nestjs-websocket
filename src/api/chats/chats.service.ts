import { Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectDataSource, InjectRepository, getRepositoryToken } from "@nestjs/typeorm";
import { DataSource, In, Repository, getRepository } from "typeorm";
import { ChatEntity } from "./entity/chat.entity";
import { UsersService } from "../users/users.service";




@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,

    @Inject(forwardRef(() => UsersService))
    private readonly usersRepository: UsersService,

    @InjectDataSource() private dataSource: DataSource
  ) {}


  async getAll () {
    return await this.chatRepository.find();
  }

  async create (id:string, recipientId:string ) {
    const checkChat = await this.chatRepository
      .createQueryBuilder('chats')
      .where('chats.users @> :users', {users: [id, recipientId]})
      .getOne()
  
    if (checkChat) return checkChat
    const chat = await this.chatRepository.save({
      users: [id, recipientId]
    })

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('users_chats')
      .values([
          { user_id: id, chat_id: chat.id },
      ])
      .execute()

    return chat
  }

  async getOne (id:string) {
    const chat = await this.chatRepository.findOne({ where: { id } });
    if (chat) {
      return chat;
    } else {
      throw new NotFoundException('Chat not found');
    }
  }

  async update (id:string, chat:ChatEntity) {
    // return await this.chatRepository.update(id, {
    //   message: chat.messages
    // })

    await this.dataSource
    .createQueryBuilder()
    .update(ChatEntity)
    .set({messages: ['tset']})
    .where("id = :id", { id })
    .execute()
  }
}
