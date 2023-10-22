import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @ManyToOne(() => UserEntity, (user) => user.id)
  one: string;

  @ApiProperty()
  @Column()
  @ManyToOne(() => UserEntity, (user) => user.id)
  two: string;

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

  constructor(partial: Partial<FriendsEntity>) {
    Object.assign(this, partial);
  }
}
