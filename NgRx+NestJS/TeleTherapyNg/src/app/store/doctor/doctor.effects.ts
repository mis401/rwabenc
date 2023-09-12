// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
// import { loginDoctor, loginDoctorFailure, loginDoctorSuccess } from "./doctor.actions";
// import { LoginService } from "src/app/login/service/login.service";
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { Router } from "@angular/router";

// @Injectable()
// export class DoctorEffects {
//     constructor(private actions$: Actions, 
//         private loginService: LoginService,
//         private router: Router,
//     ) {}
//      jwtHelper = new JwtHelperService();

//     loginDoctor$ = createEffect(() => this.actions$.pipe(
//         ofType(loginDoctor),
//         tap((action) => console.log(action)),
//         switchMap((action) => this.loginService.loginDoctor(action.licenceId).pipe(
//             tap((token) => {console.log(token)}),
//             map((token) => {
//                 const doctor = this.jwtHelper.decodeToken(token.access_token).doctor; 
//                 return loginDoctorSuccess({ doctor, token: token.access_token })}),
//             catchError((error) => of(loginDoctorFailure({ error })))
//         ))
//     ))

//     redirectOnLogin$ = createEffect(() => this.actions$.pipe(
//         ofType(loginDoctorSuccess),
//         tap(() => console.log("redirecting")),
//         exhaustMap(() => this.router.navigate(["home"]))
//     ), { dispatch: false });

// }