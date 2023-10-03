import { Role } from "src/Roles";
import { User } from "./user.model";
import { Doctor } from "./doctor.model";
import { Conversation } from "./conversation.model";

export interface Message {

    id?: number;
    text: string;
    userSender?: User;
    date: Date;
    conversation?: Conversation;

}