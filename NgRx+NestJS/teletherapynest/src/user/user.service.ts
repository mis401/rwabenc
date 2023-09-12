import { Injectable } from '@nestjs/common';
import { Doctor, Patient, User } from 'src/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { CreateUserDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from "argon2";
import { Role } from 'src/auth/roles';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Patient) private  patientRepo: Repository<Patient>,
        @InjectRepository(Doctor) private docRepo: Repository<Doctor>,
        ) {}
    async createUser(userToBeCreated : CreateUserDTO){
        try{
        const hash = await argon.hash(userToBeCreated.password);
        const user : Patient = {
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
            reviews: [],
        }
        console.log(user);
        await this.patientRepo.save(user);
        delete user.passwordHash;
        // await this.docRepo.save({
        //     username: 'somix',
        //     passwordHash: hash,
        //     email: '',
        //     firstName: 'Somix',
        //     lastName: 'Benc',
        //     phoneNumber: '123456789',
        //     licenceId: 'licenca',
        //     role: Role.Doctor,
        //     sessions: [],
        //     messages: [],
        //     reviews: [],
        // })
        return user;
        }
        catch(err){
            console.log(err);
            throw new TypeORMError(err);
        }
    }

    async findUserById(id : number){
        return await this.patientRepo.findOneBy({id: id});
    }

    async findUserByUsername(username: string){
        return await this.patientRepo.findOneBy({username: username});
    }

    getUsers(){
        return this.patientRepo.find();
    }


    async findDoctorByLicence(licenceId: string){
        console.log(licenceId);

        const doc = await this.docRepo.findOneBy({licenceId});
        console.log(doc);
        return doc;
    }
}
