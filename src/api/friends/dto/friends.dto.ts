import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFriendsDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly one: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly two: string;
}

export class GetFriendsDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}

export class DeleteFriendsDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly friendId: string;
}

export class ResponseCreateDto {
  @ApiProperty()
  readonly status: CustomEnum;
}

export enum CustomEnum {
  'ok',
}
