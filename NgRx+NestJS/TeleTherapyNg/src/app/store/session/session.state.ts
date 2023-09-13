import { Session, SessionBasic } from "src/app/models";

export interface SessionState {
    sessions: SessionBasic[],
    selectedSession: Session | null,
}

export const initialSessionState: SessionState = {
    sessions: [],
    selectedSession: null,
}