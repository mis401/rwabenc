import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io} from 'socket.io-client'
import { Conversation, Message } from 'src/app/models';
import { MessageDTO } from 'src/app/models/dto/message.dto';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { 
    this.socket.on("messageFromServer", (msg) => {
      console.log("primio " + msg);
      this.messages$.next(msg);
    })
  }
  messages$ : BehaviorSubject<Message> = new BehaviorSubject<Message>({
    id: 0,
    text: '',
    date: new Date(),
})
  url = 'http://localhost:3000';
  socket = io('http://localhost:3000');

  connect(id: number){
    this.socket.emit('connectUser', id);
  }
  disconnect(id: number){
    this.socket.emit('disconnectUser', id);
  }

  sendMessage(msg: MessageDTO){
    //this.socket.emit('connectUser', 1);
    this.socket.emit('messageFromUser', msg);
    //this.socket.emit('disconnectUser', 1);
    console.log("poslata poruka" + msg)
  }
  loadMessages(id: number){
    return this.http.get<Conversation>(`${this.url}/chat/messagesForConversation/${id}`)
  }

}
