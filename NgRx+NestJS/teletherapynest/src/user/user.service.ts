import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { CreateUserDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from "argon2";
import { Role } from 'src/auth/roles';
import { DoctorDTO } from './doctor.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>
        ) {}
    async createUser(userToBeCreated : CreateUserDTO){
        try{
        const hash = await argon.hash(userToBeCreated.password);
        const user : User = {
            id: 0,
            username: userToBeCreated.username,
            passwordHash: hash,
            email: userToBeCreated.email,
            firstName: userToBeCreated.firstName,
            lastName: userToBeCreated.lastName,
            phoneNumber: userToBeCreated.phoneNumber,
            zdravstvenaKnjizica: userToBeCreated.zk,
            lbo: userToBeCreated.lbo,
            role: Role.Patient,
            participant: [],
            messages: [],
            reviewsLeft: [],
            reviewed: null,
            licenceId: null,
            sessionsLed: null
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

    async createDoctor(newDoctor: DoctorDTO){
        try{
            const hash = await argon.hash(newDoctor.password);
            const createdDoc = await this.userRepo.save({
            id: 0,
            username: newDoctor.username,
            passwordHash: hash,
            email: newDoctor.email,
            firstName: newDoctor.firstName,
            lastName: newDoctor.lastName,
            phoneNumber: newDoctor.phoneNumber,
            zdravstvenaKnjizica:null,
            lbo: null,
            role: Role.Doctor,
            participant: [],
            messages: [],
            reviewsLeft: null,
            reviewed: [],
            licenceId: newDoctor.licenceId,
            sessionsLed: []
            })
            console.log(createdDoc);
            delete createdDoc.passwordHash;
            return createdDoc; 
        }
        catch(e){
            console.log(e);
            throw new TypeORMError(e);
        }
    }

    async findUserById(id : number){
        return await this.userRepo.findOneBy({id: id});
    }

    async findUserByUsername(username: string){
        return await this.userRepo.findOneBy({username: username});
    }

    getUsers(){
        return this.userRepo.find();
    }


    async findDoctorByLicence(licenceId: string){
        console.log(licenceId);

        const doc = await this.userRepo.findOneBy({licenceId});
        console.log(doc);
        return doc;
    }
}
