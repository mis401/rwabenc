import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Features } from "src/Features";
import { UserState } from "./user.state";

export const userFeatureSelector = createFeatureSelector<UserState>(Features.User);
export const selectUser = createSelector(userFeatureSelector, (userState) => userState.user);
export const selectToken = createSelector(userFeatureSelector, (userState) => userState.token);