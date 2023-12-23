import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from 'src/api/messages/entity/messages.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('chats')
export class ChatEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @OneToMany(() => MessageEntity, (messages: MessageEntity) => messages.chat, {
    cascade: true,
  })
  @JoinColumn({
    name: 'messages',
  })
  messages?: MessageEntity[];

  @ApiProperty({ type: [String] })
  @Column('varchar', { array: true })
  users?: string[];
}
