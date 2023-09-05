import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { CreateUserDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from "argon2";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private  userRepo: Repository<User>) {}

    async createUser(userToBeCreated : CreateUserDTO){
        try{
        const hash = await argon.hash(userToBeCreated.passwordHash);
        userToBeCreated.passwordHash = hash;
        console.log(userToBeCreated);
        await this.userRepo.save(userToBeCreated);
        delete userToBeCreated.passwordHash;
        return userToBeCreated;
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
