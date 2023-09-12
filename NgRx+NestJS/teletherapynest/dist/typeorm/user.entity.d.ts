import { Message } from "./message.entity";
export declare class User {
    id: number;
    username: string;
    passwordHash: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    messages: Message[];
}
