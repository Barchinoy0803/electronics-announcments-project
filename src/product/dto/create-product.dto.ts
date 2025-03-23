import { CONDITION_TYPE, PRODUCT_STATUS, TYPE } from "@prisma/client"
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsEnum(TYPE)
    type: TYPE

    @IsEnum(CONDITION_TYPE)
    condition: CONDITION_TYPE

    @IsBoolean()
    @IsNotEmpty()
    isNegotiable: boolean

    @IsNumber()
    @IsNotEmpty()
    count: number

    @IsString()
    @IsNotEmpty()
    image: string

    @IsOptional()
    @IsEnum(PRODUCT_STATUS)
    status?: PRODUCT_STATUS

    @IsString()
    @IsNotEmpty()
    colorId: string

    @IsString()
    @IsNotEmpty()
    categoryId: string
}
