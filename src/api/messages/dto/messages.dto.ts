import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetMessagesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partnerId: string;
}

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}

