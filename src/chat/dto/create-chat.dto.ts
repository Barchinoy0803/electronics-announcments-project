import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateChatDto {
    @IsString()
    @IsNotEmpty()
    message: string

    @IsString()
    fromId: string

    @IsString()
    @IsNotEmpty()
    toId: string

    @IsDate()
    time: Date
} 
