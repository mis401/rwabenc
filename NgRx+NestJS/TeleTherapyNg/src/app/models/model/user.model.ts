import { Role } from "src/Roles";
import { Session } from "./session.model";
import { Message } from "./message.model";
import { Review } from "./review.model";

export interface User {
 
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    id?: string,
    zk?: string,
    lbo?: string,
    licenceId: string;
    sessions?: Session[] | null;
    messages?: Message[] | null;
    reviews?: Review[] | null;
    role?: Role,
}