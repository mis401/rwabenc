import { Component, Input } from '@angular/core';
import { Session } from 'src/app/models';

@Component({
  selector: 'app-session-preview',
  templateUrl: './session-preview.component.html',
  styleUrls: ['./session-preview.component.scss']
})
export class SessionPreviewComponent {
  
  
  @Input() session: Session | undefined;
}
