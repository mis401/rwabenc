import { createAction, props } from "@ngrx/store";
import { LoginDTO, User } from "../models";
import { JWT } from "../models/jwt";

export const loginUser = createAction("[User] Login User", props<{ user: LoginDTO}>());
export const loginUserSuccess = createAction("[User] Login User Success", props<{user: User, token: string}>());
export const loginUserFailure = createAction("[User] Login User Failure", props<{error: any}>());