import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SessionListComponent, SessionListModule } from '../session-list/session-list.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { ZakazivanjeDialogComponent } from './zakazivanje-dialog/zakazivanje-dialog.component';
import { OtkazivanjeDialogComponent } from './otkazivanje-dialog/otkazivanje-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    ZakazivanjeDialogComponent,
    OtkazivanjeDialogComponent,
  ],
  imports: [
    CommonModule,
    SessionListModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
  ]
})
export class HomeModule { }
