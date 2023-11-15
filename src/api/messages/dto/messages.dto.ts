import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetMessagesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recipientId: string;
}

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  recipientId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}

