import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';


export class CreateChatDto {
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