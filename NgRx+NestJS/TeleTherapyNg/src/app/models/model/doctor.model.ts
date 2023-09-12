import { Role } from "src/Roles";
import { Session } from "./session.model";
import { Message } from "./message.model";
import { Review } from "./review.model";

export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    role: Role;
}