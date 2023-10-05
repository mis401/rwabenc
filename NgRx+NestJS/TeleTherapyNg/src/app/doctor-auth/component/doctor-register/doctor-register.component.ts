import { Component } from '@angular/core';
import { NewDoctorDTO } from './newdoctor.dto';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/store/user/user.state';
import { registerDoctor } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.scss']
})
export class DoctorRegisterComponent {
  constructor(private store: Store<UserState>) {}

  newUser : NewDoctorDTO = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    licenceId: ""
  };

  onSubmit(){
    console.log(this.newUser);
    this.store.dispatch(registerDoctor({doctor: {...this.newUser}}));
  }
}
