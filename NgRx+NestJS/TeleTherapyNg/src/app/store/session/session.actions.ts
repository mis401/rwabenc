import { createAction, props } from "@ngrx/store";
import { Session, SessionBasic } from "src/app/models";

export const loadUserSessions = createAction("[Session] Load User Sessions", props<{ userId: number }>());
export const loadUserSessionsSuccess = createAction("[Session] Load User Sessions Success", props<{ sessions: SessionBasic[] }>());
export const loadUserSessionsFailure = createAction("[Session] Load User Sessions Failure", props<{ error: any }>());

export const sessionSelected = createAction("[Session] Session Selected", props<{ sessionId: number }>());
export const sessionSelectedSuccess = createAction("[Session] Session Selected Success", props<{ session: Session }>());
export const sessionSelectedFailure = createAction("[Session] Session Selected Failure", props<{ error: any }>());