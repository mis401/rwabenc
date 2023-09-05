import { IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    zk: string;

    @IsNotEmpty()
    lbo: string;
}