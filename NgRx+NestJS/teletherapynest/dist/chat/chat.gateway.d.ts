import { Conversation, Doctor, Message, Patient, Session, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';
export declare class ChatGateway {
    private sessRepo;
    private patientRepo;
    private doctorRepo;
    private userRepo;
    private convoRepo;
    constructor(sessRepo: Repository<Session>, patientRepo: Repository<Patient>, doctorRepo: Repository<Doctor>, userRepo: Repository<Message>, convoRepo: Repository<Conversation>);
    server: Server;
    users: Map<string, User>;
    handleConnect(data: string): Promise<void>;
}
