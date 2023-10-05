import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io} from 'socket.io-client'
import { Role } from 'src/Roles';
import { Conversation, Message, Session, SessionIdDTO, User } from 'src/app/models';
import { MessageDTO } from 'src/app/models/dto/message.dto';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { 
    this.socket.on("messageFromServer", (msg) => {
      console.log("primio " + msg);
      this.messages$.next(msg);
    });
    this.socket.on("konektovan", (user) => {
      console.log("dobio konektovan");
      this.connectedUsers$.next(user);
    });
    this.socket.on("diskonektovan", (user) => {
      console.log("dobio diskonektovan");
      this.disconnectedUsers$.next(user);
    });
    this.socket.on("command", (command) => {
      console.log("dobio komandu");
      this.commands$.next(command);
    });
  }
  messages$ : BehaviorSubject<Message> = new BehaviorSubject<Message>({
    id: 0,
    text: '',
    date: new Date(),
  })
  connectedUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  disconnectedUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  commands$: BehaviorSubject<Command> = new BehaviorSubject<Command>({command: Commands.None, conversation: 0, session: 0})

    
  url = 'http://localhost:3000';
  socket = io('http://localhost:3000');

  connect(user: number, conversation: number){
    this.socket.emit('connectUser', {user, conversation});
  }
  disconnect(user: number, conversation: number){
    this.socket.emit('disconnectUser', {user, conversation});
  }

  sendMessage(msg: MessageDTO){
    
    this.socket.emit('messageFromUser', msg);
    
    console.log("poslata poruka" + msg)
  }
  loadMessages(id: number){
    return this.http.get<Conversation>(`${this.url}/chat/messagesForConversation/${id}`)
  }

  cancelSession(sessions: number[], userId: number){
    return this.http.post<boolean>(`${this.url}/session/cancel`, {sessions, userId});
  }

  createSession(session: SessionIdDTO){
    return this.http.post<Session>(`${this.url}/session/createSession`, {name: session.name, description: session.description, appointment: session.appointment, doctorId: session.doctor, participantsId:[], conversationId:0});
  }

  searchSessions(name: string){
    return this.http.get<Session[]>(`${this.url}/session/search/${name}`);
  }
  
  endSession(session: number, conversation: number){
    this.socket.emit('command', {command: Commands.StopSession, conversation, session});
  }
}

interface Command{
  command: Commands
  conversation: number
  session: number
}
export const enum Commands {
  None = "none",
  StopSession = "stop session"
}
