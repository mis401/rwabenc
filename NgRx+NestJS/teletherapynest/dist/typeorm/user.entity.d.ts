import { Role } from "src/auth/roles";
export declare class User {
    id: number;
    username: string;
    passwordHash: string;
    email: string;
    zdravstvenaKnjizica: string;
    lbo: string;
    role: Role;
}
