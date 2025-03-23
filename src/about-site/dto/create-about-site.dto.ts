import { IsNotEmpty, IsString } from "class-validator"

export class CreateAboutSiteDto {
    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    privacy_policy: string

    @IsString()
    @IsNotEmpty()
    terms_of_service: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    supportEmail: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    supportPhone: string

    @IsString()
    @IsNotEmpty()
    telegramLink: string

    @IsString()
    @IsNotEmpty()
    facebookLink: string
}
