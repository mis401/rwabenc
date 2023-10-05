import { createAction, props } from "@ngrx/store";
import { Conversation, Session, SessionBasic, SessionIdDTO } from "src/app/models";

export const loadUserSessions = createAction("[Session] Load User Sessions", props<{ userId: number }>());
export const loadUserSessionsSuccess = createAction("[Session] Load User Sessions Success", props<{ sessions: SessionBasic[] }>());
export const loadUserSessionsFailure = createAction("[Session] Load User Sessions Failure", props<{ error: any }>());

export const sessionSelected = createAction("[Session] Session Selected", props<{ sessionId: number }>());
export const sessionSelectedSuccess = createAction("[Session] Session Selected Success", props<{ session: Session }>());
export const sessionSelectedFailure = createAction("[Session] Session Selected Failure", props<{ error: any }>());

export const loadMessages = createAction("[Session] Load Messages", props<{convoId: number}>());
export const loadMessagesSuccess = createAction("[Session] Load Messages Success", props<{conv: Conversation}>());
export const loadMessagesFailure = createAction("[Session] Load Messages Failure", props<{error: any}>());

export const navigateToSession = createAction("[Session] Navigate to Session", props<{session: number}>());

export const cancelSession = createAction("[Session] Cancel Session", props<{sessions: number[], userId: number}>());
export const cancelSessionFailure = createAction("[Session] Cancel Session Failure", props<{error: any}>());

export const createSession = createAction("[Session] Create Session", props<{session: SessionIdDTO}>());
export const createSessionSuccess = createAction("[Session] Create Session Success", props<{session: Session}>());
export const createSessionFailure = createAction("[Session] Create Session Failure", props<{error: any}>());

export const joinSession = createAction("[Session] Join Session", props<{session: number, user: number}>());
export const joinSessionSuccess = createAction("[Session] Join Session Success", props<{session: Session}>());
export const joinSessionFailure = createAction("[Session] Join Session Failure", props<{error: any}>());