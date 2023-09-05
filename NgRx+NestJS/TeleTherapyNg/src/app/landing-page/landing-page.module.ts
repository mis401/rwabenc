import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './component/landing-page.component';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class LandingPageModule { }
