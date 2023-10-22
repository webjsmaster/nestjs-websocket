import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { timestamp } from 'rxjs';

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
