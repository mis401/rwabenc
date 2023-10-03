import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatGateway: ChatGateway, private chatService: ChatService) {}

    @Get('messagesForConversation/:id')
    @UseGuards(JwtAuthGuard)
    async getMessagesForConversation(@Param('id') id:number){
        return await this.chatService.getMessagesForConversation(id);
    }
}
