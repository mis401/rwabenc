import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { loginUserFailure, loginUserSuccess, registerUserFailure, registerUserSuccess } from "./user.actions";
import { JwtHelperService } from '@auth0/angular-jwt';

export const userReducer = createReducer(
    initialUserState,
    on(loginUserSuccess, (state, { user, token }) => ({
        ...state,
        token,
        user,
        error: null,
    })),
    on(loginUserFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(registerUserSuccess, (state, { user, token }) => ({
        ...state,
        token,
        user,
        error: null,
    })),
    on(registerUserFailure, (state, { error }) => ({
        ...state,
        error,
    })),
);