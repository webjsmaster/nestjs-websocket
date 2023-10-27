import { Module } from '@nestjs/common'
import { UserEntity } from './entity/users.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserFriendsEntity } from './entity/users-friends.entity'
import { AuthController } from '../auth/auth.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserFriendsEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
