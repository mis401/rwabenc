import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
export declare class UserController {
    private service;
    constructor(service: UserService);
    getUsers(): Promise<import("../typeorm").User[]>;
    createUser(createUser: CreateUserDTO): Promise<import("../typeorm").User>;
    findUserById(id: number): Promise<import("../typeorm").User>;
}
