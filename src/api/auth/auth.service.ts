import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from '../users/dto/users.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entity/users.entity';
import * as process from 'process';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(@Body() userDTO: CreateUsersDto) {
    const user = await this.validateUser(userDTO);

    console.log('USER', user);
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async signup(@Body() userDTO: CreateUsersDto): Promise<UserEntity> {
    // TODO =================================>
    // const candidate = await this.usersService.getUserByLogin(userDTO.login)
    // if (candidate) {
    //   throw new HttpException('User with such login exists', HttpStatus.BAD_REQUEST)
    // }

    // TODO ========================> Commented for tests
    const hashPassword = await bcrypt.hash(
      userDTO.password,
      +process.env.CRYPT_SALT,
    );
    return await this.usersService.create({
      ...userDTO,
      password: hashPassword,
    });
  }

  async refresh(refreshData: RefreshDto) {
    const user = this.jwtService.verify(refreshData.refreshToken);
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async generateAccessToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id };
    console.log('JWT_SECRET_KEY', process.env.JWT_SECRET_KEY);
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    });
  }

  async generateRefreshToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY || 'SECRET_REFRESH_KEY',
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
    });
  }

  private async validateUser(userDTO: CreateUsersDto) {
    const user = await this.usersService.getUserByLogin(userDTO.login);
    if (!user) {
      throw new ForbiddenException('Incorrect email or password');
    }
    const passwordEquals = await bcrypt.compare(
      userDTO.password,
      user.password,
    );
    if (passwordEquals) {
      return user;
    } else {
      throw new ForbiddenException('Incorrect email or password');
    }
  }
}
