import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('friends')
export class FriendsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  one: string;

  @Column()
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
