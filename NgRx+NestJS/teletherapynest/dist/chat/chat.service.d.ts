import { HttpException } from '@nestjs/common';
import { Conversation, Message } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class ChatService {
    private convoRepo;
    private msgRepo;
    constructor(convoRepo: Repository<Conversation>, msgRepo: Repository<Message>);
    getMessagesForConversation(id: any): Promise<Conversation | HttpException>;
}
