import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsNumber()
    @IsOptional()
    star: number

    @IsString()
    @IsNotEmpty()
    productId: string
}
