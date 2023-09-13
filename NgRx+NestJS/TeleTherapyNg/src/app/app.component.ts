import { Component, OnInit } from '@angular/core';
import { AppState } from './store/state';
import { Store } from '@ngrx/store';
import { take } from "rxjs"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  
  title = 'TeleTherapyNg';

 
}

