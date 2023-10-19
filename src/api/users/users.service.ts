import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUsersDto,
  UpdateAvatarUserDto,
  UpdateUserDto,
} from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
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
        version: 1,
        avatar: '',
      });
      return await this.getOne(user.id);
    }
  }

  async update(id: string, userInput: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getOne(id);
    if (!user) throw new NotFoundException('User not found');
    if (userInput.oldPassword === user.password) {
      await this.userRepository.update(id, {
        password: userInput.newPassword,
        version: ++user.version,
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
      version: ++user.version,
    });
    return await this.getOne(user.id);
  }

  async delete(id: string): Promise<DeleteResult> {
    const user: UserEntity = await this.getOne(id);
    if (user) {
      return await this.userRepository.delete({ id: user.id });
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

  async testing() {
    return new NotFoundException('User not found');
  }
}
