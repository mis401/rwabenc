import { Component } from '@angular/core';
import { NewUser, User } from '../../models';
import { Store } from '@ngrx/store';
import { registerUser } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private store: Store<UserState>) {}

  newUser : NewUser = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    zk: "",
    lbo: ""
  };

  onSubmit(){
    console.log(this.newUser);
    this.store.dispatch(registerUser({user: {...this.newUser}}));
  }
}
