import { HttpException } from '@nestjs/common';
import { Conversation, Message } from 'src/typeorm';
import { Repository } from 'typeorm';
import { SessionService } from 'src/session/session.service';
export declare class ChatService {
    private convoRepo;
    private msgRepo;
    private sessionService;
    constructor(convoRepo: Repository<Conversation>, msgRepo: Repository<Message>, sessionService: SessionService);
    getMessagesForConversation(id: any): Promise<HttpException | Conversation>;
    endSession(id: number): Promise<void>;
}
