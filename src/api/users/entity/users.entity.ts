import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  version: number;

  @Column()
  avatar: string;

  @CreateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  createdAt: number;

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
