import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUsersDto, LoginUsersDto } from '../users/dto/users.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as process from 'process';
import { RefreshTokenDto } from './dto/refresh.dto';
import { UserEntity } from '../users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(@Body() userDTO: LoginUsersDto) {
    const user = await this.validateUser(userDTO);
    const { id, login, avatar } = user;
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
      user: { id, login, avatar },
    };
  }

  async signup(@Body() userDTO: CreateUsersDto): Promise<UserEntity> {
    const hashPassword = await bcrypt.hash(
      userDTO.password,
      +process.env.CRYPT_SALT,
    );

    return await this.usersService.create({
      ...userDTO,
      password: hashPassword,
    });
  }

  async refresh(refreshData: RefreshTokenDto) {
    const user = this.jwtService.verify(refreshData.refreshToken);
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async generateAccessToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id };
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

  private async validateUser(userDTO: LoginUsersDto) {
    const user = await this.usersService.getUserByEmail(userDTO.email);
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
