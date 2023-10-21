import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFriendsDto {
  @IsUUID()
  @IsNotEmpty()
  readonly one: string;

  @IsUUID()
  @IsNotEmpty()
  readonly two: string;
}

export class GetFriendsDto {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}
