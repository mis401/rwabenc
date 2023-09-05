import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { CreateUserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { Repository, TypeORMError } from 'typeorm';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './login.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private httpService: HttpService, ) {
        
    }


    async register(newUser: CreateUserDTO){
        try{
            const rfzo = await this.httpService
            .post("https://www.rfzo.rs/proveraUplateDoprinosa2.php", 
                {zk: +newUser.zdravstvenaKnjizica, lbo: +newUser.lbo},
                {headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }, 
                responseType: "text"})
            .pipe(
                catchError(err => {
                    console.log(err);
                    throw new Error("RFZO server error");
                })
            );
            const resp = await lastValueFrom(rfzo);
            console.log(resp.data);
            if (resp.data.trim()[0] !== "В")
                throw new Error("RFZO ne odobrava");
            const createdUser = await this.userService.createUser(newUser);
            if (createdUser == null || createdUser == undefined) {
                throw new Error("User could not be created");
            }
            return await this.login(createdUser);
        }
        catch(err){
            console.log(err);
            return new HttpException(err, 500);
        }
    }

    async validateUser(username:string, password: string) {
        console.log("Auth service validating");
        const user = await this.userService.findUserByUsername(username);
        console.log("User found");
        console.log(user + " " + password);
        if (user && await argon.verify(user.passwordHash, password)) {
            const {passwordHash, ...result} = user;
            return result;
        }
        console.log("validation failed");
        return null;
    }

    async login(user: Partial<User>){
        const payload = {user: user, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
