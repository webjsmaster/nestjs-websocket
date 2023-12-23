import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from 'src/api/messages/entity/messages.entity';
import { ChatEntity } from 'src/api/chats/entity/chat.entity';
import { UserStatus } from '../types/user-types';

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  login: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: [1, 2, 3],
    default: 3,
  })
  status: UserStatus;

  @ApiProperty()
  @Column()
  avatar: string;

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

  @OneToMany(() => MessageEntity, (message: MessageEntity) => message.user, {
    cascade: true,
  })
  messages: MessageEntity[];

  @ManyToMany(() => ChatEntity)
  @JoinTable({
    name: 'users_chats',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'chat_id',
      referencedColumnName: 'id',
    },
  })
  chats: ChatEntity[];
}
