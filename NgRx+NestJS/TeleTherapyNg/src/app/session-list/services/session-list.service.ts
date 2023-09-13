import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session, SessionBasic } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class SessionListService {

  constructor(private http: HttpClient) { }

  getAllSessions(userId: number) {
    return this.http.get<SessionBasic[]>(`http://localhost:3000/session/getSessions`);
  }

  getSessionById(sessionId: number) {
    return this.http.get<Session>(`http://localhost:3000/session/getSession/${sessionId}`);
  }
}
