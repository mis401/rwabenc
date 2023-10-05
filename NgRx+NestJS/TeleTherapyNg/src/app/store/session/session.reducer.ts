import { createReducer, on } from "@ngrx/store";
import { initialSessionState } from "./session.state";
import { createSessionSuccess, createSessionFailure, loadMessagesSuccess, loadUserSessions, loadUserSessionsFailure, loadUserSessionsSuccess, sessionSelectedFailure, sessionSelectedSuccess, joinSessionSuccess, joinSessionFailure } from "./session.actions";
import { selectSelectedSession } from "./session.selectors";
import { logout } from "../user/user.actions";

export const sessionReducer = createReducer(
    initialSessionState,
    on(loadUserSessionsSuccess, (state, { sessions }) => ({
        ...state,
        sessions,
        error: null,
    })),
    on(loadUserSessionsFailure, (state, { error }) => ({
        ...state,
        sessions: [],
        error,
    })),
    on(sessionSelectedSuccess, (state, { session }) => ({
        ...state,
        selectedSession: session,
        error: null,
    })),
    on(sessionSelectedFailure, (state, { error }) => ({
        ...state,
        selectedSession: null,
        error,
    })),
    on(loadMessagesSuccess, (state, {conv}) => ({
        ...state,
        conversation: conv
    })),
    on(logout, (state, {}) => ({
        ...state,
        sessions: [],
        selectedSession: null,
        conversation: null,
        error: null,
    })),
    on(createSessionSuccess, (state, {session}) => ({
        ...state,
        sessions: [...state.sessions, session],
        error: null,
    })),
    on(createSessionFailure, (state, {error}) => ({
       ...state,
         error, 
    })),
    on(joinSessionSuccess, (state, {session}) => ({
        ...state,
        sessions: [...state.sessions, session],
        error: null,
    })),
    on(joinSessionFailure, (state, {error}) => ({
        ...state,
        error,
    }))
)