import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionPreviewComponent } from './component/session-preview.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    SessionPreviewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [
    SessionPreviewComponent
  ]
})
export class SessionPreviewModule { }
