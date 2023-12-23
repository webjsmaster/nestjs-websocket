import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendsEntity } from './entity/friends.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateFriendDto } from './dto/friends.dto';
import { UserFriendsEntity } from '../users/entity/users-friends.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendsEntity)
    private readonly friendsRepository: Repository<FriendsEntity>,

    @Inject(forwardRef(() => UsersService))
    private readonly usersRepository: UsersService,
  ) {}

  async getAll(): Promise<FriendsEntity[]> {
    return await this.friendsRepository.find();
  }

  async create(
    id: string,
    createFriends: CreateFriendDto,
  ): Promise<UserFriendsEntity> {
    const checkUserTo = await this.usersRepository.getOne(id);
    const checkUserFrom = await this.usersRepository.getOne(
      createFriends.friendId,
    );

    if (!checkUserTo || !checkUserFrom) {
      throw new ForbiddenException('One or both users do not exist');
    } else {
      const friend: FriendsEntity = await this.friendsRepository.findOne({
        where: {
          one: id,
          two: createFriends.friendId,
        },
      });
      if (friend) {
        throw new ForbiddenException('Users are already friends');
      } else {
        await this.friendsRepository.save({
          one: id,
          two: createFriends.friendId,
        });
        return await this.usersRepository.getOneForFriends(
          createFriends.friendId,
        );
      }
    }
  }

  async getUserFriends(id: string) {
    const checkUser = await this.usersRepository.getOne(id);
    if (checkUser) {
      const allFriends = await this.getFriendsById(id);
      const arrId = allFriends.map((f) => f.two);
      return this.usersRepository.getUserByArrayId(arrId);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getFriendsById(id: string) {
    return await this.friendsRepository.find({
      where: {
        one: id,
      },
    });
  }

  async deleteFriend(id: string, friendId: string): Promise<UserFriendsEntity> {
    const friend: FriendsEntity = await this.friendsRepository.findOne({
      where: {
        one: id,
        two: friendId,
      },
    });
    if (friend) {
      await this.friendsRepository.delete({ id: friend.id });
      return await this.usersRepository.getOneForFriends(friendId);
    } else {
      throw new NotFoundException('Users are not friends');
    }
  }
}
