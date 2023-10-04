import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SessionState } from 'src/app/store/session/session.state';
import { SessionService } from '../services/session.service';
import { Store } from '@ngrx/store';
import { Session, Conversation, User } from 'src/app/models';
import { selectConversation, selectSelectedSession } from 'src/app/store/session/session.selectors';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { Subscription, combineLatest, combineLatestWith, exhaustMap, map, mergeMap, switchMap } from 'rxjs';
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
  selectorSub: Subscription | null = null;
  messages$: Subscription | null = null;
  userId: number | null = null;
  userIdSub: Subscription | null = null;
  conversation: Conversation | null = null;
  activeSub$ : Subscription | null = null;
  inactiveSub$: Subscription | null = null;
  activeUsers: User[] = [];
  

  messageText: string = "";

  @ViewChild('scrollable') private myScrollContainer: ElementRef = new ElementRef('scrollable');
  
  ngOnInit(): void {
    const selectors = combineLatest([this.store.select(selectSelectedSession), this.userStore.select(selectId)]);
    this.selectorSub = selectors.pipe(
      map(([s, id]) => {
        if (s && id){
          console.log(s);
          console.log(id);
          this.store.dispatch(loadMessages({convoId: s.conversation.id}))
          this.sessionService.connect(id, s.conversation.id);
          this.userId = id as number;
          this.session= s as Session;
        }
        return [s, id];
      }),
      switchMap(([s, id]) => this.store.select(selectConversation))
    ).subscribe((conv) => {
      this.conversation = {id: conv!.id, messages: [...conv?.messages!]};
      console.log(this.userId);
      console.log(this.session);
    })
    this.messages$ = this.sessionService.messages$.subscribe((msg) => {
      this.conversation?.messages.push(msg);
    })
    this.activeSub$ = this.sessionService.connectedUsers$.subscribe((user) => {
      this.activeUsers.push(user);
    });
    this.inactiveSub$ = this.sessionService.disconnectedUsers$.subscribe((user) => {
      const index = this.activeUsers.indexOf(user);
      if (index !== -1){
        this.activeUsers.splice(index, 1);
      }
    });
  }
  ngOnDestroy(): void {

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
