import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { SessionBasic } from 'src/app/models';
import { selectSessions } from 'src/app/store/session/session.selectors';
import { SessionState } from 'src/app/store/session/session.state';


@Component({
  selector: 'app-otkazivanje-dialog',
  templateUrl: './otkazivanje-dialog.component.html',
  styleUrls: ['./otkazivanje-dialog.component.scss']
})
export class OtkazivanjeDialogComponent implements OnInit {
  constructor(
    private store: Store<SessionState>,
    public dialogRef: MatDialogRef<OtkazivanjeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: number) {}

    sesije: SessionBasic[] = [];
    selectedSessions: SessionBasic[] = [];
  ngOnInit(): void {

    this.store.select(selectSessions).pipe().subscribe((sessions) => this.sesije = [...sessions]);
  }

  odustani(){
    
  }

  selected(session: SessionBasic){
    const index = this.selectedSessions.indexOf(session);
    if (index !== -1){
      this.selectedSessions.splice(index, 1);
      return;
    }
    else {
      this.selectedSessions.push(session);
    }
    console.log(this.selectedSessions);
  }
}
