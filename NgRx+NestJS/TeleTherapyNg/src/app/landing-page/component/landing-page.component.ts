import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

//import { loginDoctor } from 'src/app/store/doctor/doctor.actions';

import { loginDoctor } from 'src/app/store/user/user.actions';
import { selectToken } from 'src/app/store/user/user.selector';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{
  constructor(private store: Store<UserState>, private router: Router)  { }
  
  licenceId : string = "";

  onDoctorLogin(){
    this.router.navigate(["doctor-login"]);
  }

  ngOnInit(): void {
    this.store.select(selectToken).pipe(take(1)).subscribe(token => {
      if (token) {
        this.router.navigate(["home"]);
      }
    })
  }
}
