import { User } from "./user.entity";
import { Conversation } from "./conversation.entity";
export declare class Session {
    id: number;
    name: string;
    description: string;
    appointment: Date;
    doctor: User;
    participants: User[];
    conversation: Conversation;
    sessionState: SessionState;
}
export declare const enum SessionState {
    Active = "active",
    Ended = "ended"
}
