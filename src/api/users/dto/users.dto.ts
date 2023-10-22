import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class LoginUsersDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class UpdateAvatarUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatar: string;
}
