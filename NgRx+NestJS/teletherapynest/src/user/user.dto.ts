import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    passwordHash: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    zdravstvenaKnjizica: string;

    @IsNotEmpty()
    lbo: string;
}