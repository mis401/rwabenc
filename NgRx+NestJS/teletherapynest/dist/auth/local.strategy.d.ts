import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        zdravstvenaKnjizica: string;
        lbo: string;
        role: import("./roles").Role;
    }>;
}
export {};
