import { createAction, props } from "@ngrx/store";
import { LoginDTO, NewUser, User } from "../../models";
import { NewDoctorDTO } from "src/app/doctor-auth/component/doctor-register/newdoctor.dto";


export const loginUser = createAction("[User] Login User", props<{ user: LoginDTO}>());
export const loginUserSuccess = createAction("[User] Login User Success", props<{user: User, token: string}>());
export const loginUserFailure = createAction("[User] Login User Failure", props<{error: any}>());

export const registerUser = createAction("[User] Register User", props<{ user: NewUser}>());
export const registerUserSuccess = createAction("[User] Register User Success", props<{user: User, token: string}>());
export const registerUserFailure = createAction("[User] Register User Failure", props<{error: any}>());

export const registerDoctor = createAction("[Doctor] Register Doctor", props<{ doctor: NewDoctorDTO}>());
export const registerDoctorSuccess = createAction("[Doctor] Register Doctor Success", props<{user: User, token: string}>());
export const registerDoctorFailure = createAction("[Doctor] Register Doctor Failure", props<{error: any}>());

export const loginDoctor = createAction("[Doctor] Login Doctor", props<{ licenceId: string}>());
export const loginDoctorSuccess = createAction("[Doctor] Login Doctor Success", props<{user: User, token: string}>());
export const loginDoctorFailure = createAction("[Doctor] Login Doctor Failure", props<{error: any}>());

export const logout = createAction("[User] Logout");