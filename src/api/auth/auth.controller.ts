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
import {
  RefreshTokenDto,
  ResponseAuthDto,
  ResponseCheckAuthUserDto,
} from './dto/refresh.dto';
import { JwtRefreshGuard } from '../../guards/jwt-refresh.guard';

import { Public } from '../../decorators/public.decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from '../users/entity/users.entity';
import {
  ApiBadReqMessage,
  ApiForbiddenMessage,
  ApiNotAuth,
  ApiUnauthorizedMessage,
} from 'src/decorators/response.decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    type: ResponseAuthDto,
  })
  @ApiForbiddenMessage('Incorrect email or password')
  @ApiBody({ type: LoginUsersDto })
  @Public()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() userDTO: LoginUsersDto) {
    return this.authService.login(userDTO);
  }

  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({
    status: 201,
    description: 'Registration',
    type: UserEntity,
  })
  @ApiBadReqMessage([
    'login should not be empty',
    'login must be a string',
    'email should not be empty',
    'email must be an email',
    'email must be a string',
    'password should not be empty',
    'password must be a string',
  ])
  @ApiBody({ type: CreateUsersDto })
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  registration(@Body() userDTO: CreateUsersDto) {
    return this.authService.signup(userDTO);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Refresh token',
    type: ResponseAuthDto,
  })
  @ApiForbiddenMessage('RefreshToken no valid')
  @ApiUnauthorizedMessage(['RefreshToken should not be empty'])
  @ApiBody({ type: RefreshTokenDto })
  @Public()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refresh(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refresh(refreshToken);
  }

  @ApiOperation({ summary: 'Checking token activity' })
  @ApiResponse({
    status: 200,
    description: 'Check auth user',
    type: ResponseCheckAuthUserDto,
  })
  @ApiNotAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
