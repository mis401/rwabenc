import { Role } from "src/Roles";
import { Session } from "./session.model";
import { Message } from "./message.model";
import { Review } from "./review.model";

export interface User {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    id?: number,
    zk?: string | null,
    lbo?: string | null,
    licenceId?: string | null;
    participant?: Session[] | null;
    messages?: Message[] | null;
    reviewsLeft?: Review[] | null;
    reviewed?: Review[] | null;
    role: Role,
}