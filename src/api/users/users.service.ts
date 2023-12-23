import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUsersDto,
  UpdateAvatarUserDto,
  UpdatePasswordUserDto,
} from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserFriendsEntity } from './entity/users-friends.entity';
import { getUserIdToHeadersAuth } from 'src/helper/getUserToHeadersAuth';
import { PageDto } from '../page/page.dto';
import { PageOptionsDto } from '../page/page-option.dto';
import { PageMetaDto } from '../page/page-meta.dto';
import { UserEntity } from './entity/users.entity';
import { UserStatus } from './types/user-types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserFriendsEntity)
    private readonly userFriendsRepository: Repository<UserFriendsEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: ['chats'],
    });
  }

  async getMany(
    pageOptionsDto: PageOptionsDto,
    { value }: { value: string },
    body: Body,
  ): Promise<PageDto<UserFriendsEntity>> {
    if (value === undefined) {
      throw new BadRequestException('Incorrect query parameters are specified');
    }

    const queryBuilder = this.userFriendsRepository.createQueryBuilder('user');

    queryBuilder
      .where('user.login like :value', { value: '%' + value + '%' })
      .andWhere('user.id != :id', { id: getUserIdToHeadersAuth(body) })
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    if (!value)
      return new PageDto(
        [],
        new PageMetaDto({
          itemCount: 0,
          pageOptionsDto: { skip: 0, page: 1, take: 0 },
        }),
      );

    return new PageDto(entities, pageMetaDto);
  }

  async getOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getOneForFriends(id: string): Promise<UserFriendsEntity> {
    const user = await this.userFriendsRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async create(userInput: CreateUsersDto): Promise<UserEntity> {
    const checkUserLoginVerification = await this.getUserByLogin(
      userInput.login,
    );
    const checkUserEmailVerification = await this.getUserByEmail(
      userInput.email,
    );
    if (checkUserEmailVerification) {
      throw new ForbiddenException(
        'User with this email is already registered',
      );
    } else if (checkUserLoginVerification) {
      throw new ForbiddenException('This login is already in use');
    } else {
      const user = await this.userRepository.save({
        ...userInput,
        avatar: '',
      });
      return await this.getOne(user.id);
    }
  }

  async updatePassword(
    id: string,
    userInput: UpdatePasswordUserDto,
  ): Promise<UserEntity> {
    const user = await this.getOne(id);
    if (!user) throw new NotFoundException('User not found');
    if (userInput.oldPassword === user.password) {
      await this.userRepository.update(id, {
        password: userInput.newPassword,
      });
      return await this.getOne(user.id);
    } else {
      throw new ForbiddenException('Old password is not correct');
    }
  }

  async updateAvatar(id: string, avatar: UpdateAvatarUserDto) {
    const user = await this.getOne(id);
    await this.userRepository.update(id, {
      avatar: avatar.avatar,
    });
    return await this.getOne(user.id);
  }

  async updateStatus(id: string, status: UserStatus) {
    const user = await this.getOne(id);
    await this.userRepository.update(id, {
      status,
    });
    return await this.getOne(user.id);
  }

  async delete(id: string): Promise<{ status: string }> {
    const user: UserEntity = await this.getOne(id);
    if (user) {
      await this.userRepository.delete({ id: user.id });
      return { status: 'ok' };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getUserByLogin(login: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { login } });
    return !!user ? user : null;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user ? user : null;
  }

  async getUserByArrayId(arrId: string[]): Promise<UserFriendsEntity[]> {
    return await this.userFriendsRepository.find({
      where: { id: In([...arrId]) },
    });
  }

  async testing() {
    return new NotFoundException('User not found');
  }
}
