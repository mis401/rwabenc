import { Role } from "src/auth/roles";
import { Session } from "./session.entity";
import { Message } from "./message.entity";
import { Review } from "./review.entity";
export declare class User {
    id: number;
    username: string;
    passwordHash: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    messages: Message[];
    role: Role;
    zdravstvenaKnjizica: string;
    lbo: string;
    participant: Session[];
    sessionsLed: Session[];
    reviewsLeft: Review[];
    licenceId: string;
    reviewed: Review[];
}
