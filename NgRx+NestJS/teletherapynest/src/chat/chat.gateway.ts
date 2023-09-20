import { InjectRepository } from '@nestjs/typeorm';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Conversation, Doctor, Message, Patient, Session, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { Server } from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class ChatGateway{
    constructor(
        @InjectRepository(Session) private sessRepo: Repository<Session>,  
        @InjectRepository(Patient) private patientRepo: Repository<Patient>,
        @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
        @InjectRepository(Message) private userRepo: Repository<Message>,
        @InjectRepository(Conversation) private convoRepo: Repository<Conversation>,
    ) {}
    @WebSocketServer()
    server: Server;
    users: Map<string, User> = new Map<string, User>();

    @SubscribeMessage('connect')
    async handleConnect(@MessageBody() data: string) {

        const response = "Uspesno povezan na server";
        console.log("Povezan na server");
        
    }
}
