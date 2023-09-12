import { User } from "./user.entity";
import { Conversation } from "./conversation.entity";
export declare class Message {
    id: number;
    text: string;
    userSender: User;
    date: Date;
    conversation: Conversation;
}
