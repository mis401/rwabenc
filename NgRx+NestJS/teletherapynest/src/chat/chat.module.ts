import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Doctor, Message, Patient, Session, User } from 'src/typeorm';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [
    TypeOrmModule.forFeature([User, Patient, Doctor, Session, Message, Conversation]),
  ]
})
export class ChatModule {}
