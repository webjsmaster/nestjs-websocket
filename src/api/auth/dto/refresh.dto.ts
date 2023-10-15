import { IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @IsNotEmpty()
  readonly refreshToken: string;
}
