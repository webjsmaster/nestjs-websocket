import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

// entity для запроса getUserByArrayId, что-бы вернулся массив юзеров с ограниченными полями

@Entity('users')
export class UserFriendsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  login: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  version: number;

  @ApiProperty()
  @Column()
  avatar: string;

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  createdAt: number;

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  updatedAt: number;
}
