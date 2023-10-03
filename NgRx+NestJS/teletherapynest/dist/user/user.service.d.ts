import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './user.dto';
import { Role } from 'src/auth/roles';
import { DoctorDTO } from './doctor.dto';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    createUser(userToBeCreated: CreateUserDTO): Promise<User>;
    createDoctor(newDoctor: DoctorDTO): Promise<{
        id: number;
        username: string;
        passwordHash: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        zdravstvenaKnjizica: any;
        lbo: any;
        role: Role.Doctor;
        participant: any[];
        messages: any[];
        reviewsLeft: any;
        reviewed: any[];
        licenceId: string;
        sessionsLed: any[];
    } & User>;
    findUserById(id: number): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    getUsers(): Promise<User[]>;
    findDoctorByLicence(licenceId: string): Promise<User>;
}
