import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { CreateUserDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from "argon2";
import { Role } from 'src/auth/roles';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private  userRepo: Repository<User>) {}

    async createUser(userToBeCreated : CreateUserDTO){
        try{
        const hash = await argon.hash(userToBeCreated.password);
        const user : User = {
            id: 0,
            username: userToBeCreated.username,
            passwordHash: hash,
            email: userToBeCreated.email,
            ime: userToBeCreated.firstName,
            prezime: userToBeCreated.lastName,
            phoneNumber: userToBeCreated.phoneNumber,
            zdravstvenaKnjizica: userToBeCreated.zk,
            lbo: userToBeCreated.lbo,
            role: Role.Patient
        }
        console.log(user);
        await this.userRepo.save(user);
        delete user.passwordHash;
        return user;
        }
        catch(err){
            console.log(err);
            throw new TypeORMError(err);
        }
    }

    findUserById(id : number){
        return this.userRepo.findOneBy({id: id});
    }

    findUserByUsername(username: string){
        return this.userRepo.findOneBy({username: username});
    }

    getUsers(){
        return this.userRepo.find();
    }
}
