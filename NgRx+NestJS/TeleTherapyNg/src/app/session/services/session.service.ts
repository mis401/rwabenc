import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io} from 'socket.io-client'
import { Role } from 'src/Roles';
import { Conversation, Message, User } from 'src/app/models';
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
  }
  messages$ : BehaviorSubject<Message> = new BehaviorSubject<Message>({
    id: 0,
    text: '',
    date: new Date(),
  })
  connectedUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  disconnectedUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])

    
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
}
