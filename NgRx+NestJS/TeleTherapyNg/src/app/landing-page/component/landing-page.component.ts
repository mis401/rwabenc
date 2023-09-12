import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
//import { loginDoctor } from 'src/app/store/doctor/doctor.actions';
import { DoctorState } from 'src/app/store/doctor/doctor.state';
import { loginDoctor } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(private store: Store<DoctorState>) { }
  
  licenceId : string = "";

  onDoctorLogin(){
    console.log("dispatching");
    this.store.dispatch(loginDoctor({licenceId: this.licenceId}));
  }
}
