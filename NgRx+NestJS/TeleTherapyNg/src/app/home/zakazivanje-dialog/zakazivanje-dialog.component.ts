import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SessionBasic, SessionIdDTO } from 'src/app/models';
import { SessionState } from 'src/app/store/session/session.state';

@Component({
  selector: 'app-zakazivanje-dialog',
  templateUrl: './zakazivanje-dialog.component.html',
  styleUrls: ['./zakazivanje-dialog.component.scss']
})
export class ZakazivanjeDialogComponent implements OnInit {
  constructor(
    private store: Store<SessionState>,
    public dialogRef: MatDialogRef<ZakazivanjeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: any) {}

    newSession : SessionIdDTO = {
      appointment: new Date(),
      doctor: this.userId.userId,
      name: "",
      description: "",
    }
    potvrda: boolean = false;
    date = new FormControl(new Date());
    time: any;
    serializedDate = new FormControl((new Date()).toISOString());
    ngOnInit(): void {
      
    }
    log(){
      console.log(this.newSession);
      console.log(this.date);
      console.log(this.time);
    }

    parse(){
      this.newSession.appointment = new Date(this.date.value!);
      this.newSession.appointment.setHours(this.time.split(":")[0], this.time.split(":")[1]);
      console.log(this.newSession);
      this.potvrda = true;
    }
}
