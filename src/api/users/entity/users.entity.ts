import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

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
  @Column()
  version: number;

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

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  toResponse() {
    const { id, login, version, createdAt, updatedAt, email, avatar } = this;
    return { id, login, version, createdAt, updatedAt, email, avatar };
  }
}
