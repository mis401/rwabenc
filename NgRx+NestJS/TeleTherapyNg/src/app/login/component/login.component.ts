import { Component } from '@angular/core';
import { LoginDTO, User } from '../../models';
import { Store } from '@ngrx/store';
import { loginUser } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private store: Store<UserState>)
  {}
  user : LoginDTO = {
    username: "",
    password: "",
  }
  

  onSubmit() {
    console.log(this.user);
    this.store.dispatch(loginUser({user: {...this.user}}));
  }
  cancel() {
    console.log("cancel");
  }
}
