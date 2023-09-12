import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUserSessions } from "./session.actions";
import { switchMap, tap } from "rxjs";

@Injectable()
export class SessionEffects {
    constructor(private actions$: Actions) {}

    loadUserSessions$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserSessions),
        tap(() => console.log("Loading user sessions")),
    ));


}