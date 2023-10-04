import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AppState } from 'src/app/store/state';
import { selectId } from 'src/app/store/user/user.selector';
import { OtkazivanjeDialogComponent } from '../otkazivanje-dialog/otkazivanje-dialog.component';
import { logout } from 'src/app/store/user/user.actions';
import { SessionBasic } from 'src/app/models';
import { cancelSession } from 'src/app/store/session/session.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialog,
  ) {}
  selectedDate: Date[] | null = null;
  userId: number | null = null;

  ngOnInit(): void {
    this.store.select(selectId).pipe().subscribe((id) => this.userId = id);
  }

  otkazi(){
    const dialog = this.dialogRef.open(OtkazivanjeDialogComponent, {data: {userId: this.userId}, minWidth: '1024px', minHeight: '500px'});
    dialog.afterClosed().subscribe((result: SessionBasic[]) => {
      console.log(result);
      if(result.length>0){
        console.log("Otkazivanje");
        const sessionIds = result.map((session) => session.id);
        this.store.dispatch(cancelSession({sessions: sessionIds, userId: this.userId!}));
      }
    });
  }

  zakazi(){}

  logOut(){
    this.store.dispatch(logout());
  }
}
