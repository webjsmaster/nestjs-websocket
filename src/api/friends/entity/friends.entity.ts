import { ApiProperty } from '@nestjs/swagger';
import { UserNewEntity } from 'src/api/users/entity/users-new.entity';
import { UserEntity } from 'src/api/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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
  @OneToOne(() => UserNewEntity, (user) => user.id)
  public one: string;

  @ApiProperty()
  @Column()
  @OneToOne(() => UserNewEntity, (user) => user.id)
  public two: string;

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
