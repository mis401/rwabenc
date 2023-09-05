import { createAction, props } from "@ngrx/store";
import { LoginDTO, NewUser, User } from "../../models";
import { JWT } from "../../models/jwt";

export const loginUser = createAction("[User] Login User", props<{ user: LoginDTO}>());
export const loginUserSuccess = createAction("[User] Login User Success", props<{user: User, token: string}>());
export const loginUserFailure = createAction("[User] Login User Failure", props<{error: any}>());

export const registerUser = createAction("[User] Register User", props<{ user: NewUser}>());
export const registerUserSuccess = createAction("[User] Register User Success", props<{user: User, token: string}>());
export const registerUserFailure = createAction("[User] Register User Failure", props<{error: any}>());
