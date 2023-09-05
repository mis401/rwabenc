import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT, NewUser } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(newUser: NewUser){
    return this.http.post<JWT>('http://localhost:3000/auth/register', newUser);    
  }
}
