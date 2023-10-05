import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Conversation, Message, Session, User } from 'src/typeorm';
import { In, Repository } from 'typeorm';
import { Server } from 'socket.io'
import { error } from 'console';
import { MessageDTO } from './message.dto';
import { Inject } from '@nestjs/common';
import { UserConversation } from './userconversation.dto';
import { Socket } from 'dgram';
import { disconnect } from 'process';
import { ChatService } from './chat.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class ChatGateway implements OnGatewayInit{
    constructor(
        @InjectRepository(Session) private sessRepo: Repository<Session>,  
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Conversation) private convoRepo: Repository<Conversation>,
        @InjectRepository(Message) private msgRepo: Repository<Message>,
        private chatService: ChatService
    ) {
        
    }
    @WebSocketServer()
    server: Server;
    ConversationUser: Map<number, number[]> = new Map<number, number[]>();
    afterInit(server: any) {
        this.server.on('connection', (socket) => {
            // console.log('\n\n\n')
            socket.on('connectUser', async (data: UserConversation) => {
                socket.join(`${data.conversation}`);
                console.log("Prijavio se korisnik"+data.user);
                console.log(socket.rooms);
            })
        });
    }

    @SubscribeMessage('connectUser')
    async handleConnect(@MessageBody() data: UserConversation) {
        console.log("Prijavio se korisnik "+data.user);
        let usersInRoom = this.ConversationUser.get(data.conversation);
        console.log(usersInRoom);
        if(!usersInRoom) {
            usersInRoom = [];
        }
        if(!usersInRoom.includes(data.user))
            usersInRoom.push(data.user);
        console.log(usersInRoom);
        this.ConversationUser.set(data.conversation, usersInRoom);
        let users = await this.userRepo.find({where: {id: In(usersInRoom)}});
        users = users.map(user => {delete user.passwordHash; return user;});
        this.server.to(`${data.conversation}`).emit('konektovan', users);
    }


    @SubscribeMessage('disconnectUser')
    async handleDisconnect(@MessageBody() data: UserConversation) {
        console.log("Odjavio se korisnik "+data.user);
        let usersInRoom = this.ConversationUser.get(data.conversation);
        console.log(usersInRoom);
        if(!usersInRoom) {
            usersInRoom = [];
        }
        const index = usersInRoom.indexOf(data.user);
        console.log(index);
        if (index !== -1) {
            usersInRoom.splice(index, 1);
        }
        console.log(usersInRoom);
        this.ConversationUser.set(data.conversation, usersInRoom);
        let users = await this.userRepo.find({where: {id: In(usersInRoom)}});
        users = users.map(user => {delete user.passwordHash; return user;});
        this.server.to(`${data.conversation}`).emit('diskonektovan', users);
    }
    

    

    @SubscribeMessage(`messageFromUser`)
    async handleMessage(@MessageBody() msg: MessageDTO) {
        console.log("sub");
        const conversation = await this.convoRepo.findOne({where: {id: msg.conversation}})
        const user = await this.userRepo.findOne({where: {id: msg.userSender}});
        //console.log(user);
        const date = new Date();
        const newMsg : Message = {
            id: 0,
            text: msg.text,
            userSender: user as User,
            date,
            conversation
        }
        //console.log(newMsg);
        const savedMsg = await this.msgRepo.save(newMsg);
        this.server.to(`${msg.conversation}`).emit(`messageFromServer`, savedMsg);
        console.log(savedMsg);
    }

    @SubscribeMessage(`command`)
    async handleCommand(@MessageBody() msg: Command){
        console.log(msg);
        this.chatService.endSession(msg.session)
        if (msg.command === Commands.StopSession){
            this.server.to(`${msg.conversation}`).emit(`command`, {command: Commands.StopSession});
        }
    }
}

interface Command{
    command: Commands
    conversation: number
    session: number
}
const enum Commands {
    None = "none",
    StopSession = "stop session"
}