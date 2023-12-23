import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/api/users/entity/users.entity';
import { ChatEntity } from 'src/api/chats/entity/chat.entity';

export type MessageStatus = 1 | 2 | 3;

@Entity('messages')
export class MessageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'user_id' })
  user_id: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.messages, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column({ name: 'chat_id' })
  chat_id: string;

  @ManyToOne(() => ChatEntity, (chat: ChatEntity) => chat.messages, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'chat_id',
    referencedColumnName: 'id',
  })
  chat: ChatEntity;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: [1, 2, 3],
    default: 3,
  })
  status: MessageStatus;

  @ApiProperty()
  @CreateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  createdAt: number;

  @ApiProperty()
  @UpdateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  updatedAt: number;
}
