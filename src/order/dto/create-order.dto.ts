import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    productId: string

    @IsOptional()
    @IsDate()
    date: Date

    @IsNumber()
    @IsNotEmpty()
    count: number
}
