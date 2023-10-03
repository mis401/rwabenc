import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { Features } from "src/Features";
import { SessionState } from "./session.state";

export const sessionFeatureSelector = createFeatureSelector<SessionState>(Features.Session);
export const selectSessions = createSelector(sessionFeatureSelector, (sessionState) => sessionState.sessions);
export const selectSelectedSession = createSelector(sessionFeatureSelector, (sessionState) => sessionState.selectedSession);
export const selectConversation = createSelector(sessionFeatureSelector, (state) => state.conversation);