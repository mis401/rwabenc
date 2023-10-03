import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message, Session, User } from 'src/typeorm';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  imports: [
    TypeOrmModule.forFeature([User, Session, Message, Conversation]),
  ]
})
export class ChatModule {}
