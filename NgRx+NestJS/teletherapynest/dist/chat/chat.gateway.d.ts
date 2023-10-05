import { OnGatewayInit } from '@nestjs/websockets';
import { Conversation, Message, Session, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';
import { MessageDTO } from './message.dto';
import { UserConversation } from './userconversation.dto';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayInit {
    private sessRepo;
    private userRepo;
    private convoRepo;
    private msgRepo;
    private chatService;
    constructor(sessRepo: Repository<Session>, userRepo: Repository<User>, convoRepo: Repository<Conversation>, msgRepo: Repository<Message>, chatService: ChatService);
    server: Server;
    ConversationUser: Map<number, number[]>;
    afterInit(server: any): void;
    handleConnect(data: UserConversation): Promise<void>;
    handleDisconnect(data: UserConversation): Promise<void>;
    handleMessage(msg: MessageDTO): Promise<void>;
    handleCommand(msg: Command): Promise<void>;
}
interface Command {
    command: Commands;
    conversation: number;
    session: number;
}
declare const enum Commands {
    None = "none",
    StopSession = "stop session"
}
export {};
