import { SessionService } from './session.service';
import { SessionDTO } from './session.dto';
export declare class SessionController {
    private sessionService;
    constructor(sessionService: SessionService);
    getSessionsForUser(req: any): Promise<import("../typeorm").Session[]>;
    createSession(sesDTO: SessionDTO): Promise<{
        doctor: import("../typeorm").Doctor;
        name: string;
        description: string;
        appointment: Date;
        participants: any[];
        conversation: import("../typeorm").Conversation;
    } & import("../typeorm").Session>;
    signUpForSession(ids: any): Promise<import("../typeorm").Session>;
}
