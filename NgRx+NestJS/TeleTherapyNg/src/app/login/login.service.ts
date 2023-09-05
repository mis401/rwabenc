import { Injectable } from '@angular/core';
import { LoginDTO, User } from '../models';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { JWT } from '../models/jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: LoginDTO) {
    console.log("loguje se: " + user);
    const url = "http://localhost:3000/auth/login";
    return this.http.post<JWT>(url, user);
  }
}
