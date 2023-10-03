import { IsEmail, IsNotEmpty } from "class-validator";

export class DoctorDTO {
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
    licenceId: string;
}