import { Conversation, Message, Session, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';
import { MessageDTO } from './message.dto';
import { UserConversation } from './userconversation.dto';
export declare class ChatGateway {
    private sessRepo;
    private userRepo;
    private convoRepo;
    private msgRepo;
    constructor(sessRepo: Repository<Session>, userRepo: Repository<User>, convoRepo: Repository<Conversation>, msgRepo: Repository<Message>);
    server: Server;
    users: number[];
    handleConnect(data: UserConversation): Promise<void>;
    handleMessage(msg: MessageDTO): Promise<void>;
}
