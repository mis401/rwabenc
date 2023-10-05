import { SessionState } from "src/app/store/session/session.state";
import { Conversation } from "./conversation.model";
import { User } from "./user.model";

export interface Session {
    id: number;
    name: string;
    description: string;
    appointment: Date,
    participants: User[],
    doctor: User,
    conversation: Conversation;
    sessionState?: SessionStatus;
}
export const enum SessionStatus {
    Active = 'active',
    Ended = 'ended',
}
