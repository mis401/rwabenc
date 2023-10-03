import { SessionService } from './session.service';
import { SessionDTO } from './session.dto';
export declare class SessionController {
    private sessionService;
    constructor(sessionService: SessionService);
    getSessionsForUser(req: any): Promise<import("../typeorm").Session[]>;
    getSession(id: number): Promise<import("../typeorm").Session | import("@nestjs/common").HttpException>;
    createSession(sesDTO: SessionDTO): Promise<import("@nestjs/common").HttpException | ({
        doctor: import("../typeorm").User;
        name: string;
        description: string;
        appointment: Date;
        participants: any[];
        conversation: import("../typeorm").Conversation;
    } & import("../typeorm").Session)>;
    signUpForSession(ids: any): Promise<import("../typeorm").Session>;
}
