import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export type MessageStatus = 1 | 2 | 3

// @Entity('messages')
export class MessageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  message: string;

  @ApiProperty()
  @Column()
  from: string;

  @ApiProperty()
  @Column()
  to: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: [1,2,3],
    default: 3
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

  constructor(partial: Partial<MessageEntity>) {
    Object.assign(this, partial);
  }
}


