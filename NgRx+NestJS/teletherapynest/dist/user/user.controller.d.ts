import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
export declare class UserController {
    private service;
    constructor(service: UserService);
    getUsers(): Promise<import("../typeorm").Patient[]>;
    createUser(createUser: CreateUserDTO): Promise<import("../typeorm").Patient>;
    findUserById(id: number): Promise<import("../typeorm").Patient>;
}
