import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './component/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { userReducer } from '../store/user/user.reducer';
import { Features } from 'src/Features';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/user/user.effects';



@NgModule({
  declarations: [
    RegisterComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(Features.User, userReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class RegisterModule { }
