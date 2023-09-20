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
  ngOnInit(): void {

    this.store.select(selectSessions).pipe(take(1)).subscribe((sessions) => this.sesije = [...sessions]);
  }
}
