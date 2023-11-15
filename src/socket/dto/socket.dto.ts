import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

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

