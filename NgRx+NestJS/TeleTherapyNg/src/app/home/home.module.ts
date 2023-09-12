import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    MatSidenavModule,
    CommonModule
  ]
})
export class HomeModule { }
