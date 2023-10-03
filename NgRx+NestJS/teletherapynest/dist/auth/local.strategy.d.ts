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
        firstName: string;
        lastName: string;
        phoneNumber: string;
        messages: import("../typeorm").Message[];
        role: import("./roles").Role;
        zdravstvenaKnjizica: string;
        lbo: string;
        participant: import("../typeorm").Session[];
        sessionsLed: import("../typeorm").Session[];
        reviewsLeft: import("../typeorm").Review[];
        licenceId: string;
        reviewed: import("../typeorm").Review[];
    }>;
}
export {};
