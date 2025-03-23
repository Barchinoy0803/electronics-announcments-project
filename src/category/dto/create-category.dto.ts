import { TYPE } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEnum(TYPE)
    type: TYPE
}
