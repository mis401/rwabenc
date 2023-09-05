import { HttpException } from '@nestjs/common';
import { User } from 'src/typeorm';
import { CreateUserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
export declare class AuthService {
    private userService;
    private jwtService;
    private httpService;
    constructor(userService: UserService, jwtService: JwtService, httpService: HttpService);
    register(newUser: CreateUserDTO): Promise<{
        access_token: string;
    } | HttpException>;
    validateUser(username: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        zdravstvenaKnjizica: string;
        lbo: string;
        role: import("./roles").Role;
    }>;
    login(user: Partial<User>): Promise<{
        access_token: string;
    }>;
}
