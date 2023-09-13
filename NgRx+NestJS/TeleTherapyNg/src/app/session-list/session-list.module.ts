import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionListComponent } from './component/session-list.component';
import { StoreModule } from '@ngrx/store';
import { Features } from 'src/Features';
import { SessionEffects } from '../store/session/session.effects';
import { sessionReducer } from '../store/session/session.reducer';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    SessionListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(Features.Session, sessionReducer),
    EffectsModule.forFeature([SessionEffects]),
  ]
})
export class SessionListModule { }
