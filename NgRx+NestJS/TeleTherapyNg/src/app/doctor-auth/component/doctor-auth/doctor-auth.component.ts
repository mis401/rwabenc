import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginDTO } from 'src/app/models';
import { loginDoctor, loginUser } from 'src/app/store/user/user.actions';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-doctor-auth',
  templateUrl: './doctor-auth.component.html',
  styleUrls: ['./doctor-auth.component.scss']
})
export class DoctorAuthComponent {
  constructor(private store: Store<UserState>) { }
  licence: string = "";
  user : LoginDTO = {
    username: "",
    password: "",
  }
  onSubmit(){
    if(this.licence.length > 0){
      this.store.dispatch(loginDoctor({licenceId: this.licence}))
    }
    else{
      this.store.dispatch(loginUser({user: {...this.user}}));
    }
  }
}
