import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SendMessageDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly chatId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

export class ConnectedSocketDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly recipientId: string;
}

export class WriteMessageSocketDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly chatId: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;
}
