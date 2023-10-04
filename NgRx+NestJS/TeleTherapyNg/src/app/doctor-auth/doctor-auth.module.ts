import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorAuthComponent } from './component/doctor-auth/doctor-auth.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../store/user/user.reducer';
import { Features } from 'src/Features';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/user/user.effects';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DoctorAuthComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature(Features.User, userReducer),
    EffectsModule.forFeature([UserEffects]),
    
  ]
})
export class DoctorAuthModule { }
