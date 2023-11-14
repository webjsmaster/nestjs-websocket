import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SendMessageDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly text: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly friendId: string;
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

