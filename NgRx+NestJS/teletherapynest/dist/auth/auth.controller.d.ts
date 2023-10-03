import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/user.dto';
import { DoctorDTO } from 'src/user/doctor.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    logIn(req: any): Promise<{
        access_token: string;
    }>;
    register(newUser: CreateUserDTO): Promise<import("@nestjs/common").HttpException | {
        access_token: string;
    }>;
    registerDoctor(newDoctor: DoctorDTO): Promise<import("@nestjs/common").HttpException | {
        access_token: string;
    }>;
    logInDoc(licenceId: any): Promise<import("@nestjs/common").HttpException | {
        access_token: string;
    }>;
}
