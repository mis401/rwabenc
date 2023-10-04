import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "../../login/service/login.service";
import { Router } from "@angular/router";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { loginDoctor, loginDoctorFailure, loginDoctorSuccess, loginUser, loginUserFailure, loginUserSuccess, logout, registerUser, registerUserSuccess } from "./user.actions";
import { JwtHelperService } from "@auth0/angular-jwt";
import { RegisterService } from "src/app/register/service/register.service";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, 
        private loginService: LoginService, 
        private regService: RegisterService, 
        private router: Router) {}
    jwtHelper = new JwtHelperService();
    
    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(loginUser),
        switchMap((action) => this.loginService.login(action.user).pipe(
            tap((token) => {console.log(token)}),
            map((token) => {
                const user = this.jwtHelper.decodeToken(token.access_token).user; 
                return loginUserSuccess({ user, token: token.access_token })}),
            catchError((error) => of(loginUserFailure({ error })))
        ))
    ));

    registerUser$ = createEffect(() => this.actions$.pipe(
        ofType(registerUser),
        switchMap((action) => this.regService.register(action.user).pipe(
            tap((token) => {console.log(token)}),
            map((token) => {
                const user = this.jwtHelper.decodeToken(token.access_token).user; 
                return registerUserSuccess({ user, token: token.access_token })}
                ),
            catchError((error) => of(loginUserFailure({ error })))
        ))
    ));

    redirectAfterLogin$ = createEffect(() => this.actions$.pipe(
        ofType(loginUserSuccess, registerUserSuccess, loginDoctorSuccess),
        exhaustMap(() => this.router.navigate(["home"]))
    ), { dispatch: false });

    loginDoctor$ = createEffect(() => this.actions$.pipe(
    ofType(loginDoctor),
    tap((action) => console.log(action)),
    switchMap((action) => this.loginService.loginDoctor(action.licenceId).pipe(
        tap((token) => {console.log(token)}),
        map((token) => {
            const user = this.jwtHelper.decodeToken(token.access_token).user; 
            return loginDoctorSuccess({ user, token: token.access_token })}),
        catchError((error) => of(loginDoctorFailure({ error })))
        ))
    ));

    redirectAfterLogOut$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        exhaustMap(() => this.router.navigate([""]))
    ), { dispatch: false });


}
