import { Conversation } from "./conversation.model";
import { User } from "./user.model";

export interface Session {
    id: number;
    name: string;
    description: string;
    appointments: Date[],
    participants: User[],
    doctor: User,
    conversation: Conversation;
}