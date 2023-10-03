import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SessionState } from 'src/app/store/session/session.state';
import { SessionService } from '../services/session.service';
import { Store } from '@ngrx/store';
import { Session, Conversation } from 'src/app/models';
import { selectConversation, selectSelectedSession } from 'src/app/store/session/session.selectors';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { Subscription, exhaustMap, map, mergeMap, switchMap } from 'rxjs';
import { loadMessages } from 'src/app/store/session/session.actions';
import { UserState } from 'src/app/store/user/user.state';
import { selectId } from 'src/app/store/user/user.selector';
import { MessageDTO } from 'src/app/models/dto/message.dto';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnDestroy, AfterViewChecked{

  constructor(private store: Store<SessionState>, private userStore: Store<UserState>, private sessionService: SessionService) { }
  
  @Input()
  session: Session | null = null;
  sessionSelector$ = this.store.select(selectSelectedSession);
  sessionSelectorSub: Subscription | null = null;
  userId: number | null = null;
  userIdSub: Subscription | null = null;
  conversation: Conversation | null = null;

  messageText: string = "";

  @ViewChild('scrollable') private myScrollContainer: ElementRef = new ElementRef('scrollable');
  
  ngOnInit(): void {
    this.sessionSelectorSub = this.sessionSelector$.pipe(
      map((session) => {if (!session) return null; else return session;}),
      map((s) => {this.store.dispatch(loadMessages({convoId: s!.conversation.id})); this.session = s; return s;}),
      switchMap((s) => this.store.select(selectConversation).pipe(
      ))
    ).subscribe((conv) => this.conversation = {id: conv!.id, messages: [...conv?.messages!]});
    this.userIdSub = this.userStore.select(selectId).subscribe((id) => {this.userId = id; if(id) this.sessionService.connect(id)});
    this.sessionService.messages$.subscribe(
    {
      next: (msg) => {
        this.conversation?.messages.push(msg);
      }
    }
    )
  }
  ngOnDestroy(): void {
    this.sessionSelectorSub?.unsubscribe();
    this.userIdSub?.unsubscribe();
    this.sessionService.disconnect(this.userId!);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  scrollToBottom():void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  sendMessage() {
    if(this.messageText.trim().length == 0) return;
    const newMessage : MessageDTO = {
      userSender: this.userId!,
      text: this.messageText,
      conversation: this.conversation!.id,
      date: new Date(),
    }
    this.sessionService.sendMessage(newMessage);
    
    this.messageText = '';
    console.log(this.conversation?.messages);
  }
  
}
