import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUsersDto } from '../users/dto/users.dto';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { JwtRefreshGuard } from '../../guards/jwt-refresh.guard';

import { Public } from '../../decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() userDTO: CreateUsersDto) {
    return this.authService.login(userDTO);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  registration(@Body() userDTO: CreateUsersDto) {
    return this.authService.signup(userDTO);
  }

  @Public()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refresh(@Body() refreshToken: RefreshDto) {
    return this.authService.refresh(refreshToken);
  }
}
