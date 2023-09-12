import { HttpException } from '@nestjs/common';
import { User } from 'src/typeorm';
import { CreateUserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
type UserNoPassword = Omit<User, "passwordHash">;
export declare class AuthService {
    private userService;
    private jwtService;
    private httpService;
    constructor(userService: UserService, jwtService: JwtService, httpService: HttpService);
    register(newUser: CreateUserDTO): Promise<{
        access_token: string;
    } | HttpException>;
    validateUser(username: string, password: string): Promise<{
        zdravstvenaKnjizica: string;
        lbo: string;
        participant: import("src/typeorm").Session[];
        role: import("./roles").Role;
        reviews: import("src/typeorm").Review[];
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        messages: import("src/typeorm").Message[];
    }>;
    login(user: UserNoPassword): Promise<{
        access_token: string;
    }>;
    loginDoc(licenceId: string): Promise<HttpException | {
        access_token: string;
    }>;
}
export {};
