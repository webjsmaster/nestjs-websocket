import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUsersDto, LoginUsersDto } from '../users/dto/users.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto, ResponseAuthDto, ResponseCheckAuthUserDto } from './dto/refresh.dto';
import { JwtRefreshGuard } from '../../guards/jwt-refresh.guard';

import { Public } from '../../decorators/public.decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/entity/users.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Авторизация по email',
    type: ResponseAuthDto,
  })
  @ApiBody({ type: LoginUsersDto })
  @Public()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() userDTO: LoginUsersDto) {
    return this.authService.login(userDTO);
  }

  @ApiResponse({
    status: 201,
    description: 'Registration',
    type: UserEntity,
  })
  @ApiBody({ type: CreateUsersDto })
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  registration(@Body() userDTO: CreateUsersDto) {
    return this.authService.signup(userDTO);
  }

  @ApiResponse({
    status: 200,
    description: 'Refresh token',
    type: ResponseAuthDto,
  })
  @ApiBody({ type: RefreshTokenDto })
  @Public()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refresh(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refresh(refreshToken);
  }

  @ApiResponse({
    status: 200,
    description: 'Check auth user',
    type: ResponseCheckAuthUserDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
