import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BehaviorSubject } from 'rxjs';
import { Conversation, Message } from 'src/typeorm';
import { Repository } from 'typeorm';
import { MessageDTO } from './message.dto';

@Injectable()
export class ChatService {
    constructor(@InjectRepository(Conversation) private convoRepo: Repository<Conversation>,
                @InjectRepository(Message) private msgRepo: Repository<Message> ) {}

    


    async getMessagesForConversation(id){
        const conv = await this.convoRepo.createQueryBuilder("conversation")
        .leftJoinAndSelect("conversation.messages", "messages")
        .leftJoinAndSelect("messages.userSender", "userSender")
        .where("conversation.id = :convid", {convid: id})
        .getOne();
        //console.log(conv);
        
        if (conv)
            return conv;
        else
            return new HttpException("Cannot find conversation", 501);
    }
}
