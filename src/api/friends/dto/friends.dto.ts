import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFriendDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly friendId: string;
}

export class GetFriendDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}

export class DeleteFriendDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly friendId: string;
}
