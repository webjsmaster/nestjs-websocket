import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserFriendsEntity } from './entity/users-friends.entity';
import { UserEntity } from './entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserFriendsEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
