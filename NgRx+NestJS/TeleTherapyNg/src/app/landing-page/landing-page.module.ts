import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './component/landing-page.component';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Features } from 'src/Features';
import { userReducer } from '../store/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/user/user.effects';
//import { doctorReducer } from '../store/doctor/doctor.reducer';
//import { DoctorEffects } from '../store/doctor/doctor.effects';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    FormsModule,
    StoreModule.forFeature(Features.User, userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class LandingPageModule { }
