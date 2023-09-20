import { Component, Input, OnInit } from '@angular/core';
import { SessionState } from 'src/app/store/session/session.state';
import { SessionService } from '../services/session.service';
import { Store } from '@ngrx/store';
import { Session } from 'src/app/models';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(private store: Store<SessionState>, private sessionService: SessionService) { }
  
  @Input()
  session: Session | undefined;

  ngOnInit(): void {
    
  }
}
