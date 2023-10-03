import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
export declare class ChatController {
    private chatGateway;
    private chatService;
    constructor(chatGateway: ChatGateway, chatService: ChatService);
    getMessagesForConversation(id: number): Promise<import("../typeorm").Conversation | import("@nestjs/common").HttpException>;
}
