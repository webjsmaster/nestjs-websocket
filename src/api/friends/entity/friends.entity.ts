import { UserEntity } from 'src/api/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('friends')
export class FriendsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ManyToOne(() => UserEntity, (user) => user.id)
  one: string;

  @Column()
  @ManyToOne(() => UserEntity, (user) => user.id)
  two: string;

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

  constructor(partial: Partial<FriendsEntity>) {
    Object.assign(this, partial);
  }

  // toResponse() {
  //   const { id, login, version, createdAt, updatedAt, email, avatar } = this;
  //   return { id, login, version, createdAt, updatedAt, email, avatar };
  // }
}
