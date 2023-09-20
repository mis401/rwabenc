import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AppState } from 'src/app/store/state';
import { selectId } from 'src/app/store/user/user.selector';
import { OtkazivanjeDialogComponent } from '../otkazivanje-dialog/otkazivanje-dialog.component';
import { logout } from 'src/app/store/user/user.actions';

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
    this.store.select(selectId).pipe(take(1)).subscribe((id) => this.userId = id);
  }

  otkazi(){
    const dialog = this.dialogRef.open(OtkazivanjeDialogComponent, {data: {userId: this.userId}, minWidth: '1024px', minHeight: '500px'});
  }

  zakazi(){}

  logOut(){
    this.store.dispatch(logout());
  }
}
