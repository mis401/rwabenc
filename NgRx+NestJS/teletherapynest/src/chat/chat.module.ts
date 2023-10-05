import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message, Session, User } from 'src/typeorm';
import { ChatGateway } from './chat.gateway';
import { SessionModule } from 'src/session/session.module';
import { SessionService } from 'src/session/session.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, SessionService],
  imports: [
    TypeOrmModule.forFeature([User, Session, Message, Conversation]),
    SessionModule
  ]
})
export class ChatModule {}
