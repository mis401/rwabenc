import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { loginUser, loginUserFailure, loginUserSuccess } from "./user.actions";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private loginService: LoginService, private router: Router) {}
    jwtHelper = new JwtHelperService();
    
    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(loginUser),
        switchMap((action) => this.loginService.login(action.user).pipe(
            tap((token) => {console.log(token)}),
            map((token) => {
                const user = this.jwtHelper.decodeToken(token.access_token); 
                return loginUserSuccess({ user, token: token.access_token })}),
            catchError((error) => of(loginUserFailure({ error })))
        ))
    ));

    
}
