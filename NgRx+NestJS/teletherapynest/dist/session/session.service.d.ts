import { HttpException } from '@nestjs/common';
import { Role } from 'src/auth/roles';
import { Conversation, Session, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { SessionDTO } from './session.dto';
export declare class SessionService {
    private sesRepo;
    private userRepo;
    constructor(sesRepo: Repository<Session>, userRepo: Repository<User>);
    createSession(sesDTO: SessionDTO): Promise<HttpException | ({
        doctor: User;
        name: string;
        description: string;
        appointment: Date;
        participants: any[];
        conversation: Conversation;
    } & Session)>;
    signUpForSession(sessionId: number, userId: number): Promise<Session>;
    getSessionsForUser(userId: number, role: Role): Promise<Session[]>;
    getSession(id: number): Promise<Session | HttpException>;
    cancelSession(sessionIds: number[], userId: number): Promise<any>;
    endSession(id: number): Promise<void>;
}
