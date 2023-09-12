import { createAction } from "@ngrx/store";

export const loadUserSessions = createAction("[Session] Load User Sessions");
export const loadUserSessionsSuccess = createAction("[Session] Load User Sessions Success");
export const loadUserSessionsFailure = createAction("[Session] Load User Sessions Failure");