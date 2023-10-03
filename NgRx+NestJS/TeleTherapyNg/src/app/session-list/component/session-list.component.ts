import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { Session, SessionBasic } from 'src/app/models';
import { loadUserSessions, sessionSelected } from 'src/app/store/session/session.actions';
import { selectSessions } from 'src/app/store/session/session.selectors';
import { SessionState } from 'src/app/store/session/session.state';
import { selectId, selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent {
  constructor(private store: Store<SessionState>) {}
  userId : number | null = null;
  @Input()
  sessions: SessionBasic[] = [];
  sessionsSelector$ = this.store.select(selectId).pipe(
    filter((id) => id !== null),
    tap((id) => this.userId = id),
    map((id) => this.store.dispatch(loadUserSessions({userId: id!}))),
    switchMap( () => this.store.select(selectSessions)),
  )

  selected(session: SessionBasic){
    this.store.dispatch(sessionSelected({sessionId: session.id}));
  }
}
