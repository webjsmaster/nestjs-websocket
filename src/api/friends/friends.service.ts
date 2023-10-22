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
import { CreateFriendsDto } from './dto/friends.dto';
import { UsersService } from '../users/users.service';

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

  async create(createFriends: CreateFriendsDto) {
    const checkUserTo = await this.usersRepository.getOne(createFriends.one);
    const checkUserFrom = await this.usersRepository.getOne(createFriends.two);

    if (!checkUserTo || !checkUserFrom) {
      throw new ForbiddenException('One or both users do not exist');
    } else {
      const friend: FriendsEntity = await this.friendsRepository.findOne({
        where: {
          one: createFriends.one,
          two: createFriends.two,
        },
      });
      if (friend) {
        throw new ForbiddenException('Users are already friends');
      } else {
        await this.friendsRepository.save({
          ...createFriends,
        });
        return { status: 'ok' };
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

  async deleteFriend(
    id: string,
    friendId: string,
  ): Promise<{ status: string }> {
    const friend: FriendsEntity = await this.friendsRepository.findOne({
      where: {
        one: id,
        two: friendId,
      },
    });
    if (friend) {
      await this.friendsRepository.delete({ id: friend.id });
      return { status: 'ok' };
    } else {
      throw new NotFoundException('Users are not friends');
    }
  }
}