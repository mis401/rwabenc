import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUserSessions, loadUserSessionsFailure, loadUserSessionsSuccess, sessionSelected, sessionSelectedFailure, sessionSelectedSuccess } from "./session.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { SessionService } from "src/app/session/services/session.service";
import { SessionListService } from "src/app/session-list/services/session-list.service";

@Injectable()
export class SessionEffects {
    constructor(private actions$: Actions, private sessionListService: SessionListService) {}

    loadUserSessions$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserSessions),
        switchMap((action) => this.sessionListService.getAllSessions(action.userId).pipe(
            tap((sessions) => console.log(sessions)),
            map((sessions) => loadUserSessionsSuccess({ sessions })),
            catchError((error) => of(loadUserSessionsFailure({ error })))
        ))
    ))

    loadSession$ = createEffect(() => this.actions$.pipe(
        ofType(sessionSelected),
        switchMap((action) => this.sessionListService.getSessionById(action.sessionId).pipe(
            tap((session) => console.log(session)),
            map((session) => sessionSelectedSuccess({ session })),
            catchError((error) => of(sessionSelectedFailure({ error })))
        ))
    ))
}



