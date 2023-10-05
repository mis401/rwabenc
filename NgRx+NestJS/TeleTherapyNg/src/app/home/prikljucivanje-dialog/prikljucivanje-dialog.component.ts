import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SessionBasic } from 'src/app/models';
import { SessionService } from 'src/app/session/services/session.service';
import { SessionState } from 'src/app/store/session/session.state';

@Component({
  selector: 'app-prikljucivanje-dialog',
  templateUrl: './prikljucivanje-dialog.component.html',
  styleUrls: ['./prikljucivanje-dialog.component.scss']
})
export class PrikljucivanjeDialogComponent {
  constructor(
    private store: Store<SessionState>,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<PrikljucivanjeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: any) {}

    sessions: SessionBasic[] = [];
    selectedSession: SessionBasic | null = null;
    searched: boolean = false;
    sessionName: string = "";

    search(){
      this.searched = true;
      this.sessionService.searchSessions(this.sessionName).subscribe(sessions => {
        this.sessions = sessions;
      });
    }
    selected(session: SessionBasic){

    }
}
