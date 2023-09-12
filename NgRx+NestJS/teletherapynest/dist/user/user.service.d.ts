import { Doctor, Patient } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './user.dto';
export declare class UserService {
    private patientRepo;
    private docRepo;
    constructor(patientRepo: Repository<Patient>, docRepo: Repository<Doctor>);
    createUser(userToBeCreated: CreateUserDTO): Promise<Patient>;
    findUserById(id: number): Promise<Patient>;
    findUserByUsername(username: string): Promise<Patient>;
    getUsers(): Promise<Patient[]>;
    findDoctorByLicence(licenceId: string): Promise<Doctor>;
}
