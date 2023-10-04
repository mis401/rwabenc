import { Conversation, Session, SessionBasic } from "src/app/models";

export interface SessionState {
    sessions: SessionBasic[],
    selectedSession: Session | null,
    conversation: Conversation | null;
    error: any
}

export const initialSessionState: SessionState = {
    sessions: [],
    selectedSession: null,
    conversation: null,
    error: null,
}