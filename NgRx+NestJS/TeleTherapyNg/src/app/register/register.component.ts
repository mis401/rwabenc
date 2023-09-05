import { Component } from '@angular/core';
import { NewUser, User } from '../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
  }
}
