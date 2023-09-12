import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<{
        zdravstvenaKnjizica: string;
        lbo: string;
        participant: import("../typeorm").Session[];
        role: import("./roles").Role;
        reviews: import("../typeorm").Review[];
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        messages: import("../typeorm").Message[];
    }>;
}
export {};
