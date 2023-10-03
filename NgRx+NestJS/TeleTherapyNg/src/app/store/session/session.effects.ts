import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadMessages, loadMessagesFailure, loadMessagesSuccess, loadUserSessions, loadUserSessionsFailure, loadUserSessionsSuccess, sessionSelected, sessionSelectedFailure, sessionSelectedSuccess } from "./session.actions";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { SessionService } from "src/app/session/services/session.service";
import { SessionListService } from "src/app/session-list/services/session-list.service";
import { Router } from "@angular/router";

@Injectable()
export class SessionEffects {
    constructor(private actions$: Actions,
                private sessionListService: SessionListService,
                private sessionService: SessionService,
                private router: Router) {}

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

    sessionRedirect$ = createEffect(() => this.actions$.pipe(
        ofType(sessionSelectedSuccess),
        exhaustMap((action) => this.router.navigate([`session/${action.session.id}`]))
    ), {dispatch: false})

    loadMessages$ = createEffect(() => this.actions$.pipe(
        ofType(loadMessages),
        switchMap((action) => this.sessionService.loadMessages(action.convoId).pipe(
            map((conv) => loadMessagesSuccess({conv})),
            catchError((error) => of(loadMessagesFailure({error})))
        ))
    ))
}



