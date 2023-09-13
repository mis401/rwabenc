import { DoctorState, initialDoctorState } from "./doctor/doctor.state";
import { SessionState, initialSessionState } from "./session/session.state";
import { UserState, initialUserState } from "./user/user.state";

export interface AppState {
    user: UserState,
    sessions: SessionState,
}

export const initialAppState: AppState = {
    user: initialUserState,
    sessions: initialSessionState,
}