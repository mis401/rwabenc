import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/roles';
import { Conversation, Session, User } from 'src/typeorm';
import { ArrayContains, In, Repository } from 'typeorm';
import { SessionDTO } from './session.dto';
import { SessionState } from 'src/typeorm/session.entity';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session) private sesRepo: Repository<Session>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}


    async createSession(sesDTO: SessionDTO){
        const doctor = await this.userRepo.findOne({where: {id: sesDTO.doctorId}});
        if (doctor && doctor.role !== Role.Doctor){
            return new HttpException("No such doctor", 501);
        }
        if (!doctor) {
            throw new HttpException("No doctor found", 501);
        }
        console.log(doctor);
        console.log("pravim sesiju");
        const session = await this.sesRepo.save({
            doctor: doctor,
            name: sesDTO.name,
            description: sesDTO.description,
            appointment: sesDTO.appointment,
            participants: [],
            conversation: new Conversation(),
        });
        return session;
    }

    async signUpForSession(sessionId: number, userId: number){
        const session = await this.sesRepo.findOne({where: {id: sessionId}, relations: {participants: true}});
        if(!session) throw new Error('Session not found');

        const patient = await this.userRepo.findOne({where: {id: userId}});
        if(!patient) throw new Error('User not found');

        if(patient.role === Role.Patient){
            session.participants.push(patient);
            await this.sesRepo.save(session);
            return session;
        }
        else throw new Error('Only patients can sign up for sessions');
    }

    async getSessionsForUser(userId: number, role: Role) {
        if (role === Role.Patient){
            const user = await this.userRepo.findOne({where: {id: userId}, relations: {participant: true}});
            if(!user) throw new Error('User not found');
            return user.participant;
        }
        else if (role === Role.Doctor){
            const sessions = await this.sesRepo.createQueryBuilder("session")
            .leftJoinAndSelect("session.doctor", "doctor")
            .leftJoinAndSelect("session.participants", "participants")
            .where("doctor.id = :id", {id: userId}).getMany();
            return sessions;
        }
    }

    async getSession(id: number){
        console.log("In getSession");
        console.log(id);
        const session = await this.sesRepo.findOne({where: {id: id}, relations: {doctor: true, participants: true, conversation: true}})
        if (session)
            return session;
        else
            return new HttpException(`No session found with id ${id}`, 501);
    }

    async cancelSession(sessionIds: number[], userId: number){
        console.log(sessionIds);
        
        const sessions = await this.sesRepo.find({where: {id: In(sessionIds)}, relations: {participants: true}});

        const user = await this.userRepo.findOne({where: {id: userId}});
        if(!user) throw new Error('User not found');

        if(user.role === Role.Patient){
            for (let i = 0; i < sessions.length; i++) {
            const session = sessions[i];
            session.participants = session.participants.filter(p => p.id !== user.id);
            if (session.participants.length === 0){
                await this.sesRepo.remove(session);
                return null;
            }
            await this.sesRepo.save(session);
            }
        }
        else {
            for (let i = 0; i < sessions.length; i++) {
                const session = sessions[i];
                await this.sesRepo.remove(session);
            }
        }
    }
    async endSession(id: number) {
        const session = await this.sesRepo.findOne({where: {id: id}});
        session.sessionState = SessionState.Ended;
        const updatedSession = await this.sesRepo.update({id: id}, {sessionState: SessionState.Ended});
        console.log(updatedSession);
    }   

    async searchSessionsByName(name: string){
        try{
        const sessions = await this.sesRepo.createQueryBuilder("session")
        .leftJoinAndSelect("session.doctor", "doctor")
        .leftJoinAndSelect("session.participants", "participants")
        .leftJoinAndSelect("session.conversation", "conversation")
        .where("session.name LIKE :name", {name: `%${name}%`}).getMany();
        return sessions;
        }
        catch (e){
            return new HttpException("Error searching sessions", 501);
        }
    }
}
