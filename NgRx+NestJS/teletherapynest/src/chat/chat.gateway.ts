import { InjectRepository } from '@nestjs/typeorm';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Conversation, Message, Session, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { Server } from 'socket.io'
import { error } from 'console';
import { MessageDTO } from './message.dto';
import { Inject } from '@nestjs/common';
import { UserConversation } from './userconversation.dto';

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class ChatGateway{
    constructor(
        @InjectRepository(Session) private sessRepo: Repository<Session>,  
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Conversation) private convoRepo: Repository<Conversation>,
        @InjectRepository(Message) private msgRepo: Repository<Message>,
    ) {}
    @WebSocketServer()
    server: Server;
    users: number[] = [];

    @SubscribeMessage('connectUser')
    async handleConnect(@MessageBody() data: UserConversation) {
        this.server.socketsJoin(`${data.conversation}`);
        
        const response = "Uspesno povezan na server";
        console.log("Povezan na server " + data.user + data.conversation);
        this.users.push(data.user);
        
    }
    // @SubscribeMessage('disconnectUser')
    // async handleDisconnect(@MessageBody() data: number){
    //     try{
    //         const index = this.users.findIndex((id) => id === data);
    //         if (index !== -1){
    //             this.users.splice(index);
    //             console.log("Diskonektovan je " + data);
    //             const response = "Uspesno diskonektovan";
    //             return response;
    //         }
    //         else{
    //             throw new Error("Nepostojeci klijent")
    //         }
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    @SubscribeMessage(`messageFromUser`)
    async handleMessage(@MessageBody() msg: MessageDTO) {
        //console.log(msg);
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
        console.log(this.server.sockets.adapter.socketRooms());
    }
}
