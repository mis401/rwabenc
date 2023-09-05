import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './user.dto';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    createUser(userToBeCreated: CreateUserDTO): Promise<CreateUserDTO>;
    findUserById(id: number): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    getUsers(): Promise<User[]>;
}
