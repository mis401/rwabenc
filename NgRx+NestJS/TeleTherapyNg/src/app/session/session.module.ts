import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './component/session.component';
import { userReducer } from '../store/user/user.reducer';
import { Features } from 'src/Features';
import { StoreModule } from '@ngrx/store';
import { sessionReducer } from '../store/session/session.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from '../store/session/session.effects';
import { SessionService } from './services/session.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    SessionComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(Features.Session, sessionReducer),
    EffectsModule.forFeature([SessionEffects]),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    SessionService,
  ]
})
export class SessionModule { }
