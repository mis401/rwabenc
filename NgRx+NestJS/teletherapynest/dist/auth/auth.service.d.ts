import { HttpException } from '@nestjs/common';
import { User } from 'src/typeorm';
import { CreateUserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { DoctorDTO } from 'src/user/doctor.dto';
type UserNoPassword = Omit<User, "passwordHash">;
export declare class AuthService {
    private userService;
    private jwtService;
    private httpService;
    constructor(userService: UserService, jwtService: JwtService, httpService: HttpService);
    register(newUser: CreateUserDTO): Promise<HttpException | {
        access_token: string;
    }>;
    validateUser(username: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        messages: import("src/typeorm").Message[];
        role: import("./roles").Role;
        zdravstvenaKnjizica: string;
        lbo: string;
        participant: import("src/typeorm").Session[];
        sessionsLed: import("src/typeorm").Session[];
        reviewsLeft: import("src/typeorm").Review[];
        licenceId: string;
        reviewed: import("src/typeorm").Review[];
    }>;
    login(user: UserNoPassword): Promise<{
        access_token: string;
    }>;
    loginDoc(licenceId: string): Promise<HttpException | {
        access_token: string;
    }>;
    registerDoc(newDoctor: DoctorDTO): Promise<HttpException | {
        access_token: string;
    }>;
}
export {};
