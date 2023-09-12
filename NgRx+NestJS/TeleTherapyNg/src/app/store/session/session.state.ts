import { Session } from "src/app/models";

export interface SessionState {
    sessions: Session[],
}

export const initialSessionState: SessionState = {
    sessions: [],
}