import { Component } from '@angular/core';
import { LoginDTO, User } from '../models';
import { Store } from '@ngrx/store';
import { loginUser } from '../store/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private store: Store<User>)
  {}
  user : LoginDTO = {
    username: "",
    password: "",
  }




  onSubmit() {
    console.log(this.user);
    this.user.username="sad";
    this.store.dispatch(loginUser({user: {...this.user}}));
  }
  cancel() {
    console.log("cancel");
  }
}
