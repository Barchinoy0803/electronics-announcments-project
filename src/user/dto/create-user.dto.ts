import { USER_ROLE, USER_STATUS } from "@prisma/client";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstname: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsOptional()
    image: string

    @IsDate() 
    @IsOptional()
    lastOnline: Date

    @IsOptional()
    @IsEnum(USER_ROLE)
    role: USER_ROLE

    @IsString()
    @IsNotEmpty()
    regionId: string

    @IsString()
    @IsNotEmpty()
    location: string
}
