import { Role } from 'src/auth/roles';
import { Conversation, Doctor, Patient, Session, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { SessionDTO } from './session.dto';
export declare class SessionService {
    private sesRepo;
    private patientRepo;
    private doctorRepo;
    private userRepo;
    constructor(sesRepo: Repository<Session>, patientRepo: Repository<Patient>, doctorRepo: Repository<Doctor>, userRepo: Repository<User>);
    createSession(sesDTO: SessionDTO): Promise<{
        doctor: Doctor;
        name: string;
        description: string;
        appointment: Date;
        participants: any[];
        conversation: Conversation;
    } & Session>;
    signUpForSession(sessionId: number, userId: number): Promise<Session>;
    getSessionsForUser(userId: number, role: Role): Promise<Session[]>;
}
