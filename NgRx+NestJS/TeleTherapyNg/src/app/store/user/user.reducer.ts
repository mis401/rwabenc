import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { loginDoctorSuccess, loginUserFailure, loginUserSuccess, logout, registerUserFailure, registerUserSuccess } from "./user.actions";
import { JwtHelperService } from '@auth0/angular-jwt';

export const userReducer = createReducer(
    initialUserState,
    on(loginUserSuccess, (state, { user, token }) => ({
        ...state,
        token,
        user,
        userId : user.id!,
        error: null,
    })),
    on(loginUserFailure, (state, { error }) => ({
        ...state,
        user: null,
        error,
    })),
    on(registerUserSuccess, (state, { user, token }) => ({
        ...state,
        token,
        user,
        userId : user.id!,
        error: null,
    })),
    on(registerUserFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(loginDoctorSuccess, (state, { user, token }) => ({
        ...state,
        token,
        user,
        userId : user.id!,
        error: null,
    })),
    on(loginUserFailure, (state, { error }) => ({
        ...state,
        user: null,
        error,
    })),
    on(logout, (state, {}) => ({
        ...state,
        user: null,
        token: null,
        error: null,
        userId: null
    }))
);