import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSessions } from 'src/app/store/session/session.selectors';
import { SessionState } from 'src/app/store/session/session.state';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
  constructor(private store: Store<SessionState>) {}

  ngOnInit(): void {
    
  }
}
