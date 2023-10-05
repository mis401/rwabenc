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
import { SessionPreviewModule } from '../session-preview/session-preview.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PrikljucivanjeDialogComponent } from './prikljucivanje-dialog/prikljucivanje-dialog.component';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    HomeComponent,
    ZakazivanjeDialogComponent,
    OtkazivanjeDialogComponent,
    PrikljucivanjeDialogComponent,
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
    MatProgressSpinnerModule,
    SessionPreviewModule,
    SessionListModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
