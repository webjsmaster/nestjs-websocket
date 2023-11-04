import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserFriendsEntity } from 'src/api/users/entity/users-friends.entity';

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly refreshToken: string;
}

export class ResponseAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly refreshToken: string;

  @ApiProperty()
  @IsNotEmpty()
  user: UserFriendsEntity;
}

export class ResponseCheckAuthUserDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly login: string;

  @ApiProperty()
  readonly iat: number;

  @ApiProperty()
  readonly exp: number;
}
